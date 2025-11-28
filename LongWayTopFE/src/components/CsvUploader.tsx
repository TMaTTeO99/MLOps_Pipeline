import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Box, 
  Button, 
  Container, 
  Paper, 
  Typography, 
  Alert, 
  CircularProgress 
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const CsvUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles?.length > 0) {
      setFile(acceptedFiles[0]);
      setStatus('idle');
      setMessage('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    multiple: false 
  });

  const handleUpload = async () => {
    if (!file) return;
    setStatus('uploading');
    const formData = new FormData();
    formData.append('file_csv', file); 

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Errore upload');
      const data = await response.json();
      setStatus('success');
      setMessage('File elaborato con successo dal server!');
      console.log('Risposta BE:', data);
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage('Errore durante l\'invio del file.');
    }
  };

  return (
    // Ho rimosso 'mt: 8' qui perché ci penserà la Home a centrare tutto
    <Container maxWidth="sm"> 
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        
        <Typography variant="h5" component="h2" gutterBottom color="primary">
          Upload CSV
        </Typography>
        
        <Typography variant="body2" color="textSecondary" paragraph>
          Trascina il tuo file qui sotto.
        </Typography>

        <Box
          {...getRootProps()}
          sx={{
            border: '2px dashed #1976d2',
            borderRadius: 2,
            p: 4,
            backgroundColor: isDragActive ? '#e3f2fd' : '#fafafa',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            '&:hover': { backgroundColor: '#f1f8ff' }
          }}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
          {isDragActive ? (
            <Typography variant="body1" color="primary">Rilascia qui...</Typography>
          ) : (
            <Typography variant="body1" color="textSecondary">Trascina o clicca qui</Typography>
          )}
        </Box>

        {file && (
          <Box sx={{ mt: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <InsertDriveFileIcon sx={{ mr: 1, color: '#555' }} />
            <Typography variant="subtitle2" fontWeight="bold">{file.name}</Typography>
          </Box>
        )}

        {message && (
          <Alert severity={status === 'error' ? 'error' : 'success'} sx={{ mt: 2 }}>{message}</Alert>
        )}

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpload}
            disabled={!file || status === 'uploading'}
            startIcon={status === 'uploading' && <CircularProgress size={20} color="inherit" />}
            fullWidth
          >
            {status === 'uploading' ? 'Caricamento...' : 'Invia al Server'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default CsvUploader;