import { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import "./ProfileDropdownMenu.css";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { signOut } from "../../../redux/slices/userSlice";
import { getUser } from "../../../../public/utils/functions";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { Link, useNavigate } from "react-router-dom";

const ProfileDropdownMenu = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("accessToken");

  console.log(token);
  const user = getUser(token);
  const navigate = useNavigate();
  console.log("This is user ==========>", user);
  const { full_name, profile_picture } = user;

  const handleLogout = () => {
    dispatch(signOut());
    console.log("User logged out");
    closeDropdown();
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-avatar" onClick={toggleDropdown}>
        {/* <h6 className="hello">Ahlan !</h6> */}
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt={full_name}
          src={profile_picture || "undefined"}
        />
      </div>

      {isOpen && (
        <div className="dropdown-menu -start-40">
          <ul>
            <li
              onClick={() => {
                navigate("profile");
                closeDropdown();
              }}
              className={
                i18n.dir() === "rtl"
                  ? "flex-row-reverse justify-end"
                  : "justify-end"
              }
            >
              {t("yourProfile")}
              <FaUser className="menu-icon" />
            </li>
            <li
              onClick={handleLogout}
              className={
                i18n.dir() === "rtl"
                  ? "flex-row-reverse justify-end"
                  : "justify-end"
              }
            >
              {t("logout")}
              <FaSignOutAlt className="menu-icon" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdownMenu;
