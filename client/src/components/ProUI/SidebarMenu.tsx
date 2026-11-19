import { useState } from "react";

import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";

import {
    MdDashboard,
    MdOutlinePalette,
    MdOutlineTextFields,
    MdOutlineGridOn,
    MdOutlineColorLens,
    MdOutlineSmartButton,
    MdChevronLeft,
    MdChevronRight,
    MdExpandLess,
    MdExpandMore,
} from "react-icons/md";

import {
    LuCloudSun,
    LuUsers,
    LuWallet,
    LuShoppingCart,
    LuActivity,
    LuGlobe,
} from "react-icons/lu";

import type { IconType } from "react-icons";

// ==============================================
// Menu Data
// ==============================================

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

// ==============================================
// Types
// ==============================================

type MenuChild = {
    id: string;
    label: string;
    icon: IconType;
};

type MenuItem = {
    id: string;
    label: string;
    icon: IconType;
    children: MenuChild[];
};

// ==============================================
// Sidebar Component
// ==============================================

export default function SidebarMenu() {
    const [collapsed, setCollapsed] = useState(false);

    const [expandedMenu, setExpandedMenu] = useState<string | null>(
        "dashboard"
    );

    const [activeItem, setActiveItem] = useState("climatescope");

    const drawerWidth = collapsed ? 72 : 260;

    // Toggle parent submenu
    const handleMenuToggle = (menuId: string) => {
        if (collapsed) {
            setCollapsed(false);
            setExpandedMenu(menuId);
            return;
        }

        setExpandedMenu((prev) => (prev === menuId ? null : menuId));
    };

    // Select child menu
    const handleItemClick = (itemId: string) => {
        setActiveItem(itemId);

        // TODO: React Router navigation
        console.log("Selected menu:", itemId);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    overflowX: "hidden",
                    transition: "width 0.25s ease",
                    borderRight: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                },
            }}
        >
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
        </Drawer>
    );
}