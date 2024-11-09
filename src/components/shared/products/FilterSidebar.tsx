// FilterSidebar.tsx
import React, { useState } from "react";
import { Drawer, IconButton } from "@mui/material";
import AccordionUsage from "./AccordionUsage";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";

const FilterSidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  return (
    <>
      <span onClick={() => setIsOpen(true)}>
        <MenuOutlinedIcon />
      </span>
      <Drawer anchor="start" open={isOpen} onClose={toggleDrawer(false)}>
        <div role="presentation" style={{ width: 250 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              padding: "8px",
            }}
          >
            <IconButton onClick={toggleDrawer(false)}>
              <CloseIcon />
            </IconButton>
          </div>
          <AccordionUsage />
        </div>
      </Drawer>
    </>
  );
};

export default FilterSidebar;
