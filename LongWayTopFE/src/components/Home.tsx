import React from 'react';
import { Box, Typography } from '@mui/material';
// Assicurati che il percorso di importazione sia corretto in base a dove hai salvato i file
import CsvUploader from '../components/CsvUploader'; 

const Home = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',       // Occupa tutta l'altezza dello schermo
        display: 'flex',          // Usa Flexbox
        flexDirection: 'column',  // Dispone gli elementi in colonna
        justifyContent: 'center', // Centra verticalmente
        alignItems: 'center',     // Centra orizzontalmente
        backgroundColor: '#f4f6f8', // Un grigio molto chiaro per lo sfondo della pagina
        padding: 2
      }}
    >
      {/* Titolo di Benvenuto */}
      <Typography 
        variant="h2" 
        component="h1" 
        sx={{ 
          mb: 4,               // Margine inferiore per staccarlo dalla form
          fontWeight: 'bold', 
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', // Effetto gradiente carino
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          // Se non ti piace il gradiente, togli le 3 righe sopra e usa solo: color: '#1976d2'
        }}
      >
        Benvenuto!
      </Typography>

      {/* Qui richiamiamo il tuo componente Form */}
      <CsvUploader />
      
    </Box>
  );
};

export default Home;