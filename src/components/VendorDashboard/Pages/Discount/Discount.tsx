import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';

interface Product {
  id: number;
  name: string;
  price: number;
}

const sampleProducts: Product[] = [
  { id: 1, name: 'Product A', price: 100 },
  { id: 2, name: 'Product B', price: 200 },
  { id: 3, name: 'Product C', price: 300 },
];

const Discount: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<number | ''>('');
  const [discount, setDiscount] = useState<number | ''>('');
  const [promoCode, setPromoCode] = useState('');
  const [promoPercentage, setPromoPercentage] = useState<number | ''>('');

  const handleApplyDiscount = () => {
    if (selectedProductId && discount) {
      console.log(`Applying ${discount}% discount to product ID ${selectedProductId}`);
      // Here you would send a request to your backend to apply the discount
    }
  };

  const handleGeneratePromoCode = () => {
    if (promoPercentage) {
      console.log(`Generating promo code with ${promoPercentage}% discount`);
      // Here you would send a request to your backend to generate a promo code
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Promotions and Discounts
      </Typography>

      <Grid container spacing={3}>

        {/* Apply Discount Section */}
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Apply Discount to Product
              </Typography>

              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <InputLabel id="product-select-label">Select Product</InputLabel>
                <Select
                  labelId="product-select-label"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(Number(e.target.value))}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {sampleProducts.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name} - ${product.price}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Discount Percentage"
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                fullWidth
                sx={{ marginBottom: 2 }}
              />

              <Button variant="contained" color="primary" onClick={handleApplyDiscount}>
                Apply Discount
              </Button>
            </CardContent>
          </Card>
        </Grid>

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
              />

              <TextField
                label="Discount Percentage"
                type="number"
                value={promoPercentage}
                onChange={(e) => setPromoPercentage(Number(e.target.value))}
                fullWidth
                sx={{ marginBottom: 2 }}
              />

              <Button variant="contained" color="primary" onClick={handleGeneratePromoCode}>
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
