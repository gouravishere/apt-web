
import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const { userId } = useParams(); 

  return (
    <div>
      <h1>User Profile</h1>
      <p>Displaying information for user ID: {userId}</p>
    </div>
  );
};

export default UserProfilePage;
