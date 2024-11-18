import { Typography } from "@mui/material";
import ProductForm from "./ProductForm";
import axiosInstance from "../../../../api/axiosInstance";
import { enqueueSnackbar } from "notistack";
import { t } from "i18next";

export default function AddProduct() {

  // onSubmit function to handle form submission
  const handleSubmit = async (productData: any) => {
    const token = sessionStorage.getItem("accessToken");
    console.log("Token:", token);
  
    try {
      // Create a FormData object
      const formData = new FormData();
  
      // Append product data fields
      formData.append("productName", productData.productName);
  
      // Append category and brand IDs
      formData.append("category", productData.category.toString()); // Backend expects category ID
      formData.append("brand", productData.brand.toString());       // Backend expects brand ID
  
      // Handle color (array of IDs)
      formData.append("color", productData.color.toString());
  
      // Handle size (array of IDs)
      formData.append("size", productData.size.toString());

      // Append specifications (JSON object or stringified JSON)
      if (productData.specifications) {
        formData.append(
          "specifications",
          typeof productData.specifications === "string"
            ? productData.specifications
            : JSON.stringify(productData.specifications)
        );

      }
      if (productData.image_uploads && productData.image_uploads instanceof FileList) {
        Array.from(productData.image_uploads).forEach((file: File) => {
          formData.append("image_uploads[]", file); // Ensure array format by using "image_uploads[]"
        });
      } else if (productData.image_uploads && Array.isArray(productData.image_uploads)) {
        productData.image_uploads.forEach((file: File) => {
          formData.append("image_uploads[]", file); // Ensure array format
        });
      } else {
        console.warn("No valid files found for image_uploads");
      }
      
      // Append other numeric and text fields
      formData.append("price_before_discount", productData.price_before_discount.toString());
      formData.append("price_after_discount", productData.price_after_discount.toString());
      formData.append("stock_quantity", productData.stock_quantity.toString());
      formData.append("supplier", productData.supplier); // Assuming this is a text field
  
      // Send FormData to the API
      const response = await axiosInstance.post("/products/", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      console.log("API response:", response);
  
      // Success handling
      if (response.status === 200 || response.status === 201) {
        console.log("Product Data Submitted:", productData);
        enqueueSnackbar("Product submitted successfully!", { variant: "success" });
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar(
        `An error occurred while adding the product: ${error.message || error}`,
        { variant: "error" }
      );
    }
  };
  
  

  return (
    <>
      <Typography style={{ fontSize: 40, marginBottom: 20 }}>
        {t("Add Product")}
      </Typography>
      <ProductForm
        product={FormData}
        onSubmit={handleSubmit}
        buttons={
          "Add Product"
        }
      />
    </>
  );
}
