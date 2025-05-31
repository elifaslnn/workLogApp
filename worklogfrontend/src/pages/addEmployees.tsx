import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import {useNavigate} from "react-router-dom";

interface EmployeeData {
    firstName: string;
    lastName: string;
    grade: string;
    teamLead: string;
    director: string;
    startDate: string; // ISO format (yyyy-mm-dd)
    endDate: string;
}

const AddEmployees: React.FC = () => {
    const [formData, setFormData] = useState<EmployeeData>({
        firstName: "",
        lastName: "",
        grade: "",
        teamLead: "",
        director: "",
        startDate: "",
        endDate: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const navigate = useNavigate();
    const handleRouterShowEmployees=()=>{
        navigate("/showEmployees");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Backend'e gönderilecek obje (id backend tarafından atanıyorsa gönderme)
            const payload = {
                ...formData,
                startDate: formData.startDate || null,
                endDate: formData.endDate || null,
            };

            await axios.post("http://localhost:8080/api/Employees", payload);

            setSuccess(true);
            setFormData({
                firstName: "",
                lastName: "",
                grade: "",
                teamLead: "",
                director: "",
                startDate: "",
                endDate: "",
            });
        } catch (err: any) {
            setError(err.message || "Bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h5" mb={3}>
                Yeni Kullanıcı Ekle
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    label="Ad"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Soyad"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Seviye / Grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Takım Lideri"
                    name="teamLead"
                    value={formData.teamLead}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Direktör"
                    name="director"
                    value={formData.director}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Başlangıç Tarihi"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Bitiş Tarihi"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{ shrink: true }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    sx={{ mt: 3 }}
                >
                    {loading ? "Gönderiliyor..." : "Kaydet"}
                </Button>

                {error && (
                    <Typography color="error" mt={2}>
                        {error}
                    </Typography>
                )}
                {success && (
                    <Typography color="success.main" mt={2}>
                        Kullanıcı başarıyla eklendi!
                    </Typography>
                )}
            </Box>
            <Button variant="contained" sx={{margin:"20px"}} onClick={handleRouterShowEmployees}>Add new Employee</Button>
        </Container>

    );
};

export default AddEmployees;
