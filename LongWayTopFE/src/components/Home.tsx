import React from 'react';
import { Box, Typography } from '@mui/material';
import CsvUploader from '../components/CsvUploader'; 

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',       
        display: 'flex',         
        flexDirection: 'column',  
        justifyContent: 'center', 
        alignItems: 'center',     
        backgroundColor: '#f4f6f8', 
        padding: 2
      }}
    >
      
      <Typography 
        variant="h2" 
        component="h1" 
        sx={{ 
          mb: 4,              
          fontWeight: 'bold', 
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', 
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          
        }}
      >
        Benvenuto!
      </Typography>

      <CsvUploader />
      
    </Box>
  );
};

export default Home;