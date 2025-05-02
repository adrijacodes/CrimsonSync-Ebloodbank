import React, { useEffect, useState } from 'react';
import { RxAvatar } from "react-icons/rx";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [donorEnabled, setDonorEnabled] = useState(false);
  const [availability, setAvailability] = useState([]);
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
        setAvailability(userData.availability || []);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleDay = (day) => {
    setAvailability((prev) => {
      const updatedAvailability = new Set(prev);
      updatedAvailability.has(day) ? updatedAvailability.delete(day) : updatedAvailability.add(day);
      return Array.from(updatedAvailability);
    });
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
        body: JSON.stringify({ city: updatedCity, state: updatedState }),
      });

      if (!res.ok) throw new Error('Failed to update location');

      setUser({ ...user, location: { city: updatedCity, state: updatedState } });
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
      const donorStatusRes = await fetch('http://localhost:8001/api/auth/user/profile/update-donor-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ isDonor: donorEnabled }),
      });

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
      const availabilityUppercase = availability.map((day) => day.toUpperCase());
      const res = await fetch('http://localhost:8001/api/auth/user/profile/update-availability', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ availability: availabilityUppercase }),
      });

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
      const res = await fetch('http://localhost:8001/api/auth/user/profile/update-blood-type', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ bloodType }),
      });

      if (!res.ok) throw new Error('Failed to update blood type');

      setSaveMessage('Blood type saved successfully!');
    } catch (err) {
      console.error('Error saving blood type:', err);
      setSaveMessage('Failed to save blood type.');
    }

    setTimeout(() => setSaveMessage(''), 3000);
  };

  if (!user) return <p className="p-6 text-center text-lg text-gray-600">Loading user profile...</p>;

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-6">
          <RxAvatar size={97} className="text-gray-800" />
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-serif text-gray-800">{user.name}</h2>
            <p className="text-gray-600 text-sm font-serif">📧 {user.email}</p>
            <p className="text-gray-600 text-sm font-serif">Username: {user.username}</p>
            <div className="flex items-center gap-2">
              <p className="text-gray-600 text-sm font-serif">
              📍 Location:{' '}
                {isEditingLocation ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="city"
                      value={updatedCity}
                      onChange={handleLocationChange}
                      placeholder="City"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-400"
                    />
                    <input
                      type="text"
                      name="state"
                      value={updatedState}
                      onChange={handleLocationChange}
                      placeholder="State"
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:border-blue-400"
                    />
                  </div>
                ) : (
                  `${updatedCity.toUpperCase()}, ${updatedState.toUpperCase()}`
                )}
              </p>
              <button
                onClick={() => (isEditingLocation ? handleSaveLocation() : setIsEditingLocation(true))}
                className="text-blue-600 text-sm underline hover:text-blue-800"
              >
                {isEditingLocation ? 'Save' : 'Edit'}
              </button>
            </div>
          </div>
        </div>

        {/* Donation History */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h3 className="text-lg font-semibold mb-2 font-serif text-gray-700">Donation History</h3>
          <p className="text-sm text-gray-600">
            {user.lastDonationDate
              ? `Last donated on: ${new Date(user.lastDonationDate).toDateString()}`
              : 'No donations yet. Start donating today!'}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex gap-4 border-b mb-4">
            {['donor', 'availability', 'blood'].map((tab) => (
              <button
                key={tab}
                className={`pb-2 text-sm font-medium capitalize ${
                  activeTab === tab ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'donor' && 'Donor Status'}
                {tab === 'availability' && 'Availability'}
                {tab === 'blood' && 'Blood Group'}
              </button>
            ))}
          </div>

          {activeTab === 'donor' && (
            <div className="space-y-4">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={donorEnabled}
                  onChange={(e) => setDonorEnabled(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                Enable Donor Status
              </label>
              <button
                onClick={handleSaveDonorSettings}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Save Donor Status
              </button>
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700">Select Available Days</p>
              <div className="flex flex-wrap gap-4">
                {days.map((day) => (
                  <label key={day} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={availability.includes(day)}
                      onChange={() => toggleDay(day)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    {day}
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
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Select Blood Group</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:border-blue-400"
              >
                {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <button
                onClick={handleSaveBloodType}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
              >
                Save Blood Group
              </button>
            </div>
          )}
        </div>

        {/* Save Message */}
        {saveMessage && <p className="text-center text-green-600 text-sm">{saveMessage}</p>}
      </div>
    </div>
  );
};

export default Dashboard;
