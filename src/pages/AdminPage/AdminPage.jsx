// src/pages/AdminPage.js
import React from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice/authSlice';


const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminPage;
