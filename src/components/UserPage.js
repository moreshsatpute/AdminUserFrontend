import React from 'react';
import Logout from './Logout';

const UserPage = () => {
  return (
    <div className="text-center">
      <h1>Welcome User</h1>
      <p>You have user access.</p>
      <Logout/>
    </div>
  );
};

export default UserPage;
