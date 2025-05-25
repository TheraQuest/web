import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField, Button, Container, Typography, MenuItem, Select,
    FormControl, InputLabel, InputAdornment, IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [therapistID, setTherapistID] = useState("");
    const [gender, setGender] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async () => {
        const parsedDate = dayjs(dateOfBirth, "DD/MM/YYYY", true);

        if (!parsedDate.isValid()) {
            setError("Invalid Date. Please enter in dd/mm/yyyy format.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!therapistID || !gender) {
            setError("Therapist ID and Gender are required");
            return;
        }

        const formattedDate = parsedDate.format("YYYY-MM-DD");

        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("therapistID", therapistID);
            formData.append("gender", gender);
            formData.append("fullName", fullName);
            formData.append("email", email);
            formData.append("dateOfBirth", formattedDate);
            if (profilePic) {
                formData.append("profilePic", profilePic);
            }

            await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            navigate("/"); // Redirect to login after successful registration
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: "100px", textAlign: "center" }}>
            <Typography variant="h5">TheraQuest Therapist Registration</Typography>
            {error && <Typography color="error">{error}</Typography>}

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
                label="Therapist ID"
                margin="normal"
                value={therapistID}
                onChange={(e) => setTherapistID(e.target.value)}
            />

            <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                fullWidth
                label="Date of Birth (dd/mm/yyyy)"
                margin="normal"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
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

           <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ mt: 2, mb: 1 }}
            >
                Upload Profile Picture
                <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => setProfilePic(e.target.files[0])}
                />
            </Button>



            <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

            <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

            <Button fullWidth variant="contained" color="primary" onClick={handleRegister}>
                Register
            </Button>

            <Button fullWidth style={{ marginTop: "10px" }} onClick={() => navigate("/")}>Back to Login</Button>
        </Container>
    );
}

export default RegisterPage;
