import { useState, useEffect } from "react";
import {
    Typography, TextField, Button, MenuItem, Select,
    FormControl, InputLabel, Box, Avatar
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function SettingsPage() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [therapistID, setTherapistID] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [profileFile, setProfileFile] = useState(null); // New state for file

    useEffect(() => {
        const fetchTherapist = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/therapist`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = response.data;

                setUsername(data.username);
                setFullName(data.fullName);
                setEmail(data.email);
                setDateOfBirth(data.dateOfBirth);
                setTherapistID(data.therapistID);
                setGender(data.gender);
                setProfilePic(data.profilePic);
            } catch (error) {
                console.error("Error fetching therapist:", error);
            }
        };
        fetchTherapist();
    }, []);

const handleSave = async () => {
    try {
        const token = localStorage.getItem("token");

        const payload = {
            username,
            fullName,
            email,
            gender,
            dateOfBirth,
            oldPassword: password,
            newPassword
        };

       await axios.put(`${process.env.REACT_APP_API_URL}/api/therapist`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        alert("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error.response?.data || error);
        alert("Failed to update profile.");
    }
};



    // const handleSave = async () => {
    //     try {
    //         const token = localStorage.getItem("token");

            

    //         const formData = new FormData();
    //         formData.append("username", username);
    //         formData.append("fullName", fullName);
    //         formData.append("email", email);
    //         formData.append("gender", gender);
    //         formData.append("dateOfBirth", formatDate(dateOfBirth));
    //         formData.append("oldPassword", password);
    //         formData.append("newPassword", newPassword);
    //         if (profileFile) {
    //             formData.append("profilePic", profileFile);
    //         } else {
    //             formData.append("profilePic", profilePic);
    //         }

    //         await axios.put("http://localhost:5000/api/therapist", formData, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //                 "Content-Type": "multipart/form-data"
    //             }
    //         });

    //         alert("Profile updated successfully!");
    //     } catch (error) {
    //         console.error("Error updating profile:", error);
    //         alert("Failed to update profile.");
    //     }
    // };

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>Settings</Typography>

            <Box sx={{ mb: 2 }}>
                <Avatar
                    src={profileFile ? URL.createObjectURL(profileFile) : profilePic || "/default-avatar.png"}
                    sx={{ width: 80, height: 80, mb: 1 }}
                />
                <Button variant="outlined" component="label">
                    Upload New Picture
                    <input hidden accept="image/*" type="file" onChange={(e) => setProfileFile(e.target.files[0])} />
                </Button>
            </Box>

            <TextField
                fullWidth
                label="Username"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <TextField 
                fullWidth 
                label="Date of Birth (dd/mm/yyyy)" 
                placeholder="dd/mm/yyyy"
                margin="normal" 
                value={dateOfBirth} 
                onChange={(e) => setDateOfBirth(e.target.value)} 
            />

            {/* <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                margin="normal"
                value={formatDate(dateOfBirth)}
                onChange={(e) => setDateOfBirth(e.target.value)}
                InputLabelProps={{ shrink: true }}
            /> */}
            <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                fullWidth
                label="Therapist ID"
                margin="normal"
                value={therapistID}
                disabled
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                    value={gender || ""}
                    onChange={(e) => setGender( e.target.value )}
                    >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>

            {/* <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl> */}

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

            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
                Save Changes
            </Button>
        </Box>
    );
}

export default SettingsPage;




// import { useState, useEffect } from "react";
// import { Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
// import axios from "axios";

// function SettingsPage() {
//     const [username, setUsername] = useState("");
//     const [fullName, setFullName] = useState("");
//     const [dateOfBirth, setDateOfBirth] = useState("");
//     const [email, setEmail] = useState("");
//     const [therapistID, setTherapistID] = useState("");
//     const [gender, setGender] = useState("");
//     const [password, setPassword] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [profilePic, setProfilePic] = useState("");

//     useEffect(() => {
//         const fetchTherapist = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 const response = await axios.get("http://localhost:5000/api/therapist", {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });

//                 const data = response.data;
//                 setUsername(data.username);
//                 setFullName(data.fullName);
//                 setEmail(data.email);
//                 setDateOfBirth(data.dateOfBirth);
//                 setTherapistID(data.therapistID);
//                 setGender(data.gender);
//                 setProfilePic(data.profilePic);
//             } catch (error) {
//                 console.error("Error fetching therapist:", error);
//             }
//         };
//         fetchTherapist();
//     }, []);

//     const handleSave = async () => {
//         try {
//             const token = localStorage.getItem("token");

//             const updateData = {
//                 username,
//                 fullName,
//                 email,
//                 gender,
//                 dateOfBirth,
//                 profilePic,
//                 oldPassword: password,
//                 newPassword
//             };

//             await axios.put("http://localhost:5000/api/therapist", updateData, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             alert("Profile updated successfully!");
//         } catch (error) {
//             console.error("Error updating profile:", error);
//             alert("Failed to update profile.");
//         }
//     };

//     return (
//         <Box>
//             <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold" }}>Settings</Typography>

//             <TextField fullWidth label="Username" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
//             <TextField fullWidth label="Full Name" margin="normal" value={fullName} onChange={(e) => setUsername(e.target.value)} />
//             <TextField fullWidth label="Date of Birth" type="date" margin="normal" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} InputLabelProps={{ shrink: true }} />
//             <TextField fullWidth label="Email" type="email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
//             <TextField fullWidth label="Therapist ID" margin="normal" value={therapistID} disabled />
            
//             <FormControl fullWidth margin="normal">
//                 <InputLabel>Gender</InputLabel>
//                 <Select value={gender} onChange={(e) => setGender(e.target.value)}>
//                     <MenuItem value="Male">Male</MenuItem>
//                     <MenuItem value="Female">Female</MenuItem>
//                     <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//             </FormControl>

//             <TextField fullWidth label="Current Password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <TextField fullWidth label="New Password" type="password" margin="normal" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
//             <TextField fullWidth label="Profile Picture" margin="normal" value={profilePic} onChange={(e) => setProfilePic(e.target.value)} />

//             <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
//                 Save Changes
//             </Button>
//         </Box>
//     );
// }

// export default SettingsPage;
