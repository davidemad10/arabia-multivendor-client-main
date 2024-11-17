import { Typography, Button } from "@mui/material";
import ProductForm from "./ProductForm";
import { useState } from "react";
import axiosInstance from "../../../../api/axiosInstance";
import { enqueueSnackbar } from "notistack";
import { t } from "i18next";

export default function AddProduct() {

  // onSubmit function to handle form submission
  const handleSubmit = async (productData: any) => {
    const token = sessionStorage.getItem("accessToken");
    console.log("token :" + token);
    try {
      console.log("product data :", productData);
      const response = await axiosInstance.post(
        "/products/",
        {
          ...productData,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          withCredentials: true,
        }
      );
      console.log("API response (Send OTP to the email) :", response);

      if (response.ok) {
        console.log("Product Data:", productData);
        enqueueSnackbar("Product submitted successfully!", {
          variant: "success",
        });
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      enqueueSnackbar(
        "An error occurred while adding the product, Error: " + error,
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
