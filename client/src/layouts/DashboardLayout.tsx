import React, { useEffect } from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { TfiLayoutGrid3 } from "react-icons/tfi";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { blueGrey } from "@mui/material/colors";


import UserAccountMenu from "../../components/UserAccountMenu/UserAccountMenu";
import FooterCopyRight from "../../components/FooterCopyRight/FooterCopyRight";
import MenuList from "../../components/MenuList/MenuList";

import { Outlet, NavLink, ScrollRestoration } from "react-router-dom";

import { useCommonDataStore } from "../../stores/commonDataStore";
import { useAuthContext } from "../../contexts/AuthContext";

const drawerWidth = 280;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function DashboardLayout() {
  const { initializeCommonData } = useCommonDataStore();
  const { isAuthenticated, menu } = useAuthContext();

  useEffect(() => {
    // console.log("isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      initializeCommonData(); // fetches shared data only once after login
    }
  }, [isAuthenticated]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const menuData = menu || [];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        role="banner"
        position="fixed"
        open={open}
        sx={{
          backgroundColor: "rgba(255, 255, 255)", // White
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 20px 20px -20px",
          color: blueGrey[800],
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open navigation menu"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              display: open ? "none" : "inline-flex",
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            <NavLink to="/dashboard">
             Logo
            </NavLink>
          </Box>
          <Box>
            <UserAccountMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        role="navigation"
        variant="permanent"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#333F48", // Background color
            color: "#f9f9f9 !important", // Text color
          },
        }}
      >
        <DrawerHeader>
          <Stack flexDirection="row">
            {/* <HaleonFullLogoWhite width="200" height="auto" /> */}
            <IconButton
              aria-label="Close navigation menu"
              onClick={handleDrawerClose}
            >
              {theme.direction === "rtl" ? (
                // <ChevronRightIcon />
                <TfiLayoutGrid3 />
              ) : (
                // <ChevronLeftIcon sx={{ color: "#f9f9f9" }} />
                <TfiLayoutGrid3 style={{ color: "#f9f9f9" }} />
              )}
            </IconButton>
          </Stack>
        </DrawerHeader>
        <Divider />
        <Box
          sx={{
            overflowY: "auto",
            overflowX: "hidden", // prevent horizontal scrollbar
            // height: "100vh",
            height: "calc(100vh - 64px)", // Assuming AppBar height is 64px
            // padding: "16px",
            scrollbarWidth: "thin", // For Firefox
            scrollbarColor: "#4e6374 transparent", // For Firefox
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#4e6374",
              transition: "background 2s ease",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#5f798f",
            },
          }}
          className="custom-scrollbar"
        >
          <List sx={{ paddingTop: 0, marginTop: 0 }}>
            <MenuList menuData={menuData} open={open} />
          </List>
        </Box>
        {/* <Divider /> */}
      </Drawer>
      <Box
        component="main"
        role="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
          flex: 1,
          overflowX: "hidden",
          width: "100%",
        }}
      >
        <Box
          component="section"
          sx={{
            position: "relative",
            flex: 1,
            p: 2,
            boxSizing: "border-box",
            maxWidth: "100%",
          }}
        >
          <ScrollRestoration />
          <DrawerHeader />
          <Outlet />
        </Box>

        <Box
          sx={{
            mt: "auto",
            bgcolor: "#ffffff",
            width: "100%",
            padding: "0.8rem 1.5rem",
          }}
        >
          <FooterCopyRight />
        </Box>
      </Box>
    </Box>
  );
}
