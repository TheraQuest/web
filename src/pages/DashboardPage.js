import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, List, ListItem, ListItemText, Card } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

function DashboardPage() {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [stats, setStats] = useState({ totalPatients: 0, totalSessions: 0, avgScores: [] });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatientsAndStats = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
                return;
            }

            try {
                const patientsRes = await axios.get("http://localhost:5000/api/patients", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatients(patientsRes.data);

                const statsRes = await axios.get("http://localhost:5000/api/patients/summary", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(statsRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        

        fetchPatientsAndStats();
    }, [navigate]);

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

            {/* Display Stats */}
            <Card style={{ padding: "20px", marginTop: "10px" }}>
                <Typography variant="h6">Total Patients: {stats.totalPatients}</Typography>
                <Typography variant="h6">Total Sessions: {stats.totalSessions}</Typography>
                <Typography variant="h6">Average Score per Patient:</Typography>
                <ul>
                    {stats.avgScores.map((entry) => (
                        <li key={entry._id}>Patient ID: {entry._id}, Avg Score: {entry.avgScore.toFixed(2)}</li>
                    ))}
                </ul>
            </Card>

            <Button variant="contained" color="primary" onClick={() => navigate("/add-patient")} style={{ marginTop: "10px" }}>
                Add New Patient
            </Button>

            <TextField
                fullWidth
                label="Search Patient"
                margin="normal"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <List>
                {patients
                    .filter((patient) => patient.fullName.toLowerCase().includes(search.toLowerCase()))
                    .map((patient) => (
                        <ListItem key={patient._id} button onClick={() => navigate(`/patient/${patient._id}`)}>
                            <ListItemText 
                                primary={`${patient.fullName}`}
                                secondary={`ID: ${patient.idNumber} | Age: ${calculateAge(patient.dateOfBirth)}`}
                            />
                        </ListItem>
                    ))}
            </List>
        </Container>
    );
}

export default DashboardPage;
