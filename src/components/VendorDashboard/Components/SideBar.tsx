import React from "react";
import { CSSObject, styled, Theme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { useTheme } from "@emotion/react";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SideBarProps {
  open: boolean;
  onDrawerClose: () => void;
}

const firstSection = [
  {
    text: "Dashboard",
    icon: <SpeedOutlinedIcon />,
    path: "/VedorDashboard",
  },
];
const secondSection = [
  {
    text: "Add Product",
    icon: <CreateNewFolderOutlinedIcon />,
    path: "/AddProducts",
  },
  {
    text: "Update Product",
    icon: <EditNoteOutlinedIcon />,
    path: "/updateProduct",
  },
  {
    text: "Orders",
    icon: <ShoppingCartOutlinedIcon />,
    path: "/orders",
  },
];

const thirdSection = [
  {
    text: "Payment Request",
    icon: <AddCardOutlinedIcon />,
    path: "/paymentRequest",
  },
  {
    text: "Earnings",
    icon: <AttachMoneyOutlinedIcon />,
    path: "/updateProduct",
  },
  {
    text: "Promos and Discount",
    icon: <SellOutlinedIcon />,
    path: "/discounts",
  },
];

const SideBar: React.FC<SideBarProps> = ({ open, onDrawerClose }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <Link to="/">
          <Box
            component="img"
            src="../../../../public/icons/4895665.png"
            alt="Logo"
            sx={{ height: 65, width: 65, marginRight: 0, marginLeft: 0 }}
          />
        </Link>
        <Typography
          sx={{ fontSize: "20px", marginRight: "auto" }}
          noWrap
          component="div"
        >
          Vendor
        </Typography>
        <IconButton
          aria-label="close drawer"
          color="inherit"
          onClick={onDrawerClose}
        >
          <MenuIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />

      <Avatar
        sx={{
          mx: "auto",
          my: 1,
          width: open ? "70px" : "55px",
          height: open ? "70px" : "55px",
          border: "2px solid gray",
          transition: "0.5s",
        }}
        alt="User Image"
        src="/static/images/avatar/2.jpg"
      />
      <Typography
        align="center"
        variant="body1"
        sx={{ fontSize: open ? 17 : 0, transition: "0.75s" }}
      >
        Name
      </Typography>
      <Typography
        align="center"
        color="gray"
        variant="body2"
        sx={{
          fontSize: open ? 12 : 0,
          transition: "0.75s",
          color: theme.palette.error.main,
        }}
      >
        Vendor
      </Typography>

      <Divider />

      <List>
        {firstSection.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondSection.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {thirdSection.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                navigate(item.path);
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Link
        to="/"
        style={{ textDecoration: "none", color: "inherit", marginTop: 4 }}
      >
        <Typography
          align="center"
          color="gray"
          variant="body2"
          sx={{ fontSize: open ? 12 : 0, mt: 2 }}
        >
          Back To Home
        </Typography>
      </Link>
    </Drawer>
  );
};

export default SideBar;
