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
    title: "address",
    component: <Address address="confirmYourAddress"></Address>,
  },
  {
    title: "phone number",
    component: <Password></Password>,
  },
];

export default function CheckoutPage() {
  const [activePanel, setActivepanel] = useState("address");

  return (
    <div className="flex">
      <div className="mx-auto w-2/3 p-10">
        {menuItems.map((item) =>
          item.title === activePanel ? (
            <div key={item.title}>{item.component}</div>
          ) : null
        )}
      </div>
    </div>
  );
}
