import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Paper,
  Divider,
  useTheme
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Work as WorkIcon,
  Assessment as AssessmentIcon,
  History as HistoryIcon
} from '@mui/icons-material';

const HomePage = ({ user }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{
      minHeight: '100vh',
      py: 8,
      background: 'linear-gradient(to bottom, rgba(18,18,18,0.95), rgba(30,30,30,0.95))'
    }}>
      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #90caf9 30%, #f48fb1 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            SE-Recruitment-Platform
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Revolutionizing tech recruitment with AI-powered resume analysis and job matching
          </Typography>
          {!user ? (
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #90caf9 30%, #f48fb1 90%)',
                boxShadow: '0 3px 5px 2px rgba(144, 202, 249, .3)'
              }}
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
          ) : (
            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #90caf9 30%, #f48fb1 90%)',
                boxShadow: '0 3px 5px 2px rgba(144, 202, 249, .3)'
              }}
              onClick={() => navigate('/resume-upload')}
            >
              Upload Resume
            </Button>
          )}
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
            Key Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(144, 202, 249, 0.2)',
                  }}
                >
                  <CloudUploadIcon sx={{ fontSize: 80, color: '#90caf9', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Resume Analysis
                  </Typography>
                  <Typography>
                    Upload your resume for AI-powered analysis that extracts key skills, experiences, and qualifications.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => navigate('/resume-upload')}>
                    Try Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(244, 143, 177, 0.2)',
                  }}
                >
                  <WorkIcon sx={{ fontSize: 80, color: '#f48fb1', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Job Matching
                  </Typography>
                  <Typography>
                    Match your profile against job descriptions to find the perfect fit for your skills and experience.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => navigate('/job-upload')}>
                    Try Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(144, 202, 249, 0.2)',
                  }}
                >
                  <AssessmentIcon sx={{ fontSize: 80, color: '#90caf9', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    AI Insights
                  </Typography>
                  <Typography>
                    Get personalized feedback and suggestions to improve your resume and increase your chances of landing the job.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => navigate('/insights')}>
                    Try Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: theme.palette.background.paper, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                <CardMedia
                  component="div"
                  sx={{
                    pt: '56.25%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(244, 143, 177, 0.2)',
                  }}
                >
                  <HistoryIcon sx={{ fontSize: 80, color: '#f48fb1', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    History Tracking
                  </Typography>
                  <Typography>
                    Keep track of your past job applications and resume versions to monitor your progress over time.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" onClick={() => navigate('/history')}>
                    Try Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* How it Works Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
            How It Works
          </Typography>
          <Paper elevation={3} sx={{ p: 4, bgcolor: theme.palette.background.paper, borderRadius: 2 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    1. Upload Your Resume
                  </Typography>
                  <Typography>
                    Upload your resume in PDF format. Our AI will process and analyze the content.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'block' } }} />
                <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    2. Enter Job Description
                  </Typography>
                  <Typography>
                    Enter a job description or upload a job posting to match against your resume.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'block' } }} />
                <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    3. Get Personalized Results
                  </Typography>
                  <Typography>
                    Receive detailed analysis, match percentage, and suggestions for improvement.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Call to Action */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to elevate your job search?
          </Typography>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            sx={{
              mt: 2,
              py: 1.5,
              px: 4,
              borderRadius: 2
            }}
            onClick={() => user ? navigate('/resume-upload') : navigate('/login')}
          >
            {user ? 'Get Started Now' : 'Create an Account'}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;