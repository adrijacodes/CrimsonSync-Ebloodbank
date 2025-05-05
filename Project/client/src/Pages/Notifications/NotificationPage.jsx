import React, { useEffect, useState } from "react";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch notifications (all, active, seen)
  const fetchNotifications = async (status = "all") => {
    setLoading(true);
    const accessToken = localStorage.getItem("token");

    try {
      const url =
        status === "all"
          ? "http://localhost:8001/api/notifications"
          : `http://localhost:8001/api/notifications/search?status=${status}`;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      console.log("Fetched data:", data.data); // Debugging line
      setNotifications(Array.isArray(data.data) ? data : data.data.notifications || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      console.error("Error:", error.response?.data?.message);  
      alert(error.response?.data?.message);
      setNotifications([]); // fallback to empty
    } finally {
      setLoading(false);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id) => {
    const accessToken = localStorage.getItem("token");

    try {
      await fetch(`http://localhost:8001/api/notifications/${id}/read`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Refresh notifications after marking as read
      fetchNotifications(filter);
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilter(status);
    fetchNotifications(status);
  };

  useEffect(() => {
    fetchNotifications("all");
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Notifications</h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["all", "active", "seen"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilterChange(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                filter === tab
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Notification List */}
        {loading ? (
          <p>Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p>No {filter} notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notif) => (
              <li
                key={notif._id}
                className={`p-4 border rounded-lg ${
                  notif.isRead
                    ? "bg-gray-100 border-gray-300"
                    : "bg-green-50 border-green-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-800">{notif.message}</p>
                    
                  </div>
                  {notif.status === "active" && !notif.isRead && (
                    <button
                      onClick={() => markAsRead(notif._id)}
                      className="ml-4 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
