import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridActionsCellItem,
    GridToolbar,
  } from "@mui/x-data-grid";
  import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Button,
    FormControl,
    FormLabel,
    IconButton,
    TextField,
    Typography,
  } from "@mui/material";
  import EditIcon from "@mui/icons-material/Edit";
  import { useState, useEffect } from "react";
  import { useFormik } from "formik";
import ProductForm from "./ProductForm";
  
  // Example product data; replace with actual fetch logic
  const exampleProducts = [
    {
      id: 1,
      name: "Product A",
      category: "Category 1",
      brand: "Brand X",
      stock: 10,
      price: 100,
      totalSold: 50,
      discount: 10,
    },
    {
      id: 2,
      name: "Product B",
      category: "Category 2",
      brand: "Brand Y",
      stock: 5,
      price: 200,
      totalSold: 30,
      discount: 15,
    },
    {
      id: 3,
      name: "Product C",
      category: "Category 3",
      brand: "Brand Z",
      stock: 15,
      price: 150,
      totalSold: 40,
      discount: 5,
    },
  ];
  
  export default function ProductGrid() {
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [open, setOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
  
    useEffect(() => {
      setRows(exampleProducts);
    }, []);
  
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
        slug: "",
        price_before_discount: currentProduct?.price || "",
        price_after_discount: "",
        stock_quantity: currentProduct?.stock || "",
        total_sold: currentProduct?.totalSold || "",
        total_views: "",
        supplier: "",
      },
      onSubmit: (values) => {
        console.log("Form values:", values);
        handleClose();
      },
    });
  
    const columns: GridColDef[] = [
      { field: "name", headerName: "Product Name", flex: 1, align:"center" , headerAlign:"center"},
      { field: "category", headerName: "Category", flex: 1, align:"center" , headerAlign:"center"},
      { field: "brand", headerName: "Brand", flex: 1, align:"center" , headerAlign:"center"},
      { field: "stock", headerName: "Stock Quantity", flex: 1, align:"center" , headerAlign:"center"},
      { field: "totalSold", headerName: "Total Sold", flex: 0.5, align:"center" , headerAlign:"center"},
      { field: "discount", headerName: "Discount Amount", flex: 1, align:"center" , headerAlign:"center"},
      { field: "price", headerName: "Price", flex: 1, align:"center" , headerAlign:"center"},
      {
        field: "update",
        headerName: "Update",
        flex: 0.5,
        sortable: false,align:"center" , headerAlign:"center",
        renderCell: (params) => (
          <IconButton
            onClick={() => handleEdit(params.row)}
            color="primary"
          >
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
            <DataGrid
                          slots={{
                            toolbar: GridToolbar,
                          }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
              fontSize: "1.1rem",
            },
            "& .MuiDataGrid-cell": {
              borderLeft: "0.25px solid lightgrey",
            },
            "& .MuiDataGrid-footerContainer": {
            },
          }}
        />
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
          <DialogTitle>Edit Product</DialogTitle>
                <DialogContent>
                    <ProductForm product={undefined} onSubmit={undefined} buttons={"update Product"}/>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
  