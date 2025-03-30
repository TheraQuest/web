import { Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

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
                                backgroundColor: "#91c9b0",
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
                                backgroundColor: "#91c9b0",
                                cursor: "pointer",
                            },
                        }}
                    >
                        <ListItemText primary="Add Patient" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => { navigate("/therapist"); onClose(); }}
                        sx={{
                            "&:hover": {
                                backgroundColor: "#91c9b0",
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
