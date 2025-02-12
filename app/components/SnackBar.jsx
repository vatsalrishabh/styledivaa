import React from 'react';
import { Snackbar, Button, Box } from '@mui/material';

const SnackBar = ({ message, statusCode, colorCode }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getColor = () => {
    // You can customize the color logic based on statusCode or colorCode
    if (colorCode) {
      return colorCode;
    }

    // If you don't pass a color code, you can decide based on the statusCode
    switch (statusCode) {
      case 200:
        return 'green'; // success
      case 400:
        return 'yellow'; // warning
      case 500:
        return 'red'; // error
      default:
        return 'blue'; // info
    }
  };

  return (
    <Box sx={{ width: 500 }}>
      {/* <Button onClick={() => setOpen(true)}>Show Snackbar</Button> */}
      
      <Snackbar
        open={open}
        onClose={handleClose}
        message={message}
        sx={{
          backgroundColor: getColor(),
          color: 'white',
          padding: '10px',
          borderRadius: '8px',
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Box>
  );
};

export default SnackBar;
