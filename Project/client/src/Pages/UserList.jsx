import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        console.log("Access token being sent:", accessToken);

        const response = await fetch("http://localhost:8001/api/auth/user/view-users", {
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

        if (data.success) {
          setUsers(data.data.UserList);
          setTotalUsers(data.data["Total Users"]);
        } else {
          setErrorMsg(data.message);
        }
      } catch (error) {
        console.error("Error fetching users:", error.message);
        setErrorMsg("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading)
    return <p className="text-center text-red-600 mt-10 text-lg">Loading users...</p>;
  if (errorMsg) return <p className="text-center text-red-500 mt-10 text-lg">{errorMsg}</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        👥 Total Users: <span className="text-red-600">{totalUsers}</span>
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
          <thead>
            <tr className="bg-red-600 text-white text-left text-sm uppercase tracking-wider">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Username</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Blood Type</th>
              <th className="py-3 px-4">Location</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="border-t border-gray-100 hover:bg-red-50 transition"
              >
                <td className="py-3 px-4 font-medium text-gray-700">{index + 1}</td>
                <td className="py-3 px-4">{user.username}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.bloodType || "N/A"}</td>
                <td className="py-3 px-4">{user.location?.city || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
