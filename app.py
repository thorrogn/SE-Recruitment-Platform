import os
import tempfile
from flask import Flask, render_template, request, jsonify, session
from werkzeug.utils import secure_filename
import rag_module as rag

app = Flask(__name__)
app.secret_key = "ai_recruitment_platform_secret_key"  # For session management
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Create uploads folder if it doesn't exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


# Initialize global variables to store in session
@app.before_request
def initialize_session():
    if 'pdf_path' not in session:
        session['pdf_path'] = None
    if 'qa_initialized' not in session:
        session['qa_initialized'] = False


# Function to get QA chain (using global variables to maintain state)
qa_chains = {}


def get_qa_chain(pdf_path):
    # Use a simple caching mechanism
    if pdf_path not in qa_chains:
        vector = rag.load_or_create_embeddings(pdf_path)
        qa_chains[pdf_path] = rag.setup_qa_chain(vector)
    return qa_chains[pdf_path]


# Routes
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload_file():
    if 'resume' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['resume']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.lower().endswith('.pdf'):
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)

        # Store the file path in session
        session['pdf_path'] = file_path
        session['qa_initialized'] = True

        return jsonify({
            'success': True,
            'message': 'Resume uploaded successfully',
            'filename': filename
        })

    return jsonify({'error': 'Invalid file format. Please upload a PDF.'}), 400


@app.route('/analyze', methods=['POST'])
def analyze_resume():
    if not session.get('qa_initialized') or not session.get('pdf_path'):
        return jsonify({'error': 'Please upload a resume first'}), 400

    data = request.json
    question = data.get('question', '')

    if not question:
        return jsonify({'error': 'Question is required'}), 400

    # Get the QA chain for the uploaded PDF
    qa_chain = get_qa_chain(session['pdf_path'])

    # Perform the question answering
    try:
        result = rag.ask_question(qa_chain, question, return_text=True)

        # Extract source information
        sources = []
        if result.get('source_documents'):
            sources_set = set()
            for doc in result.get('source_documents', [])[:2]:
                if hasattr(doc, 'metadata') and 'source' in doc.metadata:
                    page = doc.metadata.get('page', 'unknown')
                    source = f"Page {page}"
                    if source not in sources_set:
                        sources.append(source)
                        sources_set.add(source)

        return jsonify({
            'success': True,
            'answer': result.get('answer', ''),
            'sources': sources
        })
    except Exception as e:
        return jsonify({'error': f'Error analyzing resume: {str(e)}'}), 500


@app.route('/job-match', methods=['POST'])
def job_match():
    if not session.get('qa_initialized') or not session.get('pdf_path'):
        return jsonify({'error': 'Please upload a resume first'}), 400

    data = request.json
    job_description = data.get('jobDescription', '')

    if not job_description:
        return jsonify({'error': 'Job description is required'}), 400

    # Get the QA chain for the uploaded PDF
    qa_chain = get_qa_chain(session['pdf_path'])

    # Create a matching question
    question = f"Based on the following job description, evaluate how well the candidate's skills and experience match. Provide a match percentage and brief explanation. Job description: {job_description}"

    # Perform the question answering
    try:
        result = rag.ask_question(qa_chain, question, return_text=True)

        return jsonify({
            'success': True,
            'match_analysis': result.get('answer', '')
        })
    except Exception as e:
        return jsonify({'error': f'Error matching job: {str(e)}'}), 500


@app.route('/clear', methods=['POST'])
def clear_session():
    # Clear the current session
    session.clear()
    initialize_session()
    return jsonify({'success': True})


if __name__ == '__main__':
    # Modify the rag module to return text instead of printing
    rag.ask_question = lambda qa_chain, question, return_text=False: {
        "answer": qa_chain(question)['result'],
        "source_documents": qa_chain(question).get('source_documents', [])
    }

    app.run(debug=True)