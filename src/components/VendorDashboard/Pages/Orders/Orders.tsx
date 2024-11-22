import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axiosInstance from "../../../../api/axiosInstance";
import { getUser } from "../../../../../public/utils/functions";

const OrdersDashboard = () => {

  const [rows, setRows] = useState([]);

  const [orderSummary, setOrderSummary] = useState({
    total_orders: 0,
    total_products_count: 0,
    total_revenue: "0.00",
    weekly_revenue: "0.00",
    monthly_revenue: "0.00",
  });
  const [orders, setOrders] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const user = getUser(token);
  const vendorId = user.user_id;

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const response = await axiosInstance.get(`/dashboard/vendor/${vendorId}/order-summary/`);
        setOrderSummary(response.data);
      } catch (error) {
        console.error("Failed to fetch order summary:", error);
      }
    };

    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`/dashboard/vendor/${vendorId}/productorderdetails/`);
        setOrders(response.data); // Assuming the response data is an array of order details
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderSummary();
    fetchOrderDetails();
  }, [vendorId]);


  const handleEdit = (row) => {
    console.log("Editing order:", row);
    // Implement your edit logic here
  };


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
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 7 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#133E87", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Total Orders</Typography>
              <Typography variant="h3">{orderSummary.total_orders}</Typography>
              <ShoppingCartIcon fontSize="large" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Orders Table */}
      <Box sx={{ height: "auto", width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Order Details
        </Typography>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={orders}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
              textAlign: "center",
            },
            "& .MuiDataGrid-cell": {
              padding: 1,
              textAlign: "center",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default OrdersDashboard;
