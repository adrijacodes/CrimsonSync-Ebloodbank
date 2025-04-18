import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [showEventOptions, setShowEventOptions] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 "style={{ backgroundImage: "url('../src/assets/Bg1.jpeg')" }}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl ">

        {/* Event Management */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => setShowEventOptions(!showEventOptions)}
            className="bg-white text-black px-11 py-10 text-2xl rounded-full font-serif border border-gray-300 hover:bg-gray-100"
          >
             Event Management
          </button>

          {showEventOptions && (
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => navigate('/NewEvent')}
                className="bg-red-100 hover:bg-red-200 text-red-800 font-serif py-2 px-4 rounded-lg"
              >
                 +Add Event
              </button>
              <button
                onClick={() => navigate('/ViewEvent')}
                className="bg-red-100 hover:bg-red-200 text-red-800 font-serif py-2 px-4 rounded-lg"
              >
                View Events
              </button>
              <button
                onClick={() => navigate('/eventbycityyear')}
                className="bg-red-100 hover:bg-red-200 text-red-800 font-serif py-2 px-4 rounded-lg"
              >
                Events by City & Year
              </button>
            </div>
          )}
        </div>

        {/* User Management */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => setShowUserOptions(!showUserOptions)}
            className="bg-white text-black px-11 py-10 text-2xl rounded-full font-serif border border-gray-300 hover:bg-gray-100"
          >
            User Management
          </button>

          {showUserOptions && (
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => navigate('/Viewuser')}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-serif py-2 px-4 rounded-lg"
              >
                 View Users
              </button>
              <button
                onClick={() => navigate('/Searchuser')}
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-serif py-2 px-4 rounded-lg"
              >
                Search User
              </button>
            </div>
          )}
        </div>

        {/* Admin Management */}
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => setShowAdminOptions(!showAdminOptions)}
            className="bg-white text-black px-11 py-10  text-2xl rounded-full font-serif border border-gray-300 hover:bg-gray-100"
          >
            Admin Management
          </button>

          {showAdminOptions && (
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => navigate('/Viewadmin')}
                className="bg-green-100 hover:bg-green-200 text-green-800 font-serif py-2 px-4 rounded-lg"
              >
                View Admin
              </button>
              <button
                onClick={() => navigate('/Searchadmin')}
                className="bg-green-100 hover:bg-green-200 text-green-800 font-serif py-2 px-4 rounded-lg"
              >
                Search Admin
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
