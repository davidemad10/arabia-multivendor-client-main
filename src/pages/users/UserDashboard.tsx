import { t } from "i18next";
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
];

export default function UserDashboard() {
  // const token = sessionStorage.getItem("accessToken");
  const [activePanel, setActivepanel] = useState("profile");

  return (
    <div className="flex">
      {/* Left Panel */}
      <div className="bg-white w-80 min-h-screen start-0 top-0 p-10 ps-16 max-laptop:hidden">
        <div className="border-b-2 border-gray-200 pb-6">
          <p className="font-bold text-gray-700">{t("hala")}</p>
          <p className="font-light text-xs text-gray-400 break-words">
            abanoub.medhat.seif@gmail.com
          </p>
        </div>
        <div className="py-5 border-b-2 border-gray-200">
          {menuItems.map((item) => (
            <div
              key={item.title}
              className="flex gap-3 hover:bg-gray-200 active:bg-gray-300 p-5 transition-all duration-200 rounded-xl cursor-pointer"
              onClick={() => {
                setActivepanel(item.title);
              }}
            >
              <span>{item.icon}</span>
              <p className=" text-gray-400 ">{t(item.title)}</p>
            </div>
          ))}
        </div>
        <div>
          <button className="py-5 text-gray-400 hover:text-gray-500">
            {t("logout")}
          </button>
        </div>
      </div>
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
