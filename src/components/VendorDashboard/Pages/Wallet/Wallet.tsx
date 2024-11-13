import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Modal,
  TextField,
  Alert,
} from '@mui/material';

interface WalletProps {
  totalBalance: number;
}

const Wallet: React.FC<WalletProps> = ({ totalBalance }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestedAmount, setRequestedAmount] = useState<number | "">("");
  const [error, setError] = useState<string | null>(null);
  const feePercentage = 2; // Set fee percentage

  const handleRequestMoneyClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setRequestedAmount("");
    setError(null);
  };

  const handleRequestSubmit = () => {
    if (typeof requestedAmount === "number" && requestedAmount <= totalBalance) {
      const amountAfterFee = requestedAmount * (1 - feePercentage / 100);
      alert(`Your request has been submitted. After a ${feePercentage}% fee, you'll receive $${amountAfterFee.toFixed(2)}.`);
      handleCloseModal();
    } else {
      setError("Requested amount cannot exceed the total balance.");
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Wallet
      </Typography>

      {/* Total Balance Summary */}
      <Grid container spacing={3} sx={{ marginBottom: 10 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ backgroundColor: 'green', color: 'white' }}>
            <CardContent>
              <Typography variant="h5">Total Balance</Typography>
              <Typography variant="h3">${totalBalance=5}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Request Money Button */}
      <Button variant="contained" color="primary" size="large" onClick={handleRequestMoneyClick}>
        Request Money
      </Button>

      {/* Request Money Modal */}
      <Modal open={isModalOpen} onClose={handleCloseModal} aria-labelledby="request-money-modal" aria-describedby="modal-to-request-money">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" id="request-money-modal" sx={{ mb: 2 }}>
            Request Money
          </Typography>

          <TextField
            fullWidth
            label="Amount to Request"
            variant="outlined"
            type="number"
            value={requestedAmount}
            onChange={(e) => {
              setRequestedAmount(Number(e.target.value));
              setError(null); // Reset error on new input
            }}
            sx={{ mb: 2 }}
          />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
            Note: A {feePercentage}% fee will be deducted from the requested amount.
          </Typography>

          <Button variant="contained" color="primary" fullWidth onClick={handleRequestSubmit}>
            Submit Request
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Wallet;
