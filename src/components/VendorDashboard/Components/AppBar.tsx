import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { Box, Stack, useTheme } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

interface AppBarProps extends MuiAppBarProps {
  open: boolean;
  onDrawerOpen: () => void;
  // setMode: ()=> void;
}

const drawerWidth = 240;

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar: React.FC<AppBarProps> = ({ open, onDrawerOpen, setMode }) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar
      position="fixed"
      open={open}
      onDrawerOpen={function (): void {
        throw new Error("Function not implemented.");
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerOpen}
          edge="start"
          sx={{ marginRight: 5, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>

        {open === false && (
          <Link to="/">
            <Box
              component="img"
              src="../../../../public/icons/4895665.png"
              alt="Logo"
              sx={{ height: 65, width: 65, marginRight: 2, marginLeft: 0 }}
            />
          </Link>
        )}

        {/* <Typography variant="h6" noWrap component="div">
          Vendor Dashboard
        </Typography> */}

        <Box flexGrow={1} />

        <Stack direction={"row"}>
          {theme.palette.mode === "light" ? (
            <IconButton
              onClick={() => {
                setMode((prevMode: string) =>
                  prevMode === "light" ? "dark" : "light"
                );
              }}
              color={"inherit"}
            >
              <NightlightOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                setMode((prevMode: string) =>
                  prevMode === "light" ? "dark" : "light"
                );
              }}
              color={"inherit"}
            >
              <LightModeOutlinedIcon />
            </IconButton>
          )}

          <IconButton
            color="inherit"
            aria-controls={isMenuOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? "true" : undefined}
            onClick={handleMenuOpen}
            style={{ marginInline: " 20px" }}
          >
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={isMenuOpen}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;
