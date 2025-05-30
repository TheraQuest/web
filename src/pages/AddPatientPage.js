import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat); // Enable strict date parsing

function AddPatientPage() {
    const [fullName, setFullName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [gender, setGender] = useState("");
    const [medicalNote, setMedicalNote] = useState("");
    const [status, setStatus] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleAddPatient = async () => {
        // Validate date format (dd/mm/yyyy)
        const parsedDate = dayjs(dateOfBirth, "DD/MM/YYYY", true);

        if (!parsedDate.isValid()) {
            setError("Invalid Date. Please enter in dd/mm/yyyy format.");
            return;
        }

        if (!gender) {
            setError("Please select a gender.");
            return;
        }

        // Convert to ISO format (YYYY-MM-DD) for MongoDB
        const formattedDate = parsedDate.format("YYYY-MM-DD");

        try {
            const token = localStorage.getItem("token");
            await axios.post(`${process.env.REACT_APP_API_URL}/api/patients`, {
                fullName,
                idNumber,
                dateOfBirth: formattedDate,
                gender,
                medicalNote, 
                status
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
            
            <TextField 
                fullWidth 
                label="Full Name" 
                margin="normal" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
            />
            
            <TextField 
                fullWidth 
                label="ID Number" 
                margin="normal" 
                value={idNumber} 
                onChange={(e) => setIdNumber(e.target.value)} 
            />
{/* 
            <TextField
                fullWidth
                label="Date of Birth"
                // name="dateOfBirth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)} 
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
            /> */}
            
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

            <TextField 
                fullWidth 
                label="Medical Note (Optional)" 
                margin="normal" 
                value={medicalNote} 
                onChange={(e) => setMedicalNote(e.target.value)} 
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <MenuItem value="Current">Current Patient</MenuItem>
                    <MenuItem value="Past">Past Patient</MenuItem>
                </Select>
            </FormControl>

            <Button fullWidth variant="contained" color="primary" onClick={handleAddPatient}>
                Add Patient
            </Button>

            <Button fullWidth style={{ marginTop: "10px" }} onClick={() => navigate("/dashboard")}>
                Back to Dashboard
            </Button>
        </Container>
    );
}

export default AddPatientPage;
