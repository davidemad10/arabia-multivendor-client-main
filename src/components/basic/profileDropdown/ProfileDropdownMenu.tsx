import { useState } from "react";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import "./ProfileDropdownMenu.css";

const ProfileDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const handleLogout = () => {
    console.log("User logged out");
    closeDropdown();
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-avatar" onClick={toggleDropdown}>
        <img
          src="/path-to-your-uploaded-image.png" // Use the uploaded image here
          alt="Profile Avatar"
          className="avatar-img"
        />
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <ul>
            <li onClick={closeDropdown}>
              <FaUser className="menu-icon" /> View Profile
            </li>
            <li onClick={closeDropdown}>
              <FaCog className="menu-icon" /> Settings
            </li>
            <li onClick={handleLogout}>
              <FaSignOutAlt className="menu-icon" /> Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdownMenu;
