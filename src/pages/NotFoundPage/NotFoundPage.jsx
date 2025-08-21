import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={goHome} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Go to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
