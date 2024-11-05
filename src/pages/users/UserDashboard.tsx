import { orange } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import { useState } from "react";
import Profile from "./UserDashboardComponents/Profile";
import Wishlist from "./UserDashboardComponents/Wishlist";
import Orders from "./UserDashboardComponents/Orders";
import Address from "./UserDashboardComponents/Address";
import PasswordIcon from "@mui/icons-material/Password";
import SidePanel from "../../components/user/SidePanel";
import Password from "./UserDashboardComponents/Password";

const menuItems = [
  {
    title: "profile",
    icon: <AccountCircleIcon sx={{ color: orange[900] }}></AccountCircleIcon>,
    component: <Profile></Profile>,
  },
  {
    title: "wishlist",
    icon: <FavoriteIcon sx={{ color: orange[900] }}></FavoriteIcon>,
    component: <Wishlist></Wishlist>,
  },
  {
    title: "orders",
    icon: <ListAltIcon sx={{ color: orange[900] }}></ListAltIcon>,
    component: <Orders></Orders>,
  },
  {
    title: "address",
    icon: (
      <PersonPinCircleIcon sx={{ color: orange[900] }}></PersonPinCircleIcon>
    ),
    component: <Address></Address>,
  },
  {
    title: "password",
    icon: <PasswordIcon sx={{ color: orange[900] }}></PasswordIcon>,
    component: <Password></Password>,
  },
];

export default function UserDashboard() {
  // const token = sessionStorage.getItem("accessToken");
  const [activePanel, setActivepanel] = useState("profile");

  return (
    <div className="flex">
      {/* Left Panel */}
      <SidePanel
        setActivePanel={setActivepanel}
        menuItems={menuItems}
      ></SidePanel>
      {/* Right Panel */}
      <div className="bg-gray-200 flex-1 p-10">
        {menuItems.map((item) =>
          item.title === activePanel ? (
            <div key={item.title}>{item.component}</div>
          ) : null
        )}
      </div>
    </div>
  );
}
