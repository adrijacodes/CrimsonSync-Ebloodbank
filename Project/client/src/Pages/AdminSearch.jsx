import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AdminSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setMessage('Search term is required.');
      setUsers([]);
      return;
    }

    setLoading(true);
    setMessage('');
    setUsers([]);

    try {
      const accessToken = localStorage.getItem("token");
      const response = await fetch(`htpp://localhost:8001/api/auth/admin/search-admins?searchTerm=${encodeURIComponent(searchTerm)}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch');
      }

      setUsers(data.data.UserList || []);
      setTotalUsers(data.data["Total Users"] || 0);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-4"
    >
      <h1 className="text-2xl font-bold text-red-600 mb-4 text-center">
        🔍 User Search
      </h1>

      <motion.div
        className="flex gap-2 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Search by name, email, username, donor, recipient, or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 border border-red-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          {loading ? 'Searching...' : 'Search'}
        </motion.button>
      </motion.div>

      {message && (
        <motion.p
          className="mb-4 text-sm text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      )}

      {users.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-600 mb-2">Total Users: {totalUsers}</p>
          <ul className="space-y-4">
            {users.map((user, index) => (
              <motion.li
                key={user._id}
                className="border border-red-300 p-4 rounded shadow-sm bg-white"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <h3 className="text-lg font-semibold text-red-700">
                  {admin.name}
                </h3>
                <p>Email: {admin.email}</p>
                <p>Username: {admin.username}</p>
                <p>
                  Role:{" "}
                  <span className="font-medium text-red-600">
                    {user.isDonor
                      ? "Donor"
                      : admin.isRecipient
                      ? "Recipient"
                      : "User"}
                  </span>
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminSearch;
