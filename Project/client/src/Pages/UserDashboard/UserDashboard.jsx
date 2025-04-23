import React from 'react';

const Dashboard = () => {
  const user = {
    name: 'John Doe',
    profilePicture: 'https://via.placeholder.com/150', // Replace with user's profile picture URL
    bloodType: 'O+',
    city: 'New York',
  };

  const upcomingEvents = [
    {
      eventName: 'Blood Donation Camp at Hospital A',
      date: 'April 25, 2025',
      location: 'New York Hospital',
    },
    {
      eventName: 'Community Blood Drive',
      date: 'May 5, 2025',
      location: 'Central Park, NYC',
    },
  ];

  const registeredEvents = [
    {
      eventName: 'Blood Donation Camp at Hospital B',
      date: 'March 30, 2025',
      status: 'Confirmed',
    },
    {
      eventName: 'Charity Blood Drive',
      date: 'April 15, 2025',
      status: 'Pending',
    },
  ];

  return (
    <div className="bg-gray-50 p-6">
      {/* Profile Overview */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center">
        <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full mr-6" />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.bloodType} Blood Type</p>
          <p className="text-sm text-gray-500">Location: {user.city}</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Upcoming Blood Donation Events</h3>
        <ul>
          {upcomingEvents.map((event, index) => (
            <li key={index} className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-semibold">{event.eventName}</h4>
                <p className="text-sm text-gray-500">{event.date}</p>
                <p className="text-sm text-gray-500">{event.location}</p>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md">Register</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Registered Events */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Your Registered Events</h3>
        <ul>
          {registeredEvents.map((event, index) => (
            <li key={index} className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-semibold">{event.eventName}</h4>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
              <span
                className={`text-sm font-semibold ${
                  event.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'
                }`}
              >
                {event.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Donation History (Optional Section) */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Donation History</h3>
        <p>No donations yet. Start donating today!</p>
      </div>

      {/* Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <p>No new notifications.</p>
      </div>

      {/* Account Settings */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
        <button className="bg-gray-500 text-white py-2 px-4 rounded-md">Edit Profile</button>
        <button className="bg-gray-500 text-white py-2 px-4 rounded-md ml-4">Change Password</button>
      </div>
    </div>
  );
};

export default Dashboard;
