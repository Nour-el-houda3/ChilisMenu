import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
