import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    Typography,
    Snackbar,
    Alert,
} from "@mui/material";

interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    grade: string;
    teamLead: string;
    director: string;
    startDate: string;
    endDate: string | null;
}

const EmployeeList: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get<Employee[]>(
                "http://localhost:8080/api/Employees"
            );
            setEmployees(res.data);
        } catch (e) {
            setError("Kullanıcılar getirilirken hata oluştu.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8080/api/Employees/${id}`);
            setSuccessMsg("Kullanıcı başarıyla silindi.");
            // Silinen kullanıcıyı state'den çıkar
            setEmployees((prev) => prev.filter((emp) => emp.id !== id));
        } catch (e) {
            setError("Kullanıcı silinirken hata oluştu.");
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Çalışanlar Listesi
            </Typography>

            {loading && <CircularProgress />}
            {error && (
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}
            {successMsg && (
                <Snackbar
                    open={!!successMsg}
                    autoHideDuration={3000}
                    onClose={() => setSuccessMsg(null)}
                >
                    <Alert severity="success" onClose={() => setSuccessMsg(null)}>
                        {successMsg}
                    </Alert>
                </Snackbar>
            )}

            <List>
                {employees.map((emp) => (
                    <ListItem
                        key={emp.id}
                        secondaryAction={
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDelete(emp.id)}
                            >
                                Sil
                            </Button>
                        }
                    >
                        <ListItemText
                            primary={`${emp.firstName} ${emp.lastName}`}
                            secondary={`Görev: ${emp.grade}, Takım Lideri: ${emp.teamLead}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default EmployeeList;
