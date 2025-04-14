import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Box, Container } from '@mui/material';
import Navigation from './components/Navigation';

// Import pages
import Dashboard from './components/Dashboard';
import TherapistList from './components/therapists/TherapistList';
import ChildList from './components/children/ChildList';
import GuardianList from './components/guardians/GuardianList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Navigation />
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Container>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/therapists" element={<TherapistList />} />
                <Route path="/children" element={<ChildList />} />
                <Route path="/guardians" element={<GuardianList />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
