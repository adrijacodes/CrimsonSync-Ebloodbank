import React, { useState } from 'react';
import axios from 'axios';

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm) {
      setError('Search term is required');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(`/api/users/search`, {
        params: { searchTerm }
      });
      setUsers(response.data.data.UserList);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search users by name, email, username, or role"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="user-list">
        {users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user._id} className="user-item">
                <h3>{user.username}</h3>
                <p>{user.email}</p>
                <p>{user.role}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
