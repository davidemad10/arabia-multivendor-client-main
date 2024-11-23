import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

import { getUser } from "../../../../../public/utils/functions";

interface VendorProfileProps {
  name: string;
  email: string;
}

const Profile: React.FC<VendorProfileProps> = () => {
  const token = sessionStorage.getItem("accessToken");
  const user = getUser(token);

  return (
    <Box sx={{ padding: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: "inhert", marginBottom: 5 }}
      >
        Your Profile
      </Typography>

      <Card
        sx={{
          backgroundColor: "#F4E5E2",
          boxShadow: "none",
          borderRadius: 5,
          padding: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt={user.full_name || ""}
                src={"null"}
                sx={{
                  width: 100,
                  height: 100,
                  marginBottom: 1,
                  border: "2px solid #691F1F",
                }}
              />
              <Typography
                variant="h6"
                sx={{ color: "#691F1F", fontWeight: 800, marginTop: 2 }}
              >
                {user.full_name || ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Typography
                variant="h6"
                sx={{ color: "#691F1F", fontWeight: 500, marginBottom: 1 }}
              >
                Contact Information
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#691F1F", marginTop: 3, marginLeft: 3 }}
              >
                <strong>Email:</strong> {user.email || ""}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
