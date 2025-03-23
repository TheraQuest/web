import { Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Sidebar({ open, onClose }) {
    const navigate = useNavigate();

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box sx={{ width: 240 ,pt:8}}>
                <List>
                    <ListItem
                        button
                        onClick={() => { navigate("/dashboard"); onClose(); }}
                        sx={{
                            "&:hover": {
                                backgroundColor: "#c4ddea",
                                cursor: "pointer",
                            },
                        }}
                    >
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => { navigate("/add-patient"); onClose(); }}
                        sx={{
                            "&:hover": {
                                backgroundColor: "#c4ddea",
                                cursor: "pointer",
                            },
                        }}
                    >
                        <ListItemText primary="Add Patient" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => { navigate("/settings"); onClose(); }}
                        sx={{
                            "&:hover": {
                                backgroundColor: "#c4ddea",
                                cursor: "pointer",
                            },
                        }}
                    >
                        <ListItemText primary="Settings" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}

export default Sidebar;
