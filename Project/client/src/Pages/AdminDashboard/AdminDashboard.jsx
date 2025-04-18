import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [showEventOptions, setShowEventOptions] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  const sectionCard =
    'bg-red-600 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 p-6 flex flex-col items-center w-full';

  const toggleBtn =
    'w-full text-lg font-medium text-white bg-red-600 hover:bg-red-700 py-4 px-6 rounded-full font-serif transition duration-200 shadow';

  const subBtn =
    'w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-serif py-2 px-4 rounded-md text-sm';

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-6xl">

        {/* Event Management */}
        <div className={sectionCard}>
          <button
            onClick={() => setShowEventOptions(!showEventOptions)}
            className={toggleBtn}
          >
            Event Management
          </button>

          {showEventOptions && (
            <div className="mt-4 w-full space-y-2">
              <button
                onClick={() => navigate('/NewEvent')}
                className={subBtn}
              >
                + Add Event
              </button>
              <button
                onClick={() => navigate('/ViewEvent')}
                className={subBtn}
              >
                View Events
              </button>
              <button
                onClick={() => navigate('/eventbycityyear')}
                className={subBtn}
              >
                Events by City & Year
              </button>
            </div>
          )}
        </div>

        {/* User Management */}
        <div className={sectionCard}>
          <button
            onClick={() => setShowUserOptions(!showUserOptions)}
            className={toggleBtn}
          >
            User Management
          </button>

          {showUserOptions && (
            <div className="mt-4 w-full space-y-2">
              <button
                onClick={() => navigate('/Viewuser')}
                className={subBtn}
              >
                View Users
              </button>
              <button
                onClick={() => navigate('/Searchuser')}
                className={subBtn}
              >
                Search User
              </button>
            </div>
          )}
        </div>

        {/* Admin Management */}
        <div className={sectionCard}>
          <button
            onClick={() => setShowAdminOptions(!showAdminOptions)}
            className={toggleBtn}
          >
            Admin Management
          </button>

          {showAdminOptions && (
            <div className="mt-4 w-full space-y-2">
              <button
                onClick={() => navigate('/Viewadmin')}
                className={subBtn}
              >
                View Admin
              </button>
              <button
                onClick={() => navigate('/Searchadmin')}
                className={subBtn}
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
