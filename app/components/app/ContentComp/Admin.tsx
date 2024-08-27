import React, { useState } from 'react';
import AdminLayout from './Admin/AdminLayout';
import UnverifiedBounties from './Admin/UnverifiedBounties';

const AdminPage: React.FC = () => {
  // Initially, the bounties array is empty
  const [bounties, setBounties] = useState([{
    hostId: 1,
    endpoint: "Hello world",
    url: "something"
  }]);

  return (
    <AdminLayout>
      <UnverifiedBounties bounties={bounties} />
    </AdminLayout>
  );
};

export default AdminPage;
