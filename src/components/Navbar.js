import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [therapist, setTherapist] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTherapist = async () => {
            try {
                const token = localStorage.getItem("token");
               const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/therapist`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Therapist response:", response.data); 
                setTherapist(response.data);
            } catch (error) {
                console.error("Error fetching therapist:", error);
            }
        };
        fetchTherapist();
    }, []);


    const handleToggleDrawer = () => setDrawerOpen(!drawerOpen);

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: "#1f6446", zIndex: 1201 }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleToggleDrawer}>
                        <MenuIcon />
                    </IconButton>

                    <Typography
                        variant="h6"
                        color="white"
                        sx={{ flexGrow: 1, cursor: "pointer" }}
                        onClick={() => navigate("/dashboard")}
                    >
                        TheraQuest
                    </Typography>

                    {therapist && (
                        <Tooltip
                            title={
                                <>
                                    <Typography variant="subtitle2">{therapist.fullName || therapist.name}</Typography>
                                    {/* <Typography variant="body2">{therapist.email}</Typography> */}
                                </>
                            }
                            arrow
                        >
                            <Avatar
                                src={therapist.profilePic || "/default-avatar.png"}
                                alt={therapist.fullName || therapist.name}
                                onClick={() => navigate("/therapist")}
                                sx={{ width: 40, height: 40, marginRight: 2, cursor: "pointer" }}
                            />
                        </Tooltip>
                    )}

                    <Button
                        color="inherit"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/");
                        }}
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Sidebar open={drawerOpen} onClose={handleToggleDrawer} />
        </>
    );
}

export default Navbar;






// import { AppBar, Toolbar, Typography, Button, IconButton, Avatar } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import axios from "axios";

// function Navbar() {
//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const [therapist, setTherapist] = useState(null);
//     const navigate = useNavigate();



//     useEffect(() => {
//         const fetchTherapist = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const response = await axios.get("http://localhost:5000/api/therapist", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 console.log("Therapist data:", response.data); // Debug here
//                 setTherapist(response.data);
//             } catch (error) {
//                 console.error("Error fetching therapist:", error);
//             }
//         };
//         fetchTherapist();
//     }, []);
    

//     // useEffect(() => {
//     //     const fetchTherapist = async () => {
//     //         try {
//     //             const token = localStorage.getItem("token");
//     //             const response = await axios.get("http://localhost:5000/api/therapist", {
//     //                 headers: { Authorization: `Bearer ${token}` }
//     //             });
//     //             setTherapist(response.data);
//     //         } catch (error) {
//     //             console.error("Error fetching therapist:", error);
//     //         }
//     //     };
//     //     fetchTherapist();
//     // }, []);

//     const handleToggleDrawer = () => setDrawerOpen(!drawerOpen);


//     return (
//         <>
//             {/* <AppBar position="fixed" sx={{ backgroundColor: "#0077b6", zIndex: 1201 }}> */}
//             <AppBar position="fixed" sx={{ backgroundColor: "##1f6446", zIndex: 1201 }}>
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={handleToggleDrawer}>
//                         <MenuIcon /> 
//                     </IconButton>
//                     <Typography
//                         variant="h6" color="white"
//                         sx={{ flexGrow: 1, cursor: "pointer" }}
//                         onClick={() => window.location.href = "/dashboard"} // Redirect to dashboard
//                     >
//                         TheraQuest
//                     </Typography>

//                     {therapist && (
//                         <>
//                             {console.log("Profile Image URL:", therapist.profilePic)}
//                             <Avatar
//                                 src={therapist.profilePic ? therapist.profilePic : "/default-avatar.png"}
//                                 alt={therapist.name}
//                                 onClick={() => { navigate("/therapist"); }} // Redirect to therapist profile}
//                                 sx={{ width: 40, height: 40, marginRight: 2, 
//                                     "&hover": {

//                                 } }}
//                                 />
//                         </>
//                     )}


//                     {/* {therapist && (
//                         <Avatar
//                             src={therapist.profilePic || "/default-avatar.png"} // Use a default image if none exists
//                             alt={therapist.name}
//                             sx={{ width: 40, height: 40, marginRight: 2 }}
//                         />
//                     )} */}

//                     <Button color="inherit" onClick={() => {
//                         localStorage.removeItem("token");
//                         window.location.href = "/";
//                     }}>
//                         Logout
//                     </Button>
//                 </Toolbar>
//             </AppBar>

//             {/* Sidebar Drawer */}
//             <Sidebar open={drawerOpen} onClose={handleToggleDrawer} />
//         </>
//     );
// }

// export default Navbar;
