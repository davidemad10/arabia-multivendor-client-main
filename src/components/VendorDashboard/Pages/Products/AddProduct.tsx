
import { Typography, Button } from "@mui/material";
import ProductForm from "./ProductForm";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../../../../api/axiosInstance";

export default function AddProduct() {
  const [isArabic, setIsArabic] = useState(false);

  // Handler to switch to Arabic version of the form
  const handleAddProductArabic = () => {
    setIsArabic(!isArabic);
  };

  // onSubmit function to handle form submission
  const handleSubmit = async (productData: any) => {
    try {
      // Prepare the form data
      const formData = new FormData();
      for (const key in productData) {
        if (key === "image_uploads" && productData[key]) {
          // Append each image file if image_uploads is an array of files
          Array.from(productData[key]).forEach((file: File) => {
            formData.append("image_uploads", file);
          });
        } else {
          formData.append(key, productData[key]);
        }
      }

        try {
          const response = await axiosInstance.post(
            "/products/",
            {
              formData,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
          console.log("API response (Send OTP to the email) :", response);
        } catch (error: any) {
console.log("Error (Send OTP to the email) :", error);
        }
      // const response = await fetch('http://127.0.0.1:8000/en/api/products/', {
      //   method: "POST",
      //   body: formData,
      // });

      if (response.ok) {
        console.log("Product Data:", productData);
        alert("Product added successfully");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while adding the product");
    }
  };

  return (
    <>
      <Typography style={{ fontSize: 40, marginBottom: 20 }}>
        {isArabic ? "إضافة منتج" : "Add Product"}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddProductArabic}
        style={{ marginBottom: 20, color: "inherit" }}
      >
        {isArabic ? "إضافة المنتج بالعربية" : "Add Product in Arabic"}
      </Button>
      <ProductForm
        product={undefined}
        onSubmit={handleSubmit}
        buttons={isArabic ? "أضف المنتج باللغة العربية" : "Add Product in English"}
        isArabic={isArabic} handleAddProduct={handleSubmit}      />
    </>
  );
}
