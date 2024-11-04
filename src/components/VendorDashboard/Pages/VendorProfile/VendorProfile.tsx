import React from 'react';
import { Box, Typography, Avatar, Card, CardContent, Grid } from '@mui/material';

interface VendorProfileProps {
  avatarUrl: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
}

const Profile: React.FC<VendorProfileProps> = ({
  avatarUrl,
  name,
  email,
  phone,
  address,
  description,
}) => {
  return (
    <Box sx={{ padding: 5}}>
      <Typography variant="h4" gutterBottom sx={{ color: '#1565c0'  , marginBottom:5}}>
        Your Profile
      </Typography>

      <Card sx={{ backgroundColor: '#e3f2fd', boxShadow: 'none', borderRadius: 5 , padding:5 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                alt={name}
                src={avatarUrl}
                sx={{ width: 100, height: 100, marginBottom: 1, border: '2px solid #1565c0' }}
              />
              <Typography variant="h6" sx={{ color: '#1565c0', fontWeight: 500 }}>{name}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6" sx={{ color: '#1565c0', fontWeight: 500, marginBottom: 1 }}>
                Contact Information
              </Typography>
              <Typography variant="body2" sx={{ color: '#0d47a1' }}><strong>Email:</strong> {email}</Typography>
              <Typography variant="body2" sx={{ color: '#0d47a1' }}><strong>Phone:</strong> {phone}</Typography>
              <Typography variant="body2" sx={{ color: '#0d47a1' }}><strong>Address:</strong> {address}</Typography>

              <Typography variant="h6" sx={{ color: '#1565c0', fontWeight: 500, marginTop: 2 }}>Description</Typography>
              <Typography variant="body2" sx={{ color: '#0d47a1' }}>{description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
