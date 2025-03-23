import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, Grid } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

function DashboardPage() {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [showAllPatients, setShowAllPatients] = useState(true); // Default: Show all patients
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
        <Container>
            <Typography variant="h4" style={{ marginTop: "20px" }}>
                Therapist Dashboard
            </Typography>

            {/* Buttons for "All Patients" & "My Patients" */}
            <Grid container spacing={2} style={{ marginTop: "10px", marginBottom: "10px" }}>
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

            <Button variant="contained" color="primary" onClick={() => navigate("/add-patient")} style={{ marginTop: "10px" }}>
                Add New Patient
            </Button>

            <TextField
                fullWidth
                label="Search Patient (Name or ID)"
                margin="normal"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <List>
                {patients
                    .filter((patient) => {
                        const searchText = search.toLowerCase();
                        return (
                            patient.fullName.toLowerCase().includes(searchText) ||
                            patient.idNumber.includes(searchText)
                        );
                    })
                    .map((patient) => (
                        <ListItem 
                            key={patient._id} 
                            button 
                            onClick={() => navigate(`/patient/${patient._id}`)}
                        >
                            <ListItemText 
                                primary={`${patient.fullName} (${patient.gender})`} 
                                secondary={`ID: ${patient.idNumber} | Age: ${calculateAge(patient.dateOfBirth)}`}
                            />
                        </ListItem>
                    ))}
            </List>
        </Container>
    );
}

export default DashboardPage;
