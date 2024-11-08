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
  const [colors, setColors] = useState([]);

  const schema = z.object({
    productName: z.string().min(2, { message: "Product name is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    color: z.string().min(1, { message: "Color is required" }),
    brand: z.string().optional(),
    specifications: z.string().optional(),
    image_uploads: z
      .string()
      .url({ message: "Must be a valid URL" })
      .optional(),
    price_before_discount: z.number().positive({ message: "Must be positive" }),
    price_after_discount: z.number().positive({ message: "Must be positive" }),
    stock_quantity: z.number().min(0, { message: "Stock must be 0 or more" }),
    total_sold: z.number().min(0, { message: "Total sold must be 0 or more" }),
    total_views: z
      .number()
      .min(0, { message: "Total views must be 0 or more" }),
    supplier: z.string().min(1, { message: "Supplier is required" }),
  });

  const formik = useFormik({
    initialValues: {
      productName: "",
      category: "",
      color: "",
      brand: "",
      image_uploads: "",
      // image_uploads: "",
      // image_uploads: "",
      price_before_discount: 0,
      price_after_discount: 0,
      stock_quantity: 0,
      supplier: "",
    },
    validationSchema: toFormikValidationSchema(schema),
    onSubmit: async (values) => {
      if (onSubmit) {
        onSubmit(values);
      }
    },
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

      // Fetch colors
      // fetch("http://127.0.0.1:8000/en/api/products/colors/")
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log("Colors Data:", data); // Debugging log
      //     setColors(data.results || data || []); // Adjust based on actual response structure
      //   })
      //   .catch((error) => console.error("Error fetching colors:", error));
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
            autoComplete="productName"
            name="productName"
            required
            id="productName"
            onBlur={formik.handleBlur}
            value={formik.values.productName}
            onChange={formik.handleChange}
            error={
              formik.touched.productName && Boolean(formik.errors.productName)
            }
            helperText={formik.touched.productName && formik.errors.productName}
            color={formik.errors.productName ? "error" : "primary"}
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
                {isArabic ? category.translations.en.name : category.translations.en.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Color Dropdown */}
        {/* <FormControl className="w-5/12">
          <FormLabel htmlFor="color">
            {isArabic ? "اللون" : t("color")}
          </FormLabel>
          <Select
            name="color"
            id="color"
            value={formik.values.color}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.color && Boolean(formik.errors.color)}
          >
            {colors.map((color) => (
              <MenuItem key={color.id} value={color.id}>
                {isArabic ? color.name_ar : color.name_en}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

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
          <FormLabel htmlFor="Image upload">
            {isArabic ? "ارفع الصورة" : t("Image upload")}
          </FormLabel>{" "}
          <input
            type="file"
            multiple
            id="image_uploads"
            name="image_uploads"
            onChange={(event) =>
              formik.setFieldValue("image_uploads", event.currentTarget.files)
            }
          />
        </FormControl>

        {/* Price Before Discount */}
        <FormControl className="w-5/12">
          <FormLabel htmlFor="price_before_discount">
            {t("price Before Discount")}
          </FormLabel>
          <TextField
            className="w-full"
            type="number"
            name="price_before_discount"
            required
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
            color={formik.errors.price_before_discount ? "error" : "primary"}
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
        <FormControl className="w-5/12">
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
        </FormControl>
      </Box>

      <Button
        type="submit"
        disabled={!formik.dirty && formik.isValid}
        variant="contained"
        className="w-1/5"
        sx={{
          background: "primary",
          borderRadius: "3px",
          marginTop: "30px",
          color: "inherit",
        }}
        onClick={handleAddProduct}
      >
        <p className="font-semibold">{buttons}</p>
      </Button>
    </form>
  );
}
