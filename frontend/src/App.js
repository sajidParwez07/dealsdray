import React, { useState } from 'react';
import './App.css';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Headers from './Components/Headers';
import AdminRegister from './Components/AdminRegister';
import SideBar from './Components/SideBar';
import AdminLogin from './Components/AdminLogin';
import EmployeeList from './Components/EmployeeList';
import Dashboard from './Components/Dashboard';
import AddNewEmp from './Components/AddNewEmp';
import EditEmp from './Components/EditEmp';

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <HashRouter>
      <Headers handleToggleSidebar={handleToggleSidebar} />
      <div className='container-fuild'>
        <div className='row'>
          <div className='col-lg-4'>
            <SideBar isSidebarOpen={isSidebarOpen} />
          </div>
          <div className='col-lg-8' id='screen'>
            <Routes>
              <Route path='/' element={<AdminLogin />} />
              <Route path='/adminregister' element={<AdminRegister />} />
              <Route path='/employeelist' element={<EmployeeList />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/addnewemp' element={<AddNewEmp />} />
              <Route path='/editemp/:id' element={<EditEmp />} />
            </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  )
}

export default App;
