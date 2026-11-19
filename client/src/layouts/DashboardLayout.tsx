import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// -------------------------
// ICONS
// -------------------------
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Tooltip from '@mui/material/Tooltip';


import {
  MdDashboard,
  MdOutlineDashboard,
  MdOutlinePalette,
  MdOutlineTextFields,
  MdOutlineGridOn,
  MdOutlineColorLens,
  MdOutlineSmartButton,
} from "react-icons/md";

import {
  LuCloudSun,
  LuUsers,
  LuWallet,
  LuShoppingCart,
  LuActivity,
  LuGlobe,
} from "react-icons/lu";

// -------------------------------
// Pages
// -------------------------------

import Home from "../pages/Home/Home";

import ColorRule from "../components/ProUI/ColorRule";



const drawerWidth = 240;

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const menuData = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    children: [
      { id: "climatescope", label: "ClimateScope", icon: LuCloudSun },
      { id: "workforcehub", label: "WorkforceHub", icon: LuUsers },
      { id: "financelens", label: "FinanceLens", icon: LuWallet },
      { id: "commercepulse", label: "CommercePulse", icon: LuShoppingCart },
      { id: "healthmetrics", label: "HealthMetrics", icon: LuActivity },
      { id: "globalrisk", label: "GlobalRisk Monitor", icon: LuGlobe },
    ],
  },
  {
    id: "ui-guidelines",
    label: "UI Guidelines",
    icon: MdOutlinePalette,
    children: [
      { id: "typography", label: "Typography", icon: MdOutlineTextFields },
      { id: "bento-grid", label: "Bento Grid", icon: MdOutlineGridOn },
      { id: "color-rule", label: "Color Rules", icon: MdOutlineColorLens },
      { id: "grid", label: "Grid", icon: MdOutlineGridOn },
      { id: "buttons", label: "Buttons", icon: MdOutlineSmartButton },
    ],
  },
];

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  variants: [
    {
      props: ({ open }) => open,
      style: {
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState(false);


  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: "#f9f9f9", color: "#999" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            Multi Dashboards
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {/* --------------------------------- */}
            {/* User Profile - Appbar */}
            {/* --------------------------------- */}
            <Menu
              sx={{ mt: '40px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem sx={{ width: "200px" }} key={setting} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton aria-label="close drawer" onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* Sidebar Header */}
        <Box
          sx={{
            height: 64,
            px: collapsed ? 1 : 2,
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          {!collapsed && (
            <Typography variant="h6" fontWeight={700}>
              InsightForge
            </Typography>
          )}

          <IconButton
            size="small"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
          </IconButton>
        </Box>

        {/* Sidebar Menu */}
        <List sx={{ px: 1, pt: 1 }}>
          {menuData.map((menu: MenuItem) => {
            const ParentIcon = menu.icon;

            const isExpanded = expandedMenu === menu.id;

            const hasActiveChild = menu.children.some(
              (child) => child.id === activeItem
            );

            return (
              <Box key={menu.id}>
                {/* Parent Menu */}
                <Tooltip
                  title={collapsed ? menu.label : ""}
                  placement="right"
                  arrow
                >
                  <ListItemButton
                    onClick={() => handleMenuToggle(menu.id)}
                    sx={{
                      minHeight: 44,
                      px: collapsed ? 1.5 : 2,
                      mb: 0.5,
                      borderRadius: 2,

                      justifyContent: collapsed
                        ? "center"
                        : "flex-start",

                      bgcolor: hasActiveChild
                        ? "action.selected"
                        : "transparent",

                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: collapsed ? 0 : 36,
                        justifyContent: "center",
                        color: hasActiveChild
                          ? "primary.main"
                          : "text.secondary",
                      }}
                    >
                      <ParentIcon size={20} />
                    </ListItemIcon>

                    {!collapsed && (
                      <>
                        <ListItemText
                          primary={menu.label}
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: hasActiveChild ? 600 : 500,
                          }}
                        />

                        {isExpanded ? (
                          <MdExpandLess size={20} />
                        ) : (
                          <MdExpandMore size={20} />
                        )}
                      </>
                    )}
                  </ListItemButton>
                </Tooltip>

                {/* Child Menus */}
                {!collapsed && (
                  <Collapse
                    in={isExpanded}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      component="div"
                      disablePadding
                      sx={{ mb: 1 }}
                    >
                      {menu.children.map((child) => {
                        const ChildIcon = child.icon;

                        const isActive = activeItem === child.id;

                        return (
                          <ListItemButton
                            key={child.id}
                            onClick={() => handleItemClick(child.id)}
                            sx={{
                              minHeight: 40,
                              pl: 3,
                              pr: 2,
                              ml: 1,
                              mb: 0.3,
                              borderRadius: 2,

                              bgcolor: isActive
                                ? "primary.main"
                                : "transparent",

                              color: isActive
                                ? "primary.contrastText"
                                : "text.secondary",

                              "&:hover": {
                                bgcolor: isActive
                                  ? "primary.dark"
                                  : "action.hover",
                              },
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 32,
                                color: "inherit",
                              }}
                            >
                              <ChildIcon size={17} />
                            </ListItemIcon>

                            <ListItemText
                              primary={child.label}
                              primaryTypographyProps={{
                                fontSize: 13,
                                fontWeight: isActive ? 600 : 400,
                              }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
        <List>
          {['Dashboards', 'Send email', 'UI Guidlines'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />


        <Home />
        <ul>
          <li>ClimateScope</li>
          <li>WorkforceHub</li>
          <li>FinanceLens</li>
          <li>CommercePulse</li>
          <li>HealthMetrics</li>
          <li>GlobalRisk Monitor</li>
        </ul>

        <ColorRule />

      </Main>
    </Box>
  );
}
