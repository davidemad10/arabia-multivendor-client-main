import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaShoppingCart } from "react-icons/fa";
import Box from "@mui/material/Box";

export default function ProductYouLikeCard({ product }) {
  const hasDiscount = product.discount > 0;

  return (
    <Card
      sx={{
        width: 240, // Adjust the card width
        borderRadius: 2,
        boxShadow: 3,
        marginBottom: 5,
        position: "relative", // To place the discount badge
      }}
    >
      {/* Image Section */}
      <CardMedia
        sx={{ height: 200 }} // Taller image like the example
        image={product.image}
        title={product.imageAlt}
      />

      {/* Discount Badge */}
      {hasDiscount && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "red",
            color: "white",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          {product.discount}% OFF
        </Box>
      )}

      {/* Content Section */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>

        {/* Price and Original Price */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "green" }}>
            ${product.price}
          </Typography>
          {hasDiscount && (
            <Typography
              variant="body2"
              sx={{
                textDecoration: "line-through",
                color: "gray",
              }}
            >
              ${product.originalPrice}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* Add to Cart Button */}
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          variant="outlined"
          startIcon={<FaShoppingCart />}
          sx={{ width: "100%" }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
