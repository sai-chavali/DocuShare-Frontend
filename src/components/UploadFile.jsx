import React, { useState } from 'react';
import { Button, Typography, Container } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import HttpService from '../utils/HttpService';
import Loader from './Loader';

const FileUpload = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { loading, post } = HttpService();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('doc', selectedFile);
      const res = await post('/private/upload', formData);
      props.addDoc(res);
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
      {loading && <Loader/>}
    </Container>
  );
};

export default FileUpload;
