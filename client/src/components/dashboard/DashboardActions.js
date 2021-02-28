import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-band" className="btn btn-light">
        <i className="fas fa-guitar text-primary"></i> Add Band
      </Link>
    </div>
  );
};

export default DashboardActions;
