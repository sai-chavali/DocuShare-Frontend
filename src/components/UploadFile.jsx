import React, { useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HttpService from '../utils/HttpService';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { post } = HttpService();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('doc', selectedFile);
      post('/private/upload', formData);
    }
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
      <label htmlFor="file-upload">
        <input
          accept=".pdf"
          style={{ display: 'none' }}
          id="file-upload"
          type="file"
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Select PDF File
        </Button>
      </label>
      <Typography variant="subtitle1" gutterBottom>
        {selectedFile ? `Selected file: ${selectedFile.name}` : 'No file selected'}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        style={{ mt: 2 }}
        disabled={!selectedFile}
        onClick={handleUpload}
      >
        Upload
      </Button>
    </Container>
  );
};

export default FileUpload;
