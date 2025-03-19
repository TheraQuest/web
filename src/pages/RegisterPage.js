import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/auth/register", {
                username,
                password,
            });
            navigate("/"); // Redirect to login after successful registration
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: "100px", textAlign: "center" }}>
            <Typography variant="h5">TheraQuest Registration</Typography>
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
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                margin="normal"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button fullWidth variant="contained" color="primary" onClick={handleRegister}>
                Register
            </Button>
            <Button fullWidth style={{ marginTop: "10px" }} onClick={() => navigate("/")}>
                Back to Login
            </Button>
        </Container>
    );
}

export default RegisterPage;
