import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import axiosInstance from "../../../../api/axiosInstance";
import { getUser } from "../../../../../public/utils/functions";

const OrdersDashboard = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [orderSummary, setOrderSummary] = useState({
    total_orders: 0,
    total_products_count: 0,
    total_revenue: "0.00",
    weekly_revenue: "0.00",
    monthly_revenue: "0.00",
  });

  const token = sessionStorage.getItem("accessToken");
  const user = getUser(token);
  const vendorId = user?.user_id;

  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch order summary
        const summaryResponse = await axiosInstance.get(
          `/dashboard/vendor/${vendorId}/order-summary/`
        );
        setOrderSummary(summaryResponse.data);

        // Fetch order details
        const ordersResponse = await axiosInstance.get(
          `/dashboard/vendor/${vendorId}/productorderdetails/`
        );

        console.log(
          "ordersResponseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
          ordersResponse
        );
        // Map API response to match the DataGrid row structure
        const formattedOrders = ordersResponse.data.map((order) => ({
          id: order.order_id, // Unique key for DataGrid
          customerName: order.customer_name,
          productName: order.product_name,
          orderDate: new Date(order.order_date).toLocaleDateString(), // Format date
          quantity: order.quantity,
          totalPrice: order.total_price,
        }));
        setRows(formattedOrders);
      } catch (error) {
        console.error("Error fetching order data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchOrderData();
  }, [vendorId]);

  const columns = [
    {
      field: "id",
      headerName: "Order ID",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "customerName",
      headerName: "Customer Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 0.5,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      flex: 1,
      headerAlign: "center",
      align: "center",
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
        {/* Add more cards for other summaries if needed */}
      </Grid>

      {/* Orders Table */}
      <Box sx={{ height: "auto", width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          Order Details
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
        )}
      </Box>
    </Box>
  );
};

export default OrdersDashboard;
