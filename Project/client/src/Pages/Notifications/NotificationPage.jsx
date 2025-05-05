import React, { useEffect, useState } from "react";

const NotificationPage = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`/api/notifications/${userId}`);
      const data = await response.json();
      setNotifications(data);
      setFiltered(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updated = notifications.map((n) =>
        n._id === id ? { ...n, isRead: true, status: "seen" } : n
      );
      setNotifications(updated);
      applyFilter(filter, updated);
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  // Apply filter to notification list
  const applyFilter = (type, list = notifications) => {
    setFilter(type);
    if (type === "all") setFiltered(list);
    else if (type === "active") setFiltered(list.filter((n) => n.status === "active"));
    else if (type === "seen") setFiltered(list.filter((n) => n.status === "seen" || n.isRead));
  };

  useEffect(() => {
    fetchNotifications();
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
              onClick={() => applyFilter(tab)}
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
        ) : filtered.length === 0 ? (
          <p>No {filter} notifications.</p>
        ) : (
          <ul className="space-y-4">
            {filtered.map((notif) => (
              <li
                key={notif._id}
                className={`p-4 border rounded-lg ${
                  notif.isRead
                    ? "bg-gray-100 border-gray-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-800">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Type: {notif.type} | Status: {notif.status}
                    </p>
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
