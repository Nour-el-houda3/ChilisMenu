import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminRoutes from './AdminRoutes';
import MenuComponent from './components/menu/menuComponent';
ReactDOM.render(
  <BrowserRouter>
    <Routes>
    <Route path='/' element={<MenuComponent/>}/>
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
