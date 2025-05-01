import React, { useEffect, useState } from 'react';
import Avatar from '../../assets/Avatar.jpg';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [donorEnabled, setDonorEnabled] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [bloodType, setBloodType] = useState('O+');
  const [saveMessage, setSaveMessage] = useState('');
  const [updatedCity, setUpdatedCity] = useState('');
  const [updatedState, setUpdatedState] = useState('');
  const [updatedContact, setUpdatedContact] = useState('');

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
        setUpdatedContact(userData.contact || '');
        setDonorEnabled(userData.isDonor || false);
        setAvailability(userData.availability || []);
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

  const handleContactSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:8001/api/user/update-contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ contact: updatedContact }),
      });

      if (!res.ok) throw new Error('Failed to update contact');

      setUser({ ...user, contact: updatedContact });
      setSaveMessage('Contact number updated successfully!');
    } catch (err) {
      setSaveMessage('Failed to update contact number.');
      console.error('Contact update error:', err);
    }

    setTimeout(() => setSaveMessage(''), 3000);
    setIsEditingContact(false);
  };

  const handleSaveDonorInfo = async () => {
    setSaveMessage('Saving...');
    const accessToken = localStorage.getItem('token');
  
    try {
      // Update Blood Type
      const bloodTypeRes = await fetch('http://localhost:8001/api/auth/user/profile/update-blood-type', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ bloodType }),
      });
  
      if (!bloodTypeRes.ok) throw new Error('Failed to update blood type');
  
      // ✅ Normalize day format before sending
      const formattedDays = availability.map(day => day.toUpperCase());
      console.log('Sending availability:', formattedDays);

      const availabilityRes = await fetch('http://localhost:8001/api/auth/user/profile/update-availability', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ days: formattedDays }),
      });
  
      if (!availabilityRes.ok) throw new Error('Failed to update availability');
  
      const donorStatusRes = await fetch('http://localhost:8001/api/auth/user/profile/update-donor-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ isDonor: donorEnabled }),
      });
  
      if (!donorStatusRes.ok) throw new Error('Failed to update donor status');
  
      setSaveMessage('Your donor preferences have been saved successfully!');
    } catch (err) {
      console.error('Error saving donor info:', err);
      setSaveMessage('Failed to save one or more donor settings.');
    }
  
    setTimeout(() => setSaveMessage(''), 3000);
  };
  

  const handleDeleteAccount = () => {
    alert('Your account has been deleted.');
  };

  if (!user) return <p className="p-6 text-center">Loading user profile...</p>;

  return (
    <div className="bg-gray-50 p-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center gap-6">
        <img src={Avatar} alt="Profile" className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600">Username: {user.username}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">
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

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Donation History</h3>
        {user.lastDonationDate ? (
          <p>Last donated on: {new Date(user.lastDonationDate).toDateString()}</p>
        ) : (
          <p>No donations yet. Start donating today!</p>
        )}
      </div>

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

            <div>
              <label className="block text-sm font-medium mb-1">Blood Type</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full border p-2 rounded text-sm"
              >
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSaveDonorInfo}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save Donor Settings
            </button>
          </div>
        )}
      </div>

      {saveMessage && <p className="text-center text-green-600">{saveMessage}</p>}

      <div className="text-center mt-8">
        <button
          onClick={handleDeleteAccount}
          className="text-red-500 text-sm hover:underline"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
