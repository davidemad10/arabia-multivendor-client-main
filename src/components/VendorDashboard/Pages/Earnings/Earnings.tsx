import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

interface EarningsProps {
  totalEarnings: number;
  monthlyEarnings: number[];
  weeklyEarnings: number[];
}

const Earnings: React.FC<EarningsProps> = ({ totalEarnings, monthlyEarnings, weeklyEarnings }) => {
  // Line chart data for monthly earnings
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Earnings ($)',
        data: monthlyEarnings,
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // Bar chart data for weekly earnings
  const weeklyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Weekly Earnings ($)',
        data: weeklyEarnings,
        backgroundColor: '#2196f3',
        borderColor: '#1976d2',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Earnings Statistics',
      },
    },
  };

  // Calculate average monthly earnings safely
  const averageMonthlyEarnings = monthlyEarnings.length > 0 ? (monthlyEarnings.reduce((a, b) => a + b, 0) / monthlyEarnings.length).toFixed(2) : 0;
  
  // Calculate average weekly earnings safely
  const averageWeeklyEarnings = weeklyEarnings.length > 0 ? (weeklyEarnings.reduce((a, b) => a + b, 0) / weeklyEarnings.length).toFixed(2) : 0;

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Earnings Overview
      </Typography>

      {/* Earnings Summary */}
      <Grid container spacing={3} sx={{ marginBottom: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#4caf50', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Total Earnings</Typography>
              <Typography variant="h4">${totalEarnings.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#2196f3', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Monthly Earnings</Typography>
              <Typography variant="h4">${averageMonthlyEarnings}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#ff9800', color: 'white' }}>
            <CardContent>
              <Typography variant="h6">Weekly Earnings</Typography>
              <Typography variant="h4">${averageWeeklyEarnings}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Monthly Earnings Chart */}
      <Box sx={{ marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Monthly Earnings Trend
        </Typography>
        <Line data={monthlyData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Monthly Earnings Trend' } } }} />
      </Box>

      {/* Weekly Earnings Chart */}
      <Box>
        <Typography variant="h6" gutterBottom>
          Weekly Earnings Breakdown
        </Typography>
        <Bar data={weeklyData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, title: { text: 'Weekly Earnings Breakdown' } } }} />
      </Box>
    </Box>
  );
};

export default Earnings;
