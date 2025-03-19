import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, List, ListItem, ListItemText, TextField, Button } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";


function PatientDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [therapistNotes, setTherapistNotes] = useState({}); // Store notes per session

    useEffect(() => {
        const fetchPatientDetails = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
                return;
            }

            try {
                const patientRes = await axios.get(`http://localhost:5000/api/patients/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatient(patientRes.data);

                const sessionsRes = await axios.get(`http://localhost:5000/api/sessions/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSessions(sessionsRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchPatientDetails();
    }, [id, navigate]);

    // Handle note saving for a session
    const handleSaveNote = async (sessionId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `http://localhost:5000/api/sessions/${sessionId}/note`,
                { therapistNote: therapistNotes[sessionId] || "" }, // Send the specific note for this session
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Note saved!");
        } catch (error) {
            console.error("Error saving note", error);
        }
    };

     // Convert stored date format (YYYY-MM-DD) to dd/mm/yyyy for display
     const formatDate = (date) => {
        return dayjs(date).format("DD/MM/YYYY");
    };

    return (
        <Container>
            <Typography variant="h3" style={{ marginTop: "20px" }}>
                Patient Details
            </Typography>

            {patient && (
                <>
                    <Typography variant="h6" style={{ marginTop: "20px" }}><b>Name: </b>{patient.fullName}</Typography>
                    <Typography variant="h6"><b>ID: </b>{patient.idNumber}</Typography>
                    <Typography variant="h6"><b>Date of birth: </b>{formatDate(patient.dateOfBirth)}</Typography>
                    <Typography variant="h6" style={{ marginTop: "20px" }}><b>Medical Note: </b>{patient.medicalNote || "None"}</Typography>
                </>
            )}

            <Typography variant="h5" style={{ marginTop: "20px" }}><b>Session History:</b></Typography>
            <List>
                {sessions.map((session) => (
                    <ListItem key={session._id}>
                        <ListItemText
                            primary={`Score: ${session.gameScore}, Help Level: ${session.helpLevelUsed}`}
                            secondary={`Date: ${new Date(session.sessionDate).toLocaleDateString()}`}
                        />
                        <TextField
                            fullWidth
                            label="Therapist Note"
                            margin="normal"
                            value={therapistNotes[session._id] || ""}
                            onChange={(e) => setTherapistNotes({ ...therapistNotes, [session._id]: e.target.value })}
                        />
                        <Button variant="contained" color="primary" onClick={() => handleSaveNote(session._id)}>
                            Save Note
                        </Button>
                    </ListItem>
                ))}
            </List>

            <Button fullWidth style={{ marginTop: "10px" }} onClick={() => navigate("/dashboard")}>
                Back to Dashboard
            </Button>
        </Container>
    );
}

export default PatientDetailsPage;
