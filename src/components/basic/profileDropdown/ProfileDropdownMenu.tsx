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

const ProfileDropdownMenu = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("accessToken");

  console.log(token);
  const user = getUser(token);
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
        <Avatar
          sx={{ bgcolor: deepOrange[500] }}
          alt={full_name}
          src={profile_picture || "undefined"}
        />
      </div>

      {isOpen && (
        <div
          className={`dropdown-menu ${
            i18n.dir() === "rtl" ? "left-0" : "right-0"
          }`}
        >
          <ul>
            <li
              onClick={closeDropdown}
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
              {t("Logout")}
              <FaSignOutAlt className="menu-icon" />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdownMenu;
