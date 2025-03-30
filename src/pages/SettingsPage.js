import { useState } from "react";
import { Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
// import axios from "axios";

function SettingsPage() {
    // const [therapist, setTherapist] = useState({
    //     username: "",
    //     email: "",
    //     gender: "",
    //     therapistID: "",
    //     oldPassword: "",
    //     newPassword: "",
    //     profilePic: ""
    // });
    
    const [username, setUsername] = useState("current_username"); // Default value
    const [email, setEmail] = useState("current_email@example.com"); // Placeholder
    const [therapistID, setTherapistID] = useState("THERA123"); // Default therapist ID
    const [gender, setGender] = useState("Male"); // Default gender
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [profilePic, setProfilePic] = useState("/default-avatar.png"); // Default profile picture

    // useEffect(() => {
    //     const fetchTherapist = async () => {
    //         try {
    //             const token = localStorage.getItem("token");
    //             const response = await axios.get("http://localhost:5000/api/therapist", {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             });
    //             setTherapist(response.data);
    //         } catch (error) {
    //             console.error("Error fetching therapist:", error);
    //         }
    //     };
    //     fetchTherapist();
    // }, []);

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
                Settings
            </Typography>

            <TextField
                fullWidth
                label="Username"
                margin="normal"
                value={username}
                onClick={() => setUsername("")}
                onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onClick={() => setEmail("")}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                fullWidth
                label="Therapist ID"
                margin="normal"
                value={therapistID}
                disabled // Therapist ID shouldn't be editable
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Current Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
                fullWidth
                label="New Password"
                type="password"
                margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <TextField
                fullWidth
                label="profile Picture"
                margin="normal"
                value={profilePic}
                onChange={(e) => setProfilePic(e.target.value)}
            />

            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => alert("Settings updated!")}
            >
                Save Changes
            </Button>
        </Box>
    );
}

export default SettingsPage;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import axios from "axios";

// function SettingsPage() {
//     const navigate = useNavigate(); // For redirection after saving
//     const [therapist, setTherapist] = useState({
//         username: "",
//         fullName: "",
//         therapistID: "",
//         gender: "",
//         profilePic: "",
//         email: "",
//         dateOfBirth: "",
//     });

//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchTherapist = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const response = await axios.get("http://localhost:5000/api/therapist", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });                            
//                 setTherapist(response.data);
//             } catch (error) {
//                 console.error("Error fetching user data", error);
//                 setError("Failed to load profile data.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTherapist();
//     }, []);

//     const handleChange = (e) => {
//         setTherapist({ ...therapist, [e.target.name]: e.target.value });
//     };

//     const handleSave = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             await axios.put("http://localhost:5000/api/therapist", therapist, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             alert("Profile updated successfully!");
//             navigate("/dashboard"); // Redirect to dashboard
//         } catch (error) {
//             console.error("Error updating profile", error);
//             alert("Failed to update profile.");
//         }
//     };

//     if (loading) return <Typography>Loading...</Typography>;
//     if (error) return <Typography>{error}</Typography>;

//     return (
//         <Container>
//             <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
//                 Therapist Settings
//             </Typography>

//             <TextField
//                 fullWidth
//                 label="Username"
//                 name="username"
//                 value={therapist.username}
//                 onChange={handleChange}
//                 sx={{ mb: 2 }}
//             />

//             <TextField
//                 fullWidth
//                 label="Full Name"
//                 name="fullName"
//                 value={therapist.fullName}
//                 onChange={handleChange}
//                 sx={{ mb: 2 }}
//             />
            
