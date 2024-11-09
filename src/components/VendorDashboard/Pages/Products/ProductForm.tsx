import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { z } from "zod";
import { t } from "i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useEffect, useState } from "react";

export default function ProductForm({
  product,
  onSubmit,
  buttons,
  isArabic,
  handleAddProduct,
}) {
  const [categories, setCategories] = useState([]);

  // Submit handler
  const handleSubmit = async (values) => {
    try {

      await onSubmit(values);
      enqueueSnackbar("Product submitted successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error submitting product:", error);
      enqueueSnackbar("Failed to submit product. Please try again.", { variant: "error" });
    }
  };

  // Validation schema
  const schema = z.object({
    productName: z.string().min(2, { message: "Product name is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    brand: z.string().optional(),
    image_uploads: z
      .instanceof(FileList)
      .refine((files) => files.length > 0, { message: "Image upload is required" }),
    price_before_discount: z.number().positive({ message: "Must be positive" }),
    price_after_discount: z.number().positive({ message: "Must be positive" }),
    stock_quantity: z.number().min(0, { message: "Stock must be 0 or more" }),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      category: "",
      color: "",
      brand: "",
      image_uploads: null,
      price_before_discount: 0,
      price_after_discount: 0,
      stock_quantity: 0,
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    // Fetch categories
    fetch("http://127.0.0.1:8000/en/api/products/category/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Categories Data:", data); // Debugging log
        setCategories(data.results || data || []); // Adjust based on actual response structure
      })
      .catch((error) => console.error("Error fetching categories:", error));

    }, []);

    
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className="flex flex-wrap gap-9">
        {/* Product Name */}
        <FormControl className="w-5/12">
          <FormLabel htmlFor="productName">
            {isArabic ? "اسم المنتج" : t("productName")}
          </FormLabel>
          <TextField
            className="w-full"
            name="productName"
            id="productName"
            onBlur={formik.handleBlur}
            value={formik.values.productName}
            onChange={formik.handleChange}
            error={formik.touched.productName && Boolean(formik.errors.productName)}
            helperText={formik.touched.productName && formik.errors.productName}
          />
        </FormControl>

        {/* Category */}
        <FormControl className="w-5/12">
          <FormLabel htmlFor="category">
            {isArabic ? "الفئة" : t("category")}
          </FormLabel>
          <Select
            className="w-full"
            name="category"
            id="category"
            onBlur={formik.handleBlur}
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            sx={{
              color: "black",
              backgroundColor: "white",
              "& .MuiSelect-icon": { color: "black" }, // Set arrow icon color if needed
            }}
          >
            {categories.map((category) => (
              <MenuItem
                key={category.id}
                value={category.translations.en.name}
                sx={{ color: "black" }}
              >
                {/* change the  language to arabic to see the arabic name */}
                {isArabic
                  ? category.translations.en.name
                  : category.translations.en.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>


        {/* Brand */}
        <FormControl className="w-5/12">
          <FormLabel htmlFor="brand">
            {isArabic ? "الماركة" : t("Brand")}
          </FormLabel>
          <TextField
            className="w-full"
            name="brand"
            id="brand"
            onBlur={formik.handleBlur}
            value={formik.values.brand}
            onChange={formik.handleChange}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
            helperText={formik.touched.brand && formik.errors.brand}
            color={formik.errors.brand ? "error" : "primary"}
          />
        </FormControl>


        {/* Image Uploads */}
        <FormControl className="w-5/12">
          <FormLabel htmlFor="image_uploads">
            {isArabic ? "ارفع الصورة" : t("Image upload")}
          </FormLabel>
          <input
            type="file"
            multiple
            id="image_uploads"
            name="image_uploads"
            onChange={(event) => formik.setFieldValue("image_uploads", event.currentTarget.files)}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image_uploads && formik.errors.image_uploads && (
            <p className="text-red-600">{formik.errors.image_uploads}</p>
          )}
        </FormControl>

        {/* Price Before Discount */}
        <FormControl className="w-5/12">
          <FormLabel htmlFor="price_before_discount">{t("price Before Discount")}</FormLabel>
          <TextField
            className="w-full"
            type="number"
            name="price_before_discount"
            id="price_before_discount"
            onBlur={formik.handleBlur}
            value={formik.values.price_before_discount}
            onChange={formik.handleChange}
            error={
              formik.touched.price_before_discount &&
              Boolean(formik.errors.price_before_discount)
            }
            helperText={
              formik.touched.price_before_discount &&
              formik.errors.price_before_discount
            }
          />
        </FormControl>

        {/* Price After Discount */}
        <FormControl className="w-5/12">
          <FormLabel htmlFor="price_after_discount">
            {t("price After Discount")}
          </FormLabel>
          <TextField
            className="w-full"
            type="number"
            name="price_after_discount"
            required
            id="price_after_discount"
            onBlur={formik.handleBlur}
            value={formik.values.price_after_discount}
            onChange={formik.handleChange}
            error={
              formik.touched.price_after_discount &&
              Boolean(formik.errors.price_after_discount)
            }
            helperText={
              formik.touched.price_after_discount &&
              formik.errors.price_after_discount
            }
            color={formik.errors.price_after_discount ? "error" : "primary"}
          />
        </FormControl>

        {/* Stock Quantity */}
        <FormControl className="w-5/12">
          <FormLabel htmlFor="stock_quantity">{t("stock Quantity")}</FormLabel>
          <TextField
            className="w-full"
            type="number"
            name="stock_quantity"
            required
            id="stock_quantity"
            onBlur={formik.handleBlur}
            value={formik.values.stock_quantity}
            onChange={formik.handleChange}
            error={
              formik.touched.stock_quantity &&
              Boolean(formik.errors.stock_quantity)
            }
            helperText={
              formik.touched.stock_quantity && formik.errors.stock_quantity
            }
            color={formik.errors.stock_quantity ? "error" : "primary"}
          />
        </FormControl>

        {/* Supplier */}
        {/* <FormControl className="w-5/12">
          <FormLabel htmlFor="supplier">{t("supplier")}</FormLabel>
          <TextField
            className="w-full"
            name="supplier"
            required
            id="supplier"
            onBlur={formik.handleBlur}
            value={formik.values.supplier}
            onChange={formik.handleChange}
            error={formik.touched.supplier && Boolean(formik.errors.supplier)}
            helperText={formik.touched.supplier && formik.errors.supplier}
            color={formik.errors.supplier ? "error" : "primary"}
          />
        </FormControl> */}
      </Box>
      <Button
        type="submit"
        variant="contained"
        // disabled={!formik.dirty || !formik.isValid}
        className="w-1/5"
        sx={{ background: "primary", borderRadius: "3px", marginTop: "30px" }}
      >
        <p className="font-semibold">{buttons}</p>
      </Button>
    </form>
  );
}
