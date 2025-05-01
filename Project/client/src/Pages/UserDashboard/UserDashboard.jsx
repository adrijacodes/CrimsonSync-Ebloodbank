import React, { useEffect, useState } from 'react';
import Avatar from '../../assets/Avatar.jpg';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [donorEnabled, setDonorEnabled] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [bloodType, setBloodType] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('token');
        console.log("access token:",accessToken);
        const response = await fetch('http://localhost:8001/api/auth/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();
        const userData = data.data.UserInfo[0];
        setUser(userData);
        setBloodType(userData.bloodType || 'O+');
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleDay = (day) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleLocationChange = (e) => {
    setUser({ ...user, city: e.target.value });
  };

  const handleSaveLocation = () => {
    setIsEditingLocation(false);
    // Optionally: add fetch PUT request to update city
  };

  const handleSaveDonorInfo = async () => {
    setSaveMessage('Saving...');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/user/donor-settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bloodType,
          availability,
        }),
      });

      if (!res.ok) throw new Error('Failed to save donor settings');

      setSaveMessage('Your donor preferences have been saved successfully!');
    } catch (err) {
      setSaveMessage('Failed to save settings.');
      console.error(err);
    }

    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDeleteAccount = () => {
    alert('Your account has been deleted.');
    // Optionally: Add fetch DELETE call to delete the user
  };

  if (!user) return <p className="p-6 text-center">Loading user profile...</p>;

  return (
    <div className="bg-gray-50 p-6 max-w-4xl mx-auto">
      {/* User Info */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center gap-6">
        <img src={Avatar} alt="Profile" className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">
              Location:{' '}
              {isEditingLocation ? (
                <input
                  type="text"
                  value={user.city}
                  onChange={handleLocationChange}
                  className="border p-1 text-sm rounded"
                />
              ) : (
                user.city
              )}
            </p>
            <button
              onClick={() =>
                isEditingLocation ? handleSaveLocation() : setIsEditingLocation(true)
              }
              className="text-blue-500 text-sm"
            >
              {isEditingLocation ? 'Save' : 'Edit'}
            </button>
          </div>
        </div>
      </div>

      {/* Donation History */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Donation History</h3>
        <p>No donations yet. Start donating today!</p>
      </div>

      {/* Donor Toggle */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Be a Donor</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={donorEnabled}
              onChange={(e) => setDonorEnabled(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-600 transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-full"></div>
          </label>
        </div>

        {donorEnabled && (
          <div className="space-y-4">
            {/* Availability */}
            <div>
              <label className="block text-sm font-medium mb-1">Availability</label>
              <div className="flex flex-wrap gap-2">
                {days.map((day) => (
                  <label key={day} className="text-sm flex items-center gap-1">
                    <input
                      type="checkbox"
                      checked={availability.includes(day)}
                      onChange={() => toggleDay(day)}
                      className="form-checkbox text-blue-600"
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>

            {/* Blood Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Blood Type</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full border p-2 rounded text-sm"
              >
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <button
              onClick={handleSaveDonorInfo}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
            {saveMessage && <p className="text-green-600 text-sm">{saveMessage}</p>}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <p>No new notifications.</p>
      </div>

      {/* Delete Account */}
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-lg font-semibold mb-4 text-red-600">Account Settings</h3>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
