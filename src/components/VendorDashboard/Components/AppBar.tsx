import React from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import LanguageSelector from "../Locales/LanguageSelector";
import { t } from "i18next";
import { useDispatch } from "react-redux";
import { signOut } from "../../../redux/slices/userSlice";
import { FaSignOutAlt } from "react-icons/fa";

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
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);




  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    navigate("/VendorProfile", {
      state: {
        avatarUrl: "",
        name: "",
        email: "",
        phone: "",
        address: "",
        description: "",
      },
    });
  };

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/");
    console.log("User logged out");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar
      position="fixed"
      color="inherit"
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
          <>
            <Link to="/">
              <Box
                component="img"
                src="../../../../public/icons/4895665.png"
                alt="Logo"
                sx={{ height: 65, width: 65, marginRight: 2, marginLeft: 0 }}
              />
            </Link>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                color: "inherit",
                fontSize: 32,
                fontWeight: "300",
                fontFamily: "'Poppins', sans-serif ",
                letterSpacing: 1,
                textTransform: "uppercase",
                marginTop: "5px",
              }}
            >
              Vendor
            </Typography>
          </>
        )}

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

          <LanguageSelector />

          <IconButton
            color="inherit"
            aria-controls={isMenuOpen ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={isMenuOpen ? "true" : undefined}
            onClick={handleMenuOpen}
            style={{ marginInline: 5 }}
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
            <MenuItem onClick={handleProfileClick}>
              <PersonOutlineOutlinedIcon />
              Profile
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <FaSignOutAlt className="menu-icon" />

              {t("logout")}
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

export default AppBar;

// import { Trans, useTranslation } from "react-i18next";

//   const { i18n, t } = useTranslation();

//                           <Trans i18nKey="login"></Trans>

{
  /* <FormLabel htmlFor="email">{t("email")}</FormLabel> */
}
// import { t } from "i18next";
