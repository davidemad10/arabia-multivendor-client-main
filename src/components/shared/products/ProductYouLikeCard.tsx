import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FaShoppingCart } from "react-icons/fa";

export default function ProductYouLikeCard({ product }) {
  return (
    <Card sx={{ width: 240, borderRadius: 2, boxShadow: 3, marginBottom: 5 }}>
      {" "}
      {/* Adjusted width */}
      <CardMedia
        sx={{ height: 140 }} // Adjust as needed
        image={product.image}
        title={product.imageAlt}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" sx={{ width: "100%" }}>
          <FaShoppingCart className="mr-2" />
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