//             <TextField
//                 fullWidth
//                 label="ID Number"
//                 name="idNumber"
//                 value={therapist.idNumber}
//                 // onChange={handleChange}
//                 sx={{ mb: 2 }}
//             />
//             <TextField
//                 fullWidth
//                 label="Email"
//                 name="email"
//                 type="email"
//                 value={therapist.email}
//                 onChange={handleChange}
//                 sx={{ mb: 2 }}
//             />
//             {/* <TextField
//                 fullWidth
//                 label="Phone"
//                 name="phone"
//                 value={therapist.phone}
//                 onChange={handleChange}
//                 sx={{ mb: 2 }}
//             /> */}
//             <TextField
//                 fullWidth
//                 label="Date of Birth"
//                 name="dateOfBirth"
//                 type="date"
//                 value={therapist.dateOfBirth}
//                 onChange={handleChange}
//                 sx={{ mb: 2 }}
//                 InputLabelProps={{ shrink: true }}
//             />

//             <FormControl fullWidth margin="normal">
//                 <InputLabel>Gender</InputLabel>
//                 <Select
//                     value={therapist.gender || ""}
//                     onChange={(e) => setTherapist({ ...therapist, gender: e.target.value })}
//                     >
//                     <MenuItem value="Male">Male</MenuItem>
//                     <MenuItem value="Female">Female</MenuItem>
//                     <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//             </FormControl>

//             <TextField
//                 fullWidth
//                 label="Profile Picture URL"
//                 name="profilePic"
//                 value={therapist.profilePic}
//                 onChange={handleChange}
//                 sx={{ mb: 2 }}
//             />

//             <Button variant="contained" color="primary" onClick={handleSave}>
//                 Save Changes
//             </Button>
//             <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={() => navigate("/dashboard")}>
//                 Cancel
//             </Button>
//         </Container>
//     );
// }

// export default SettingsPage;




// import { useState } from "react";
// import { Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
// // import axios from "axios";

// function SettingsPage() {
//     // const [therapist, setTherapist] = useState({
//     //     username: "",
//     //     email: "",
//     //     gender: "",
//     //     therapistID: "",
//     //     oldPassword: "",
//     //     newPassword: "",
//     //     profilePic: ""
//     // });
    
//     const [username, setUsername] = useState("current_username"); // Default value
//     const [email, setEmail] = useState("current_email@example.com"); // Placeholder
//     const [therapistID, setTherapistID] = useState("THERA123"); // Default therapist ID
//     const [gender, setGender] = useState("Male"); // Default gender
//     const [password, setPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [profilePic, setProfilePic] = useState("/default-avatar.png"); // Default profile picture

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

//     return (
//         <Box>
//             <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>
//                 Settings
//             </Typography>

//             <TextField
//                 fullWidth
//                 label="Username"
//                 margin="normal"
//                 value={username}
//                 onClick={() => setUsername("")}
//                 onChange={(e) => setUsername(e.target.value)}
//             />

//             <TextField
//                 fullWidth
//                 label="Email"
//                 type="email"
//                 margin="normal"
//                 value={email}
//                 onClick={() => setEmail("")}
//                 onChange={(e) => setEmail(e.target.value)}
//             />

//             <TextField
//                 fullWidth
//                 label="Therapist ID"
//                 margin="normal"
//                 value={therapistID}
//                 disabled // Therapist ID shouldn't be editable
//             />

//             <FormControl fullWidth margin="normal">
//                 <InputLabel>Gender</InputLabel>
//                 <Select
//                     value={gender}
//                     onChange={(e) => setGender(e.target.value)}
//                 >
//                     <MenuItem value="Male">Male</MenuItem>
//                     <MenuItem value="Female">Female</MenuItem>
//                     <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//             </FormControl>

//             <TextField
//                 fullWidth
//                 label="Current Password"
//                 type="password"
//                 margin="normal"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />

//             <TextField
//                 fullWidth
//                 label="New Password"
//                 type="password"
//                 margin="normal"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//             />

//             <TextField
//                 fullWidth
//                 label="profile Picture"
//                 margin="normal"
//                 value={profilePic}
//                 onChange={(e) => setProfilePic(e.target.value)}
//             />

//             <Button
//                 variant="contained"
//                 color="primary"
//                 sx={{ mt: 2 }}
//                 onClick={() => alert("Settings updated!")}
//             >
//                 Save Changes
//             </Button>
//         </Box>
//     );
// }

// export default SettingsPage;
