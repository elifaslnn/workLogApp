import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import axios from "axios";
import dayjs, { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

function Dashboard() {
    const [selectedWorklogType, setSelectedWorklogType] = React.useState('');
    const [selectedMonth, setSelectedMonth] = React.useState<Dayjs | null>(dayjs());
    const [effortData, setEffortData] = React.useState([]);
    const [totalEffort, setTotalEffort] = React.useState<number | null>(null);
    const [teamLeadEffortSummary, setTeamLeadEffortSummary] = React.useState<any>(null); // Team Lead özetleri için state
    const [directorEffortSummary, setDirectorEffortSummary] = React.useState<any>(null); // Director özetleri için state

    // Hem ay hem de iş tipi seçildiğinde efor verilerini ve toplam eforu çeken ana fonksiyon
    const fetchData = React.useCallback(async (month: Dayjs | null, worklogType: string) => {
        if (!month || !worklogType) {
            setEffortData([]);
            setTotalEffort(null);
            return;
        }

        const formattedMonth = month.format('YYYY-MM');

        // 1. Ay ve İş Tipine Göre Detaylı Efor Verilerini Çekme
        try {
            const response = await axios.get(`http://localhost:8080/api/worklogs/by-month-and-type`, {
                params: {
                    monthDate: formattedMonth,
                    worklogType: worklogType
                }
            });
            console.log("Gelen Efor Verileri (Detaylı):", response.data);
            setEffortData(response.data);
        } catch (error) {
            console.error("Efor verileri çekilirken hata oluştu:", error);
            setEffortData([]);
        }

        // 2. Ay ve İş Tipine Göre Toplam Eforu Çekme
        try {
            const totalEffortResponse = await axios.get(`http://localhost:8080/api/worklogs/total-effort`, {
                params: {
                    monthDate: formattedMonth,
                    worklogType: worklogType
                }
            });
            console.log("Gelen Toplam Efor:", totalEffortResponse.data);
            setTotalEffort(totalEffortResponse.data);
        } catch (error) {
            console.error("Toplam efor çekilirken hata oluştu:", error);
            setTotalEffort(null);
        }
    }, []);

    // Team Lead efor özetlerini çeken fonksiyon
    const fetchTeamLeadEffortSummary = React.useCallback(async (month: Dayjs | null) => {
        if (!month) {
            setTeamLeadEffortSummary(null);
            return;
        }
        const formattedMonth = month.format('YYYY-MM');
        try {
            const summaryResponse = await axios.get(`http://localhost:8080/api/worklogs/team-lead-effort-summary`, {
                params: {
                    monthDate: formattedMonth
                }
            });
            console.log("Team Lead Efor Özeti:", summaryResponse.data);
            setTeamLeadEffortSummary(summaryResponse.data);
        } catch (error) {
            console.error("Team Lead efor özeti çekilirken hata oluştu:", error);
            setTeamLeadEffortSummary(null);
        }
    }, []);

    // Director efor özetlerini çeken fonksiyon
    const fetchDirectorEffortSummary = React.useCallback(async (month: Dayjs | null) => {
        if (!month) {
            setDirectorEffortSummary(null);
            return;
        }
        const formattedMonth = month.format('YYYY-MM');
        try {
            const summaryResponse = await axios.get(`http://localhost:8080/api/worklogs/director-effort-summary`, {
                params: {
                    monthDate: formattedMonth
                }
            });
            console.log("Director Efor Özeti:", summaryResponse.data);
            setDirectorEffortSummary(summaryResponse.data);
        } catch (error) {
            console.error("Director efor özeti çekilirken hata oluştu:", error);
            setDirectorEffortSummary(null);
        }
    }, []);


    // İş tipi değiştiğinde çağrılan fonksiyon
    const handleWorklogTypeChange = (event: SelectChangeEvent) => {
        const worklogType = event.target.value as string;
        setSelectedWorklogType(worklogType);
        fetchData(selectedMonth, worklogType);
    };

    // Ay değiştiğinde çağrılan fonksiyon
    const handleMonthChange = (newMonth: Dayjs | null) => {
        setSelectedMonth(newMonth);
        fetchData(newMonth, selectedWorklogType);
        fetchTeamLeadEffortSummary(newMonth); // Ay değiştiğinde Team Lead özetlerini çek
        fetchDirectorEffortSummary(newMonth); // Ay değiştiğinde Director özetlerini çek
    };

    // Komponent yüklendiğinde ve `selectedMonth` güncellendiğinde yönetici özetlerini ve genel verileri çek
    React.useEffect(() => {
        if (selectedMonth) {
            fetchTeamLeadEffortSummary(selectedMonth);
            fetchDirectorEffortSummary(selectedMonth);
        }
    }, [selectedMonth, fetchTeamLeadEffortSummary, fetchDirectorEffortSummary]);

    const navigate = useNavigate();
    const handleRouterWorklogsList=()=>{
        navigate("/showWorkLogList");
    }
    return (
        <>
            <Typography variant="h2">DASHBOARD</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                    <DatePicker
                        label="Ay Seçiniz"
                        views={['year', 'month']}
                        value={selectedMonth}
                        onChange={handleMonthChange}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <Box sx={{ minWidth: 120, mt: 2 }}>
                <FormControl fullWidth>
                    <InputLabel id="worklog-type-select-label">İş Tipi</InputLabel>
                    <Select
                        labelId="worklog-type-select-label"
                        id="worklog-type-select"
                        value={selectedWorklogType}
                        label="İş Tipi"
                        onChange={handleWorklogTypeChange}
                    >
                        <MenuItem value={"Development"}>Development</MenuItem>
                        <MenuItem value={"Analysis"}>Analysis</MenuItem>
                        <MenuItem value={"test"}>Test</MenuItem>
                        <MenuItem value={"Team Lead"}>Team Lead</MenuItem>
                        <MenuItem value={"Director"}>Director</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* Seçilen Ay ve İş Tipine Göre Toplam Efor */}
            {selectedWorklogType && selectedMonth && totalEffort !== null && (
                <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                    <h3>Seçilen Ay ({selectedMonth.format('MM/YYYY')}) ve İş Tipi ({selectedWorklogType}) için Toplam Efor:</h3>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{totalEffort.toFixed(2)} saat</p>
                </Box>
            )}

            {/* Detaylı Efor Listesi */}
            {effortData.length > 0 && (
                <Box sx={{ mt: 3 }}>
                    <h3>Seçilen Ay ve İş Tipindeki Çalışan Eforları:</h3>
                    <ul>
                        {effortData.map((log: any) => (
                            <li key={log.id}>
                                Çalışan:{log.engineer} - Efor: {log.effort} saat - İş Tipi: {log.worklogType.name}
                            </li>
                        ))}
                    </ul>
                </Box>
            )}
            {effortData.length === 0 && selectedMonth && selectedWorklogType && (
                <Box sx={{ mt: 3 }}>
                    <p>Seçilen ay ve iş tipine ait veri bulunamadı.</p>
                </Box>
            )}



            {/* Team Lead Efor Özeti */}
            {selectedMonth && teamLeadEffortSummary && Object.keys(teamLeadEffortSummary).length > 0 && (
                <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#e8f5e9' }}>
                    <h3>Ay Bazında Team Lead Efor Özeti ({selectedMonth.format('MM/YYYY')}):</h3>
                    {Object.entries(teamLeadEffortSummary).map(([key, value]) => (
                        <p key={key}>{key}:  {Number(value).toFixed(2)} saat </p>
                    ))}
                </Box>
            )}
            {selectedMonth && teamLeadEffortSummary && Object.keys(teamLeadEffortSummary).length === 0 && (
                <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#e8f5e9' }}>
                    <p>Seçilen ay için Team Lead efor özeti bulunamadı.</p>
                </Box>
            )}



            {/* Director Efor Özeti */}
            {selectedMonth && directorEffortSummary && Object.keys(directorEffortSummary).length > 0 && (
                <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#e3f2fd' }}>
                    <h3>Ay Bazında Director Efor Özeti ({selectedMonth.format('MM/YYYY')}):</h3>
                    {Object.entries(directorEffortSummary).map(([key, value]) => (
                        <p key={key}>{key}:  {Number(value).toFixed(2)} saat </p>
                    ))}
                </Box>
            )}
            {selectedMonth && directorEffortSummary && Object.keys(directorEffortSummary).length === 0 && (
                <Box sx={{ mt: 4, p: 2, border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#e3f2fd' }}>
                    <p>Seçilen ay için Director efor özeti bulunamadı.</p>
                </Box>
            )}
            <Button variant="contained" sx={{margin:"20px"}} onClick={handleRouterWorklogsList}>Show all worklogs</Button>
        </>
    );
}

export default Dashboard;