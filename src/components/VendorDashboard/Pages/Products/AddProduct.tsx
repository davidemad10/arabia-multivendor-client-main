import { Typography } from "@mui/material";
import ProductForm from "./ProductForm";

export default function AddProduct() {

  return (
      <>
      <Typography style={{ fontSize: 40, marginBottom: 20 }}>Add Product</Typography>
      <ProductForm product={undefined} onSubmit={undefined} buttons={"Add Product"}/>
    </>
  );
}
