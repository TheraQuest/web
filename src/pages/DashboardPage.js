import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button, TextField, Grid, Card, CardContent } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import PersonIcon from "@mui/icons-material/Person";
import Navbar from "../components/Navbar"; 
import Sidebar from "../components/Sidebar";
// import { getTherapistIdFromToken } from "../utils/auth";



function DashboardPage() {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [showAllPatients, setShowAllPatients] = useState(true);
    const navigate = useNavigate();

    const fetchPatients = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/patients?myPatients=${!showAllPatients}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPatients(response.data);
        } catch (error) {
            console.error("Error fetching patients", error);
        }
    }, [navigate, showAllPatients]);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    const calculateAge = (dateOfBirth) => {
        const dob = dayjs(dateOfBirth);
        const now = dayjs();
        const years = now.diff(dob, "year");
        const months = now.diff(dob.add(years, "year"), "month");
        return `${years} years, ${months} months`;
    };
    

    return (
        <>
        <Navbar />
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Container sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            <Typography variant="h4" style={{marginTop: "-20px", marginBottom: "30px"}} sx={{ mt: 3, mb: 2, fontWeight: "bold", textAlign: "center" }}>
                    Therapist Dashboard
                </Typography>

                {/* Buttons for filtering patients */}
                <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
                    <Grid item>
                        <Button 
                            variant={showAllPatients ? "contained" : "outlined"} 
                            color="primary" 
                            onClick={() => setShowAllPatients(true)}
                        >
                            All Patients
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button 
                            variant={!showAllPatients ? "contained" : "outlined"} 
                            color="secondary" 
                            onClick={() => setShowAllPatients(false)}
                        >
                            My Patients
                        </Button>
                    </Grid>
                </Grid>

                <TextField
                    fullWidth
                    label="Search Patient (Name or ID)"
                    margin="normal"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Grid container spacing={2}>
                    {patients
                        .filter((patient) => {
                            const searchText = search.toLowerCase();
                            return (
                                patient.fullName.toLowerCase().includes(searchText) ||
                                patient.idNumber.includes(searchText)
                            );
                        })
                        .map((patient) => (
                            <Grid item xs={12} md={6} lg={4} key={patient._id}>
                                <Card 
                                    sx={{ 
                                        backgroundColor: patient.isMyPatient ? "#e3f2fd" : "white", 
                                        borderLeft: "5px solid #1f6446",
                                        p: 2,
                                        cursor: "pointer"
                                    }}
                                    onClick={() => navigate(`/patient/${patient._id}`)}
                                >
                                    <CardContent>
                                        <PersonIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                            {patient.fullName} ({patient.gender})
                                        </Typography>
                                        <Typography variant="body2">ID: {patient.idNumber}</Typography>
                                        <Typography variant="body2">Age: {calculateAge(patient.dateOfBirth)}</Typography>
                                        {/* <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            style={{ marginTop: "10px" }}
                                            onClick={() => navigate(`/patient/EditPatient/${patient._id}`)}>
                                            Edit Patient
                                        </Button> */}
                                        <Button 
                                            variant="outlined" 
                                            color="primary" 
                                            style={{ marginTop: "10px" }}
                                            onClick={(event) => {
                                                event.stopPropagation(); // Prevents card click from triggering
                                                navigate(`/patient/edit/${patient._id}`);
                                            }}
                                        >
                                            Edit Patient's Details
                                        </Button>


                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                </Grid>
            </Container>
        </Box>
        </>
    );
}

export default DashboardPage;
