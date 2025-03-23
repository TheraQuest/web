import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Sidebar from "./Sidebar";

function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleToggleDrawer = () => setDrawerOpen(!drawerOpen);

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "#0077b6", zIndex: 1201 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleToggleDrawer}>
                        <MenuIcon /> 
                    </IconButton>
                    <Typography
                        variant="h6"
                        sx={{ flexGrow: 1, cursor: "pointer" }}
                        onClick={() => window.location.href = "/dashboard"} // Redirect to dashboard
                    >
                        TheraQuest
                    </Typography>
                    <Button color="inherit" onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/";
                    }}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Sidebar Drawer */}
            <Sidebar open={drawerOpen} onClose={handleToggleDrawer} />
        </>
    );
}

export default Navbar;
