import { Box, Button, FormControl, FormLabel, TextField } from "@mui/material";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";
import { z } from "zod";
import { t } from "i18next";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function ProductForm({ product, onSubmit , buttons }) { 
    const schema = z.object({
        productName: z.string().min(2, { message: "Product name is required" }),
        category: z.string().min(1, { message: "Category is required" }),
        brand: z.string().optional(),
        specifications: z.string().optional(),
        image_uploads: z
          .string()
          .url({ message: "Must be a valid URL" })
          .optional(),
        slug: z.string().min(1, { message: "Slug is required" }),
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
          brand: "",
          specifications: "",
          image_uploads: "",
          slug: "",
          price_before_discount: 0,
          price_after_discount: 0,
          stock_quantity: 0,
          total_sold: 0,
          total_views: 0,
          supplier: "",
        },
        validationSchema: toFormikValidationSchema(schema),
        onSubmit: async (values) => {},
    });
    


    return (
        <form onSubmit={formik.handleSubmit}>
        <Box className="flex flex-wrap gap-9">
          {/* Product Name */}
          <FormControl className="w-5/12">
            <FormLabel htmlFor="productName">{t("productName")}</FormLabel>
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
              helperText={
                formik.touched.productName && formik.errors.productName
              }
              color={formik.errors.productName ? "error" : "primary"}
            />
          </FormControl>

          {/* Category */}
          <FormControl className="w-5/12">
            <FormLabel htmlFor="category">{t("category")}</FormLabel>
            <TextField
              className="w-full"
              name="category"
              required
              id="category"
              onBlur={formik.handleBlur}
              value={formik.values.category}
              onChange={formik.handleChange}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
              color={formik.errors.category ? "error" : "primary"}
            />
          </FormControl>

          {/* Brand */}
          <FormControl className="w-5/12">
            <FormLabel htmlFor="brand">{t("brand")}</FormLabel>
            <TextField
              className="w-full"
              name="brand"
              required
              id="brand"
              onBlur={formik.handleBlur}
              value={formik.values.brand}
              onChange={formik.handleChange}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
              color={formik.errors.brand ? "error" : "primary"}
            />
          </FormControl>

          {/* Specifications */}
          <FormControl className="w-5/12">
            <FormLabel htmlFor="specifications">
              {t("specifications")}
            </FormLabel>
            <TextField
              className="w-full"
              name="specifications"
              required
              id="specifications"
              onBlur={formik.handleBlur}
              value={formik.values.specifications}
              onChange={formik.handleChange}
              error={
                formik.touched.specifications &&
                Boolean(formik.errors.specifications)
              }
              helperText={
                formik.touched.specifications && formik.errors.specifications
              }
              color={formik.errors.specifications ? "error" : "primary"}
            />
          </FormControl>

          {/* Image Uploads */}
          <FormControl className="w-5/12">
            <FormLabel htmlFor="image_uploads">{t("imageUploads")}</FormLabel>
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

          {/* Slug */}
          <FormControl className="w-5/12">
            <FormLabel htmlFor="slug">{t("slug")}</FormLabel>
            <TextField
              className="w-full"
              name="slug"
              required
              id="slug"
              onBlur={formik.handleBlur}
              value={formik.values.slug}
              onChange={formik.handleChange}
              error={formik.touched.slug && Boolean(formik.errors.slug)}
              helperText={formik.touched.slug && formik.errors.slug}
              color={formik.errors.slug ? "error" : "primary"}
            />
          </FormControl>

          {/* Price Before Discount */}
          <FormControl className="w-5/12">
            <FormLabel htmlFor="price_before_discount">
              {t("priceBeforeDiscount")}
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
              {t("priceAfterDiscount")}
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
            <FormLabel htmlFor="stock_quantity">{t("stockQuantity")}</FormLabel>
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

          {/* Total Sold */}
          <FormControl className="w-5/12">
            <FormLabel htmlFor="total_sold">{t("totalSold")}</FormLabel>
            <TextField
              className="w-full"
              type="number"
              name="total_sold"
              id="total_sold"
              onBlur={formik.handleBlur}
              value={formik.values.total_sold}
              onChange={formik.handleChange}
              error={
                formik.touched.total_sold && Boolean(formik.errors.total_sold)
              }
              helperText={formik.touched.total_sold && formik.errors.total_sold}
              color={formik.errors.total_sold ? "error" : "primary"}
            />
          </FormControl>

          {/* Total Views */}
          <FormControl className="w-5/12">
            <FormLabel htmlFor="total_views">{t("totalViews")}</FormLabel>
            <TextField
              className="w-full"
              type="number"
              name="total_views"
              id="total_views"
              onBlur={formik.handleBlur}
              value={formik.values.total_views}
              onChange={formik.handleChange}
              error={
                formik.touched.total_views && Boolean(formik.errors.total_views)
              }
              helperText={
                formik.touched.total_views && formik.errors.total_views
              }
              color={formik.errors.total_views ? "error" : "primary"}
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
          sx={{ background: "black", borderRadius: "3px", marginTop: "30px" }}
        >
          <p className="font-semibold">{t(buttons)}</p>
        </Button>
      </form>
    )
}