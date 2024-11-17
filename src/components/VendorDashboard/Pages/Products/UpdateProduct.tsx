import {
  DataGrid,
  GridRowsProp,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import axiosInstance from "../../../../api/axiosInstance";
import ProductForm from "./ProductForm";

export default function ProductGrid() {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [rowCount, setRowCount] = useState(0); // Total count from the API
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch products from the API with pagination
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axiosInstance.get("/products/", {
          params: {
            page: page + 1, // API pages are usually 1-indexed
            page_size: pageSize,
          },
        });
        console.log("API response:", response.data);

        // Map API response to the structure expected by DataGrid rows
        const formattedRows = response.data.results.map(
          (product: {
            id: any;
            translations: { en: { name: any } };
            category: { translations: { en: { name: any } } };
            brand: { translations: { en: { name: any } } };
            stock_quantity: any;
            total_sold: any;
            price_before_discount: number;
            price_after_discount: number;
          }) => ({
            id: product.id,
            name: product.translations.en.name,
            category: product.category.translations.en.name,
            brand: product.brand.translations.en.name,
            stock: product.stock_quantity,
            totalSold: product.total_sold,
            discount:
              product.price_before_discount - product.price_after_discount,
            price: product.price_after_discount,
          })
        );

        setRows(formattedRows);
        setRowCount(response.data.count); // Set total count for pagination
      } catch (error) {
        console.error("Error fetching products:", error);
        setRows([]); // Set rows to an empty array if there's an error
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchProducts();
  }, [page, pageSize]);

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentProduct(null);
  };

  const formik = useFormik({
    initialValues: {
      productName: currentProduct?.name || "",
      category: currentProduct?.category || "",
      brand: currentProduct?.brand || "",
      specifications: "",
      image_uploads: [],
      price_before_discount: currentProduct?.price || "",
      price_after_discount: "",
      stock_quantity: currentProduct?.stock || "",
      total_sold: currentProduct?.totalSold || "",
      total_views: "",
      supplier: "",
    },
    onSubmit: async (values) => {
      const token = sessionStorage.getItem("accessToken");
      // Create an object with only the fields that need to be updated
      const updatedFields = {};
      if (values.productName !== currentProduct?.name)
        updatedFields.name = values.productName;
      if (values.category !== currentProduct?.category)
        updatedFields.category = values.category;
      if (values.brand !== currentProduct?.brand)
        updatedFields.brand = values.brand;
      if (values.price_before_discount !== currentProduct?.price)
        updatedFields.price_before_discount = values.price_before_discount;
      if (values.stock_quantity !== currentProduct?.stock)
        updatedFields.stock_quantity = values.stock_quantity;
      if (values.total_sold !== currentProduct?.totalSold)
        updatedFields.total_sold = values.total_sold;

      try {
        const response = await axiosInstance.patch(
          `/products/${currentProduct.id}/`,
          {
            updatedFields,
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
        console.log("Product updated:", response.data);
        handleClose();
      } catch (error) {
        console.error("Error updating product:", error);
      }
    },
  });

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      headerAlign: "center",
    },
    { field: "brand", headerName: "Brand", flex: 1, headerAlign: "center" },
    {
      field: "stock",
      headerName: "Stock Quantity",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "totalSold",
      headerName: "Total Sold",
      flex: 0.5,
      headerAlign: "center",
    },
    {
      field: "discount",
      headerName: "Discount Amount",
      flex: 1,
      headerAlign: "center",
    },
    { field: "price", headerName: "Price", flex: 1, headerAlign: "center" },
    {
      field: "update",
      headerName: "Update",
      flex: 0.5,
      sortable: false,
      headerAlign: "center",
      renderCell: (params) => (
        <IconButton onClick={() => handleEdit(params.row)} color="primary">
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: "auto", width: "100%", margin: "20px auto" }}>
      <Typography style={{ fontSize: 40, marginBottom: 20 }}>
        Your Products
      </Typography>
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="400px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          paginationMode="server" // Enable server-side pagination
          rowCount={rowCount} // Total count for server-side pagination
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
              fontSize: "1.1rem",
            },
            "& .MuiDataGrid-cell": {
              textAlign: "center",
            },
            "& .MuiDataGrid-footerContainer": {},
          }}
        />
      )}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <ProductForm
            product={currentProduct}
            onSubmit={formik.handleSubmit}
            buttons={"Update Product"}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
