import React, { useState, useEffect } from 'react';
import AdminLayout from './Admin/AdminLayout';
import UnverifiedBounties from './Admin/UnverifiedBounties';
import axios from "axios"

interface Bounties {  
  bounties: {
    imageUrl: string,
    hostId: number, 
    id: number
  }[]
}

const AdminPage= ({userEmail} : {userEmail: string | undefined}) => {
  // Initially, the bounties array is empty
  const [bounties, setBounties] = useState([]);

  useEffect(() => {
    (async () => {
      const reponse = await axios.get('http://localhost:3000/api/app/allBounties', {
        withCredentials: true
      })

      if (!reponse.data.success) {
        alert('Invalid request')
      }

      setBounties(reponse.data.bounties)

    })()

  }, [])


  return (
    <AdminLayout>
      <UnverifiedBounties bounties={bounties} />
    </AdminLayout>
  );
};

export default AdminPage;
