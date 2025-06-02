import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Button, TextField, Modal, Box, Grid, Card, CardContent } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function PatientDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentSessionId, setCurrentSessionId] = useState(null);
    const [currentNote, setCurrentNote] = useState("");

    useEffect(() => {
        const fetchPatientDetails = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/");
                return;
            }

            try {
                const patientRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/patients/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatient(patientRes.data);

                const sessionsRes = await axios.get(`${process.env.REACT_APP_API_URL}/api/sessions/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setSessions(sessionsRes.data);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchPatientDetails();
    }, [id, navigate]);

    const handleSaveNote = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(`${process.env.REACT_APP_API_URL}/api/sessions/${currentSessionId}/note`, 
                { therapistNote: currentNote }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Note saved!");
            const updatedSessions = sessions.map(session =>
                session._id === currentSessionId ? { ...session, therapistNote: currentNote } : session
            );
            setSessions(updatedSessions);
            setModalOpen(false);
        } catch (error) {
            console.error("Error saving note", error);
        }
    };

    const formatDate = (date) => {
        const parsed = dayjs(date);
        return parsed.isValid() ? parsed.format("DD/MM/YYYY HH:mm") : "No date available";
    };

    const formatDateOnly = (date) => {
        const parsed = dayjs(date);
        return parsed.isValid() ? parsed.format("DD/MM/YYYY") : "No date available";
    };

    const handleStartSession = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/sessions`, 
                { patientId: id }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("New session started successfully!");
            setSessions([...sessions, res.data.session]);
        } catch (error) {
            console.error("Error starting session", error);
        }
    };

    const openNoteModal = (sessionId, note) => {
        setCurrentSessionId(sessionId);
        setCurrentNote(note || "");
        setModalOpen(true);
    };

    const handleAddItem = async (itemName) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/send-command`, {
                action: "add_item",
                item: itemName
            });
            alert(`✅ Sent '${itemName}' to game`);
        } catch (err) {
            console.error("❌ Failed to send item", err);
            alert("Failed to send item to game");
        }
    };

    return (
        <Container>
            {patient && (
                <>
                    <Typography variant="h3" style={{ marginTop: "20px" }}><b>{patient.fullName}</b></Typography>
                    <Typography variant="h6" style={{ marginTop: "20px" }}><b>ID: </b>{patient.idNumber}</Typography>

                    <Typography variant="h6"><b>Date of birth: </b>{dayjs(patient.dateOfBirth).format("DD/MM/YYYY")}</Typography>
                    <Typography variant="h6" style={{ marginTop: "20px" }}><b>Medical Note: </b>{patient.medicalNote || "None"}</Typography>
                </>
            )}

            <Button variant="contained" color="primary" style={{ marginTop: "20px", marginBottom: "20px" }} onClick={handleStartSession}>
                Start New Session
            </Button>

            <Typography variant="h5" style={{ marginTop: "20px", marginBottom: "10px" }}><b>Session History:</b></Typography>

            <Grid container spacing={2}>
                {sessions.map((session) => (
                    <Grid item xs={12} sm={6} md={4} key={session._id}>
                        <Card sx={{ backgroundColor: "#ffffff", borderLeft: "5px solid #1f6446", p: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{`Score: ${session.gameScore}, Help Level: ${session.helpLevelUsed}`}</Typography>
                                <Typography variant="body1"><b>Date:</b> {formatDate(session.sessionDate)}</Typography>
                                <Typography variant="body1"><b>Note:</b> {session.therapistNote || "No notes added"}</Typography>

                                <Button 
                                    variant="outlined" 
                                    color="primary" 
                                    onClick={() => openNoteModal(session._id, session.therapistNote)}
                                    style={{ marginTop: "10px" }}
                                >
                                    {session.therapistNote ? "Edit Note" : "Add Note"}
                                </Button>

                                <Button 
                                    variant="outlined" 
                                    color="secondary" 
                                    onClick={() => handleAddItem("watermelon 1")}
                                    style={{ marginTop: "10px", marginLeft: "10px" }}
                                >
                                    ADD FRUIT
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Box sx={style}>
                    <Typography variant="h6">{currentNote ? "Edit Note" : "Add Note"}</Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={currentNote}
                        onChange={(e) => setCurrentNote(e.target.value)}
                        label="Therapist Note"
                        variant="outlined"
                        style={{ marginTop: "20px" }}
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSaveNote}
                        style={{ marginTop: "20px" }}
                    >
                        Save Note
                    </Button>
                </Box>
            </Modal>

            <Button fullWidth style={{ marginTop: "10px" }} onClick={() => navigate("/dashboard")}>
                Back to Dashboard
            </Button>
        </Container>
    );
}

export default PatientDetailsPage;