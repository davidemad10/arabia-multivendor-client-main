import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";

import { IconButton, InputAdornment } from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const Discount: React.FC = () => {
  const [promoCode, setPromoCode] = useState("");
  const [promoPercentage, setPromoPercentage] = useState<number | "">("");

  const generatePromoCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setPromoCode(code);
  };

  const handleGeneratePromoCode = () => {
    if (promoPercentage) {
      console.log(`Generating promo code with ${promoPercentage}% discount`);
      // Here you would send a request to your backend to generate a promo code
    }
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Promotions and Discounts
      </Typography>

      <Grid container spacing={3}>
        {/* Generate Promo Code Section */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Generate Promo Code
              </Typography>

              <TextField
                label="Promo Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={generatePromoCode} edge="end">
                        <AutorenewIcon />{" "}
                        <Typography sx={{ fontSize: 15 }}>generate</Typography>
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Discount Percentage"
                type="number"
                value={promoPercentage}
                onChange={(e) => setPromoPercentage(Number(e.target.value))}
                fullWidth
                sx={{ marginBottom: 2 }}
                InputProps={{
                  startAdornment: (
                    <Typography
                      sx={{ fontSize: 15, fontWeight: "700", marginRight: 3 }}
                    >
                      %
                    </Typography>
                  ),
                }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleGeneratePromoCode}
              >
                Generate Promo Code
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Discount;
