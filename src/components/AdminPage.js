import React from 'react';
import Logout from './Logout';

const AdminPage = () => {
  return (
    <div className="text-center">
      <h1>Welcome Admin</h1>
      <p>You have administrative privileges.</p>
      <Logout/>
    </div>
  );
};

export default AdminPage;
