// FilterSidebar.tsx
import React, { useState } from "react";
import { Drawer, Button, List, ListItem, ListItemText } from "@mui/material";
import AccordionUsage from "./AccordionUsage";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const FilterSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const menuItems = ["Home", "About", "Services", "Contact"];

  return (
    <>
      <span onClick={() => setIsOpen(true)}>
        <MenuOutlinedIcon></MenuOutlinedIcon>
      </span>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer(false)}>
        <div
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <AccordionUsage />
        </div>
      </Drawer>
    </>
  );
};

export default FilterSidebar;
