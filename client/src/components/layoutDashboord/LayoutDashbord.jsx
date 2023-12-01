import React from 'react';
import { Link } from 'react-router-dom';
import './LayoutdashboardStyles.css'; 

const DashboardComponent = () => {
  return (
    <div className="dashboard-container">
  <img src="/chilisLogo.png" alt="Logo" className="navbar-logo" />
  <h1 className="dashboard-header">Admin Dashboard</h1>
  <div className="nav-list">
    <div className="nav-item">
      <Link to="/admin/create" className="nav-link create-plat-link">
        Create Plat
      </Link>
    </div>
    <div className="nav-item">
      <Link to="/admin" className="nav-link view-plats-link">
        View Plats
      </Link>
    </div>
  </div>
</div>


  );
};

export default DashboardComponent;
