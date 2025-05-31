import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import {
  FlightTakeoff,
  Search,
  History,
  Person,
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Search Flights',
      description: 'Find and book flights to your desired destination',
      icon: <Search sx={{ fontSize: 40 }} />,
      path: '/search',
    },
    {
      title: 'My Bookings',
      description: 'View and manage your flight reservations',
      icon: <History sx={{ fontSize: 40 }} />,
      path: '/bookings',
    },
    {
      title: 'Profile',
      description: 'Manage your account and preferences',
      icon: <Person sx={{ fontSize: 40 }} />,
      path: '/profile',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mt: 4,
          mb: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="primary"
          gutterBottom
        >
          Welcome to Flight Reservation System
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Book your flights with ease and manage your reservations all in one place
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<FlightTakeoff />}
          onClick={() => navigate('/search')}
          sx={{ mt: 4 }}
        >
          Start Booking
        </Button>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item key={feature.title} xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'transform 0.2s ease-in-out',
                },
              }}
              onClick={() => navigate(feature.path)}
            >
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 