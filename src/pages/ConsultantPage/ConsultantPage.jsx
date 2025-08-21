// src/pages/ConsultantPage.js
import React from 'react';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice/authSlice';


const ConsultantPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h1>Consultant Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ConsultantPage;
