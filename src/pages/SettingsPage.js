import { useState, useEffect } from "react";
import {
    Typography, TextField, Button, MenuItem, Select,
    FormControl, InputLabel, Box, Avatar, IconButton, InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

function PasswordField({ label, value, onChange }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <TextField
            fullWidth
            type={showPassword ? "text" : "password"}
            label={label}
            value={value}
            onChange={onChange}
            margin="normal"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
}

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
    const [profileFile, setProfileFile] = useState(null);

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

    useEffect(() => {
        fetchTherapist();
    }, []);

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();

            formData.append("username", username);
            formData.append("fullName", fullName);
            formData.append("email", email);
            formData.append("gender", gender);
            formData.append("dateOfBirth", dateOfBirth);
            formData.append("oldPassword", password);
            formData.append("newPassword", newPassword);
            if (profileFile) {
                formData.append("profilePic", profileFile);
            }

            await axios.put(`${process.env.REACT_APP_API_URL}/api/therapist`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            await fetchTherapist();
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

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

            <TextField fullWidth label="Username" margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField fullWidth label="Full Name" margin="normal" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <TextField fullWidth label="Date of Birth (dd/mm/yyyy)" margin="normal" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            <TextField fullWidth label="Email" type="email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth label="Therapist ID" margin="normal" value={therapistID} disabled />

            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select value={gender || ""} onChange={(e) => setGender(e.target.value)}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>

            <PasswordField label="Current Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <PasswordField label="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />

            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSave}>
                Save Changes
            </Button>
        </Box>
    );
}

export default SettingsPage;
