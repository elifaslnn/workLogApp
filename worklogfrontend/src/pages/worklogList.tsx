import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Typography,
    CircularProgress,
    Alert,
} from "@mui/material";

// Worklog tipi
interface Worklog {
    id: number;
    engineer: string;
    monthDate: string; // "YYYY-MM"
    worklogType: {
        id: number;
        name: string;
    };
    effort: number;
}

const WorkLogList: React.FC = () => {
    const [worklogs, setWorklogs] = useState<Worklog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWorklogs = async () => {
            try {
                const response = await axios.get<Worklog[]>("http://localhost:8080/api/worklogs");
                setWorklogs(response.data);
            } catch (err) {
                setError("Worklog verileri getirilirken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };

        fetchWorklogs();
    }, []);

    return (
        <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Worklog Listesi
            </Typography>

            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}

            <List>
                {worklogs.map((log) => (
                    <ListItem key={log.id} divider>
                        <ListItemText
                            primary={`Mühendis: ${log.engineer} | Ay: ${log.monthDate}`}
                            secondary={`Tip: ${log.worklogType.name} | Efor: ${log.effort} saat`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default WorkLogList;
