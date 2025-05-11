import { useEffect, useState } from "react";
import { useParams, useNavigate, data } from "react-router-dom";
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

function EditPatientPage() {
    const { id } = useParams(); // Get patient ID from URL
    const navigate = useNavigate(); // To redirect back after saving
    const [patient, setPatient] = useState({
        fullName: "",
        idNumber: "",
        gender: "",
        dateOfBirth: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPatient = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/patients/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatient(response.data);
                console.log("Patient response:", response.data); 

            } catch (error) {
                console.error("Error fetching patient", error);
                setError("Failed to load patient data.");
            } finally {
                setLoading(false);
            }
        };

        fetchPatient();
    }, [id]);

    const handleChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    // const handleSave = async () => {

    //         // const parsedDate = dayjs(dateOfBirth, "DD/MM/YYYY", true);
    //         // if (!parsedDate.isValid()) {
    //         //     alert("Invalid Date. Please enter in dd/mm/yyyy format.");
    //         //     return;
    //         // }

    //         const formData = new FormData();
    //         formData.append("fullName", patient.fullName);
    //         formData.append("gender", patient.gender);
    //         formData.append("dateOfBirth", patient.birthday /*, parsedDate.toISOString()*/);
    //         formData.append("ID number", patient.idNumber);
    //         formData.append("madical note", patient.madicalNote);
    //         formData.append("status", patient.status);
            
    //         try {
    //             const token = localStorage.getItem("token");
    //             await axios.put(`http://localhost:5000/api/patients/${id}`, formData, {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             });

    //             alert("Patient updated successfully!");
    //             navigate("/dashboard"); 
    //         } catch (error) {
    //             console.error("Error updating patient", error);
    //             alert("Failed to update patient.");
    //         }
    //     };
    

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
           await axios.put(`${process.env.REACT_APP_API_URL}/api/patients/${id}`, patient, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("Patient updated successfully!");
            navigate("/dashboard"); 
        } catch (error) {
            console.error("Error updating patient", error);
            alert("Failed to update patient.");
        }
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 3, mb: 2 }}>
                {patient.fullName}
            </Typography>

            <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={patient.fullName}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="ID Number"
                name="idNumber"
                value={patient.idNumber}
                // onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select
                    value={patient.gender || ""}
                    onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
                    >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                value={patient.dateOfBirth}
                onChange={handleChange}
                sx={{ mb: 2 }}
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                fullWidth
                label="Medical Note"
                name="maedicalNote"
                value={patient.madicalNote}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />

            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={patient.status}
                    onChange={(e) => setPatient({ ...patient, status: e.target.value })}
                    >
                    <MenuItem value="Current">Current Patient</MenuItem>
                    <MenuItem value="Past">Past Patient</MenuItem>
                </Select>
            </FormControl>

            <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
            </Button>
            <Button variant="outlined" color="secondary" sx={{ ml: 2 }} onClick={() => navigate("/dashboard")}>
                Cancel
            </Button>
        </Container>
    );
}

export default EditPatientPage;
