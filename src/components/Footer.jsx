import React from 'react';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const Footer = () => {

  return (
    <footer style={{position: 'fixed', bottom: 0, height: '35px', width: '100%', margin:'5px'}}>
      <Container maxWidth="lg">
        <Typography variant="body2" align="center" padding={1}>
          &copy; {new Date().getFullYear()} DocuShare. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
