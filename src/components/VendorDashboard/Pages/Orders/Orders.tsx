import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const OrdersDashboard = () => {
  const [orders] = useState([
    {
      id: 1,
      orderNumber: "1001",
      customer: "John Doe",
      total: 150,
      status: "in progress",
      date: "2024-10-01",
    },
    {
      id: 2,
      orderNumber: "1002",
      customer: "Jane Smith",
      total: 200,
      status: "penndimg",
      date: "2024-10-03",
    },
    {
      id: 3,
      orderNumber: "1003",
      customer: "Alice Brown",
      total: 300,
      status: "approved",
      date: "2024-10-05",
    },
    // Add more orders as needed
  ]);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const columns = [
    {
      field: "orderNumber",
      headerName: "Order #",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "customer",
      headerName: "Customer",
      flex: 1,
      headerAlign: "center",
    },
    {
      field: "total",
      headerName: "Total Amount ($)",
      flex: 0.5,
      headerAlign: "center",
    },
    { field: "status", headerName: "Status", flex: 1, headerAlign: "center" },
    { field: "date", headerName: "Date", flex: 1, headerAlign: "center" },
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
              <Typography variant="h3">{totalOrders}</Typography>
              <ShoppingCartIcon fontSize="large" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: "#A34343", color: "white" }}>
            <CardContent>
              <Typography variant="h5">Total Revenue</Typography>
              <Typography variant="h3">${totalRevenue}</Typography>
              <AttachMoneyIcon fontSize="large" />
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
