import React, { useEffect, useState } from "react";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        console.log("Access token being sent:", accessToken);

        const response = await fetch("https://crimsonsync-ebloodbank.onrender.com/api/auth/admin/view-admins", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            console.error("Unauthorized - Invalid or missing token.");
            setErrorMsg("Session expired or unauthorized access.");
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Admin API response:", data);

        setAdmins(data?.data?.AdminList || []);
        setTotalAdmins(data?.data?.["Total Users"] || 0);

        if (!data.success) {
          setErrorMsg(data.message || "Unknown error occurred");
        }
      } catch (error) {
        console.error("Error fetching admins:", error.message);
        setErrorMsg("Failed to fetch admins");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center text-red-600 mt-10 text-lg">Loading admins...</p>;
  }

  if (errorMsg) {
    return <p className="text-center text-red-500 mt-10 text-lg">{errorMsg}</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        👥 Total Admins: <span className="text-red-600">{totalAdmins}</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-red-600 text-white text-left text-sm uppercase tracking-wider">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(admins) &&
              admins.map((admin, index) => (
                <tr
                  key={admin._id}
                  className="border-t border-gray-100 hover:bg-red-50 transition"
                >
                  <td className="py-3 px-4 font-medium text-gray-700">{index + 1}</td>
                  <td className="py-3 px-4">{admin.name}</td>
                  <td className="py-3 px-4">{admin.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminList;
