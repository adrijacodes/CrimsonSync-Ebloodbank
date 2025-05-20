import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const res = await fetch("https://crimsonsync-ebloodbank.onrender.com/api/auth/admin/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch admin profile");

        const { data } = await res.json();
        const adminData = data.AdminInfo[0];
        setAdmin(adminData);
      } catch (err) {
        //toast.error("Error loading admin profile.");
        console.error(err);
      }
    };

    fetchAdminProfile();
  }, [token]);

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      return toast.warn("Please fill in both fields.");
    }

    try {
      const res = await fetch("https://crimsonsync-ebloodbank.onrender.com/api/auth/admin/profile/update-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (!res.ok) throw new Error();

      toast.success("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch {
      toast.error("Failed to update password.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your admin account?")) return;

    try {
      const res = await fetch("https://crimsonsync-ebloodbank.onrender.com/api/auth/admin/profile/delete", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("registered");
      setAdmin(null);
      toast.success("Admin account deleted.");
      setTimeout(() => navigate("/"), 2000);
    } catch {
      toast.error("Failed to delete account.");
    }
  };

  if (!admin) return <p className="text-center p-6">Loading admin profile...</p>;

  return (
    <div className="bg-gray-50 p-6 max-w-3xl mx-auto">
      {/* Profile */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <RxAvatar size={97} className="text-black" />
        <div>
          <h2 className="text-2xl font-semibold font-serif text-red-600">{admin.name}</h2>
          <p className="text-sm text-gray-600 font-serif">{admin.email}</p>
          {admin.location && (
            <p className="text-sm text-gray-600">
              Location: {admin.location.city.toUpperCase()}, {admin.location.state.toUpperCase()}
            </p>
          )}
        </div>
      </motion.div>

      {/* Change Password */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h3 className="text-lg font-semibold mb-4">Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded mb-4 w-full"
        />
        <button
          onClick={handlePasswordChange}
          className="bg-red-600 text-white py-2 px-4 rounded"
        >
          Save Password
        </button>
      </motion.div>

      {/* Delete Account */}
      <button
        onClick={handleDeleteAccount}
        className="bg-red-600 text-white py-2 px-4 rounded"
      >
        Delete Admin Account
      </button>
    </div>
  );
};

export default AdminProfile;
