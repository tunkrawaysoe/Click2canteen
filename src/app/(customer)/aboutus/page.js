'use client';

import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Box,
  Divider,
  useTheme,
} from '@mui/material';

const teamMembers = [
  { name: 'Kaung Nyein Kyaw', role: 'Founder & CEO', image: '/images/founder.jpeg' },
  { name: 'Jane Doe', role: 'Lead Developer', image: '/images/developer.jpeg' },
  { name: 'John Smith', role: 'UI/UX Designer', image: '/images/lady.jpeg' },
];

const AboutUsPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        background: 'linear-gradient(to right, #f5f7fa, #c3cfe2)',
        minHeight: '100vh',
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="bold" gutterBottom color="primary">
            About Us
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Learn more about who we are, what we do, and why we do it.
          </Typography>
        </Box>

        {/* Mission & Vision */}
        <Grid container spacing={4} mb={6}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                backgroundColor: '#e0f7fa',
                boxShadow: 3,
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom color="secondary">
                  Our Mission
                </Typography>
                <Typography color="text.secondary">
                  To revolutionize the way people access canteen services by delivering an easy,
                  fast, and reliable food ordering experience for campus communities.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                backgroundColor: '#fce4ec',
                boxShadow: 3,
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom color="secondary">
                  Our Vision
                </Typography>
                <Typography color="text.secondary">
                  To be the go-to platform for digital food ordering in educational institutions,
                  empowering students and staff with convenient food solutions.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 5 }} />

        {/* Our Team Section */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom color="primary">
            Meet Our Team
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Passionate, driven, and ready to serve you better.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  textAlign: 'center',
                  py: 4,
                  background: 'white',
                  boxShadow: 3,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6,
                  },
                }}
              >
                <Avatar
                  alt={member.name}
                  src={member.image}
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 2,
                    border: `3px solid ${theme.palette.primary.main}`,
                  }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="medium" color="text.primary">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsPage;
