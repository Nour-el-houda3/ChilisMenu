import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateComponent from './components/addPlats/CreateComponent';
import AdminDashboard from './components/dashbord/Dashbord'; 
import UpdatePlatComponent from './components/updatePlats/updateComponent';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/create" element={<CreateComponent />} />
      <Route path="/edit/:id" element={<UpdatePlatComponent />} />
    </Routes>
  );
};

export default AdminRoutes;
