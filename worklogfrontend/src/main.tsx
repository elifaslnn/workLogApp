import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Worklog from './pages/worklog.tsx';
import Dashboard from './pages/dashboard.tsx';
import AddEmployees from "./pages/addEmployees.tsx";
import EmployeeList from "./pages/employeeList.tsx";
import WorklogList from "./pages/worklogList.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<Worklog />} />
                <Route path="/addEmployee" element={<AddEmployees />} />
                <Route path="/showEmployees" element={<EmployeeList />} />
                <Route path="/showWorkLogList" element={<WorklogList />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
);
