import React, { useRef } from 'react';
import { TextField, IconButton } from '@mui/material';
import { FileCopyOutlined as CopyIcon } from '@mui/icons-material';

const CopyableTextbox = ({ value }) => {
  const textboxRef = useRef(null);

  const handleCopyClick = () => {
    if (textboxRef.current) {
      textboxRef.current.select();
      document.execCommand('copy');
    }
  };

  return (
    <div>
      <TextField
        inputRef={textboxRef}
        value={value}
        variant="outlined"
        fullWidth
        readOnly
      />
      <IconButton onClick={handleCopyClick}>
        <CopyIcon />
      </IconButton>
    </div>
  );
};

export default CopyableTextbox;
