import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Layout from "./components/Layout"; // Import Layout
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AddPatientPage from "./pages/AddPatientPage";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import { useEffect } from "react";
import axios from "axios";
import SettingsPage from "./pages/SettingsPage";
import EditPatientPage from "./pages/EditPatientPage";


// Automatically log out if the token expires
axios.interceptors.response.use(
    response => response, // Pass successful responses
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token"); // Remove expired token
            window.location.href = "/"; // Redirect to login
        }
        return Promise.reject(error);
    }
);

function PrivateRoute({ element }) {
    const token = localStorage.getItem("token");
    return token ? element : <Navigate to="/" />;
}

function App() {
    useEffect(() => {
        // Check if the token is expired
        const checkTokenExpiration = () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const { exp } = JSON.parse(atob(token.split(".")[1])); // Decode token payload
                const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

                if (exp < currentTime) {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }
            } catch (error) {
                console.error("Error checking token expiration:", error);
            }
        };

        checkTokenExpiration();
        const interval = setInterval(checkTokenExpiration, 60 * 1000); // Check every minute

        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
                        path="/dashboard"
                        element={
                            <Layout>
                                <DashboardPage />
                            </Layout>
                        }
                    />
                    <Route 
                        path="/patient/edit/:id" 
                        element={
                            <Layout>
                                <EditPatientPage />
                            </Layout>
                        } 
                    /> 

                    <Route
                        path="/add-patient"
                        element={
                            <Layout>
                                <AddPatientPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/patient/:id"
                        element={
                            <Layout>
                                <PatientDetailsPage />
                            </Layout>
                        }
                    />
                    <Route
                        path="/therapist"
                        element={
                            <Layout>
                                <SettingsPage />
                            </Layout>
                        }
                        />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
