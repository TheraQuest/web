import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; 

dayjs.extend(customParseFormat); // Enable custom date parsing

function AddPatientPage() {
    const [fullName, setFullName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [medicalNote, setMedicalNote] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleAddPatient = async () => {
        // Validate Date Format (dd/mm/yyyy)
        const parsedDate = dayjs(dateOfBirth, "DD/MM/YYYY", true); // Strict parsing

        if (!parsedDate.isValid()) {
            setError("Invalid Date. Please enter in dd/mm/yyyy format.");
            return;
        }

        // Convert to ISO format for MongoDB
        const formattedDate = parsedDate.format("YYYY-MM-DD");

        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/patients", {
                fullName,
                idNumber,
                dateOfBirth: formattedDate, // Send ISO format
                medicalNote
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Error adding patient");
        }
    };

    return (
        <Container maxWidth="xs" style={{ marginTop: "50px", textAlign: "center" }}>
            <Typography variant="h5">Add New Patient</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField fullWidth label="Full Name" margin="normal" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <TextField fullWidth label="ID Number" margin="normal" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
            <TextField fullWidth label="Date of Birth (dd/mm/yyyy)" margin="normal" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
            <TextField fullWidth label="Medical Note (Optional)" margin="normal" value={medicalNote} onChange={(e) => setMedicalNote(e.target.value)} />
            <Button fullWidth variant="contained" color="primary" onClick={handleAddPatient}>Add Patient</Button>
            <Button fullWidth style={{ marginTop: "10px" }} onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </Container>
    );
}

export default AddPatientPage;
