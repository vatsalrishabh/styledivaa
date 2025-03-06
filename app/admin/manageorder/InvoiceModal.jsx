import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Grid,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
} from '@mui/material';
import { Close, LocalShipping, Receipt, Person } from '@mui/icons-material';

const InvoiceModal = ({ open, onClose, invoice }) => {
  if (!invoice) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Invoice Details
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {/* Customer Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
              Customer Information
            </Typography>
            <Typography>Name: {invoice.memberName ?? 'N/A'}</Typography>
            <Typography>Email: {invoice.memberEmail ?? 'N/A'}</Typography>
            <Typography>Phone: {invoice.memberPhone ?? 'N/A'}</Typography>
            <Typography>Address: {invoice.memberAddress ?? 'N/A'}</Typography>
          </Grid>

          <Divider sx={{ my: 2, width: '100%' }} />

          {/* Product Details */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <Receipt sx={{ verticalAlign: 'middle', mr: 1 }} />
              Product Details
            </Typography>
            <List>
              {invoice.products?.map((product, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      variant="square"
                      src={product.imageUrl ?? ''}
                      alt={product.name ?? 'Product Image'}
                      sx={{ width: 56, height: 56, mr: 2 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={product.name ?? 'Unnamed Product'}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Price: ₹{product.price ?? 'N/A'}
                        </Typography>
                        <br />
                        <Typography component="span" variant="body2" color="text.primary">
                          Quantity: {product.quantity ?? 'N/A'}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              )) ?? (
                <Typography>No products available.</Typography>
              )}
            </List>
          </Grid>

          <Divider sx={{ my: 2, width: '100%' }} />

          {/* Delivery Information */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              <LocalShipping sx={{ verticalAlign: 'middle', mr: 1 }} />
              Delivery Information
            </Typography>
            <Typography>Status: {invoice.status ?? 'N/A'}</Typography>
            <Typography>Delivery Partner: {invoice.deliveryPartner ?? 'N/A'}</Typography>
            <Typography>Reference Number: {invoice.referenceNumber ?? 'N/A'}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceModal;
