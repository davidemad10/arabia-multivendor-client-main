import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface WalletProps {
  totalBalance: number;
}

const Wallet: React.FC<WalletProps> = ({ totalBalance }) => {


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
              <Typography variant="h3">${totalBalance}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Request Money Button */}
      <Button variant="contained" color="primary" size="large">
        Request Money
      </Button>
    </Box>
  );
};

export default Wallet;
