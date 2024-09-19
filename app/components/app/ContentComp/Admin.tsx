import React, { useState, useEffect } from "react";
import AdminLayout from "./Admin/AdminLayout";
import UnverifiedBounties from "./Admin/UnverifiedBounties";
import axios from "axios";
import Welcome from "../ContentComp/Welcome";
import {toast, Toaster} from "sonner"

export const runtime = "edge";

const AdminPage = ({ userEmail }: { userEmail: string | undefined }) => {
  // Initially, the bounties array is empty
  const [bounties, setBounties] = useState([]);
  const DEPLOYED_LINK_URL = process.env.NEXT_PUBLIC_DEPLOYED_LINK;

  useEffect(() => {
    (async () => {
      const reponse = await axios.get(
        `${window.location.origin}/api/app/allBounties`,
        {
          withCredentials: true,
        }
      );

      if (!reponse.data.success) {
        toast("Invalid request");
      }

      setBounties(reponse.data.bounties);
    })();
  }, []);

  return (
    <div>
      {userEmail == "someone@gmail.com" || userEmail == "gloom@gmail.com" ? (
        <AdminLayout>
          <UnverifiedBounties bounties={bounties} />
          <Toaster/>
        </AdminLayout>
      ) : (
        <div>
          <Welcome />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
