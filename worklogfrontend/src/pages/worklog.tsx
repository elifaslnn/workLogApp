import {CssBaseline, Typography} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {type SelectChangeEvent} from '@mui/material/Select';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const yesterday = dayjs().subtract(1, 'day');

function Worklog(){
    const [name, setName] = React.useState('');
    const [worklogType, setworklogType] =useState<string>("");
    const [employees,setEmployees]=useState([]);
    const [date, setDate] = useState<string>("");

    const [effort,setEffort]=useState<number | ''>('');
    const [worklogTypeId,setWorklogTypeId]=useState<number | null>(null);


    const navigate = useNavigate();

    const handleChangeAge = (event: SelectChangeEvent) => {
        setName(event.target.value as string);
    };

    const handleChangeWorklogtype = (e: SelectChangeEvent) => {
        setworklogType(e.target.value); // Or set another state for description
        if(e.target.value=="Development"){
            setWorklogTypeId(1);
        }else if(e.target.value=="Analysis"){
            setWorklogTypeId(2);
        }else if(e.target.value=="Test"){
            setWorklogTypeId(3);
        }
    };

    useEffect(()=>{
        const getEmployees=async()=>{
            try {
                const response = await axios.get("http://localhost:8080/api/Employees");
                setEmployees(response.data);
                return response.data;
            } catch (e) {
                console.log(e)
            }
        }
        getEmployees()

    },[])
    console.log(employees);


    const postBody={
        engineer:name,
        monthDate:date,
        worklogType:{
            id:worklogTypeId
        },
        effort:effort
    }
    const createWorklog=async ()=>{
         try{
            axios.post("http://localhost:8080/api/worklogs",postBody)
                 .then(response=>{
                     console.log(response.data)

                })
         }catch (e){
             console.log(e);
         }
    console.log(postBody)
    }

    const handleChangeDate = (newValue: Dayjs | null) => {
        if (newValue) {
            const formattedDate = newValue.format("YYYY-MM");
            setDate(formattedDate);  // string olarak state'e at
            console.log("Selected YearMonth:", formattedDate);
        }
    };

    const handleRouter=()=>{
        navigate("/dashboard");
    }
    const handleRouterAddEmployee=()=>{
        navigate("/addEmployee")
    }




    const handleChangeEffort=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const value = event.target.value;
        setEffort(value === '' ? '' : parseFloat(value));
    }

    return(<>
        <CssBaseline/>

        <div style={{backgroundColor:"rgb(249, 246, 230)"}}>
            <Typography variant="h2" sx={{margin:"20px"}}> WORKLOG </Typography>
            <Box sx={{ minWidth: 120, margin:"20px" }} style={{backgroundColor:"#e8f5e9"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Name</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={name}
                        label="Name"
                        onChange={handleChangeAge}
                    >
                        {employees.map((employee,index)=>{
                            return(<MenuItem  value={`${employee.firstName} ${employee.lastName}`}  key={index} >{employee.firstName} {employee.lastName}</MenuItem>)
                        })}
                    </Select>
                </FormControl>
            </Box>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer
                    sx={{backgroundColor:"#e8f5e9", margin:"20px"}}
                    components={[
                        'DatePicker',
                        'TimePicker',
                        'DateTimePicker',
                        'DateRangePicker',
                        'TimeRangePicker',
                        'DateTimeRangePicker',
                    ]}
                >
                    <DemoItem label="DatePicker">
                        <DatePicker
                            defaultValue={yesterday}
                            disablePast
                            views={['year', 'month']}
                            onChange={handleChangeDate}
                        />
                    </DemoItem>

                </DemoContainer>
            </LocalizationProvider>
            <Box sx={{ minWidth: 120, margin:"20px" }} style={{backgroundColor:"#e8f5e9"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">WorkLog Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={worklogType}
                        label="Name"
                        onChange={handleChangeWorklogtype}
                    >
                        <MenuItem value="Development">Development</MenuItem>
                        <MenuItem value="Analysis">Analysis</MenuItem>
                        <MenuItem value="Test">Test</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TextField sx={{width:"100%", margin:"20px", backgroundColor:"#e8f5e9"}} type="number" id="filled-basic" label="Effort(hours)" variant="filled" onChange={handleChangeEffort}/>

            <Button variant="contained" sx={{margin:"20px"}} onClick={createWorklog}>Save</Button>
            <br/>
            <Button variant="contained" sx={{margin:"20px"}} onClick={handleRouter}>Go DashBoard</Button>
            <br/>
            <Button variant="contained" sx={{margin:"20px"}} onClick={handleRouterAddEmployee}>Add new Employee</Button>
        </div>

    </>);
}


export default Worklog;

