import React, { useEffect, useState } from 'react';
import { RxAvatar } from "react-icons/rx"; 

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [donorEnabled, setDonorEnabled] = useState(false);
  const [availability, setAvailability] = useState([]);  // This will store the selected availability days
  const [bloodType, setBloodType] = useState('O+');
  const [saveMessage, setSaveMessage] = useState('');
  const [updatedCity, setUpdatedCity] = useState('');
  const [updatedState, setUpdatedState] = useState('');
  const [activeTab, setActiveTab] = useState('donor');
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('token');
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
        setUpdatedCity(userData.location?.city || '');
        setUpdatedState(userData.location?.state || '');
        setDonorEnabled(userData.isDonor || false);
        setAvailability(userData.availability || []); // Set availability when user profile is fetched
      } catch (error) {
        console.error('Error fetching profile:', error);
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
    const { name, value } = e.target;
    if (name === 'city') setUpdatedCity(value);
    else if (name === 'state') setUpdatedState(value);
  };

  const handleSaveLocation = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8001/api/auth/user/profile/update-location', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          city: updatedCity,
          state: updatedState,
        }),
      });

      if (!res.ok) throw new Error('Failed to update location');

      setUser({
        ...user,
        location: { city: updatedCity, state: updatedState },
      });
      setSaveMessage('Location updated successfully!');
    } catch (error) {
      setSaveMessage('Failed to update location.');
      console.error('Location update error:', error);
    }

    setTimeout(() => setSaveMessage(''), 3000);
    setIsEditingLocation(false);
  };

  const handleSaveDonorSettings = async () => {
    setSaveMessage('Saving...');
    const accessToken = localStorage.getItem('token');

    try {
      const donorStatusRes = await fetch(
        'http://localhost:8001/api/auth/user/profile/update-donor-status',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ isDonor: donorEnabled }),
        }
      );

      if (!donorStatusRes.ok) throw new Error('Failed to update donor status');

      setSaveMessage('Donor status saved successfully!');
    } catch (err) {
      console.error('Error saving donor status:', err);
      setSaveMessage('Failed to save donor status.');
    }

    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSaveAvailability = async () => {
    setSaveMessage('Saving...');
    const accessToken = localStorage.getItem('token');

    try {
      // Ensure availability days are in uppercase format
      const availabilityUppercase = availability.map((day) => day.toUpperCase());

      const res = await fetch(
        'http://localhost:8001/api/auth/user/profile/update-availability',
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ availability: availabilityUppercase }),
        }
      );

      if (!res.ok) throw new Error('Failed to update availability');

      setSaveMessage('Availability saved successfully!');
    } catch (err) {
      console.error('Error saving availability:', err);
      setSaveMessage('Failed to save availability.');
    }

    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSaveBloodType = async () => {
    setSaveMessage('Saving...');
    const accessToken = localStorage.getItem('token');

    try {
      const res = await fetch(
        'http://localhost:8001/api/auth/user/profile/update-blood-type',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ bloodType }),
        }
      );

      if (!res.ok) throw new Error('Failed to update blood type');

      setSaveMessage('Blood type saved successfully!');
    } catch (err) {
      console.error('Error saving blood type:', err);
      setSaveMessage('Failed to save blood type.');
    }

    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!user) return <p className="p-6 text-center">Loading user profile...</p>;

  return (
    <div className="bg-gray-50 p-6 max-w-4xl mx-auto">
      {/* Profile Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center gap-6">
        <RxAvatar size={97} className="w-24 h-24 text-black" /> {/* Avatar Icon */}
        <div>
          <h2 className="text-2xl font-semibold font-serif">{user.name}</h2>
          <p className="text-sm text-gray-600 font-serif">{user.email}</p>
          <p className="text-sm text-gray-600 font-serif">Username: {user.username}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600 font-serif">
              Location:{' '}
              {isEditingLocation ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="city"
                    value={updatedCity}
                    onChange={handleLocationChange}
                    placeholder="City"
                    className="border p-1 rounded text-sm"
                  />
                  <input
                    type="text"
                    name="state"
                    value={updatedState}
                    onChange={handleLocationChange}
                    placeholder="State"
                    className="border p-1 rounded text-sm"
                  />
                </div>
              ) : (
                `${updatedCity.toUpperCase()}, ${updatedState.toUpperCase()}`
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
        {user.lastDonationDate ? (
          <p>Last donated on: {new Date(user.lastDonationDate).toDateString()}</p>
        ) : (
          <p>No donations yet. Start donating today!</p>
        )}
      </div>

      {/* Donor Info Tabs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex gap-4 mb-4 border-b">
          {['donor', 'availability', 'blood'].map((tab) => (
            <button
              key={tab}
              className={`pb-2 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'donor' && 'Donor Status'}
              {tab === 'availability' && 'Availability'}
              {tab === 'blood' && 'Blood Group'}
            </button>
          ))}
        </div>

        {activeTab === 'donor' && (
          <div>
            <label className="flex items-center gap-2">
              <span className="text-sm">Enable Donor Status</span>
              <input
                type="checkbox"
                checked={donorEnabled}
                onChange={(e) => setDonorEnabled(e.target.checked)}
                className="form-checkbox"
              />
            </label>
            <button
              onClick={handleSaveDonorSettings}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Save Donor Status
            </button>
          </div>
        )}

        {activeTab === 'availability' && (
          <div>
            <label className="block text-sm font-medium mb-2">Select Available Days</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {days.map((day) => (
                <label key={day} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={availability.includes(day)}
                    onChange={() => toggleDay(day)}
                    className="form-checkbox"
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
            <button
              onClick={handleSaveAvailability}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Save Availability
            </button>
          </div>
        )}

        {activeTab === 'blood' && (
          <div>
            <label className="block text-sm font-medium mb-2">Select Blood Group</label>
            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className="border p-1 rounded text-sm"
            >
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
            <button
              onClick={handleSaveBloodType}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Save Blood Group
            </button>
          </div>
        )}
      </div>

      {saveMessage && (
        <p className="mt-4 text-sm text-center text-green-500">{saveMessage}</p>
      )}
    </div>
  );
};

export default Dashboard;
