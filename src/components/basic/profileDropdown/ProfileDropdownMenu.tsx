import { useEffect, useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import "./ProfileDropdownMenu.css";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, signOut } from "../../../redux/slices/userSlice";

const ProfileDropdownMenu = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  console.log(token);

  // useEffect(() => {
  //   const restoreToken = (token: any) => {
  //     if (token) {
  //       const storedToken = sessionStorage.getItem("accessToken");
  //       if (storedToken) {
  //         console.log("Restoring token from sessionStorage");
  //         token = "hamada";
  //         console.log(token);
  //         console.log("Restoring token from sessionStorage");
  //       } else {
  //         console.log("No token found, logging out...");
  //         // dispatch(signOut());
  //       }
  //     }
  //   };

  //   restoreToken(token);
  //   console.log(token);
  // }, [dispatch, token]);

  const handleLogout = () => {
    dispatch(signOut());
    console.log("User logged out");
    closeDropdown();
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-avatar" onClick={toggleDropdown}>
        <img
          src="/path-to-your-uploaded-image.png"
          alt="Profile Avatar"
          className="avatar-img"
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
