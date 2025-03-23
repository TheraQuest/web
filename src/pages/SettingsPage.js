import { useState } from "react";
import { Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";

function SettingsPage() {
    const [username, setUsername] = useState("current_username"); // Default value
    const [email, setEmail] = useState("current_email@example.com"); // Placeholder
    const [therapistID, setTherapistID] = useState("THERA123"); // Default therapist ID
    const [gender, setGender] = useState("Male"); // Default gender
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

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
