import { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axiosInstance from "../../../../api/axiosInstance";

const OrdersDashboard = () => {
  const [orderSummary, setOrderSummary] = useState({
    total_orders: 0,
    total_products_count: 0,
    total_revenue: "0.00",
    weekly_revenue: "0.00",
    monthly_revenue: "0.00",
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        const vendorId = localStorage.getItem("userid");
        const response = await axiosInstance.get(`en/api/dashboard/vendor/${vendorId}/order-summary/`);
        setOrderSummary(response.data);
      } catch (error) {
        console.error("Failed to fetch order summary:", error);
      }
    };

    const fetchOrderDetails = async () => {
      try {
        const vendorId = localStorage.getItem("userid");
        const response = await axiosInstance.get(`en/api/dashboard/vendor/${vendorId}/productorderdetails/`);
        setOrders(response.data); // Assuming the response data is an array of order details
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };

    fetchOrderSummary();
    fetchOrderDetails();
  }, []);

  const columns = [
    { field: "customer_name", headerName: "Customer Name", width: 200 },
    { field: "product_name", headerName: "Product Name", width: 200 },
    { field: "order_date", headerName: "Order Date", width: 200 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "total_price", headerName: "Total Price ($)", width: 150 },
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

        {/* <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#287233", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Weekly Revenue</Typography>
              <Typography variant="h3">${orderSummary.weekly_revenue}</Typography>
              <AttachMoneyIcon fontSize="large" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#663399", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Monthly Revenue</Typography>
              <Typography variant="h3">${orderSummary.monthly_revenue}</Typography>
              <AttachMoneyIcon fontSize="large" />
            </CardContent>
          </Card>
        </Grid> */}

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
