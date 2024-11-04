import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
} from '@mui/material';

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
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Vendor Profile
      </Typography>

      <Card>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Avatar
                alt={name}
                src={avatarUrl}
                sx={{ width: 100, height: 100, marginBottom: 2 }}
              />
              <Typography variant="h6">{name}</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography variant="h6">Contact Information</Typography>
              <Typography variant="body1"><strong>Email:</strong> {email}</Typography>
              <Typography variant="body1"><strong>Phone:</strong> {phone}</Typography>
              <Typography variant="body1"><strong>Address:</strong> {address}</Typography>
              <Typography variant="h6" sx={{ marginTop: 2 }}>Description</Typography>
              <Typography variant="body1">{description}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
