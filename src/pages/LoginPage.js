import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Container,
    Typography,
    InputAdornment,
    IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
                username,
                password,
            });

            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: "100px", textAlign: "center" }}>
            <Typography variant="h5">TheraQuest Login</Typography>
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
                type={showPassword ? "text" : "password"}
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />

            <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
            <Button fullWidth style={{ marginTop: "10px" }} onClick={() => navigate("/register")}>
                Sign Up
            </Button>
        </Container>
    );
}

export default LoginPage;
