import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationSound from "../../assets/Sound/notificationsound.mp3";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ all: 0, active: 0, seen: 0 });
  const [markingAsRead, setMarkingAsRead] = useState(null);
  const [previousActiveCount, setPreviousActiveCount] = useState(0);

  const accessToken = localStorage.getItem("token");

  // ✅ Play notification sound
  const playNotificationSound = () => {
    const audio = new Audio(NotificationSound );
    audio.play().catch((err) =>
      console.warn("Notification sound failed to play:", err)
    );
  };

  // ✅ Fetch counts and notify on new active
  const fetchCounts = async () => {
    try {
      const [allRes, activeRes, seenRes] = await Promise.all([
        fetch("http://localhost:8001/api/notifications", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch("http://localhost:8001/api/notifications/search?status=active", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch("http://localhost:8001/api/notifications/search?status=seen", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ]);

      const [allData, activeData, seenData] = await Promise.all([
        allRes.json(),
        activeRes.json(),
        seenRes.json(),
      ]);

      const activeCount = activeData.data?.notifications?.length || 0;
      const seenCount = seenData.data?.notifications?.length || 0;
      const allCount =
        allData.data?.length || allData.data?.notifications?.length || 0;

      // 🔔 Show toast and sound on new active notifications
      if (activeCount > previousActiveCount) {
        toast.info(`🔔 You have ${activeCount - previousActiveCount} new notification(s)!`);
        playNotificationSound();
      }

      setPreviousActiveCount(activeCount);

      setCounts({
        all: activeCount + seenCount,
        active: activeCount,
        seen: seenCount,
      });
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  // ✅ Fetch notifications
  const fetchNotifications = async (status = "all") => {
    setLoading(true);

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

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }

      const data = await response.json();

      setNotifications(
        Array.isArray(data.data)
          ? data.data
          : data.data.notifications || []
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]); // fallback to empty
    } finally {
      setLoading(false);
    }
  };

  // ✅ Mark a notification as read
  const markAsRead = async (id) => {
    setMarkingAsRead(id);
    try {
      const response = await fetch(
        `http://localhost:8001/api/notifications/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark as read");
      }

      fetchNotifications(filter);
      fetchCounts();
    } catch (error) {
      console.error("Error marking as read:", error);
    } finally {
      setMarkingAsRead(null);
    }
  };

  // ✅ Change tab
  const handleFilterChange = (status) => {
    setFilter(status);
    fetchNotifications(status);
  };

  // ✅ Initial fetch & polling
  useEffect(() => {
    if (accessToken) {
      fetchNotifications("all");
      fetchCounts();

      const interval = setInterval(() => {
        fetchNotifications(filter);
        fetchCounts();
      }, 50000);

      return () => clearInterval(interval);
    }
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center gap-2">
          <FaBell />
          Notifications
          {counts.all > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {counts.all > 99 ? "99+" : counts.all}
            </span>
          )}
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["all", "active", "seen"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilterChange(tab)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium ${
                filter === tab
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {counts[tab] > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs font-bold">
                  {counts[tab] > 99 ? "99+" : counts[tab]}
                </span>
              )}
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
                  <p className="text-sm text-gray-800">{notif.message}</p>

                  {notif.status === "active" && !notif.isRead && (
                    <button
                      onClick={() => markAsRead(notif._id)}
                      disabled={markingAsRead === notif._id}
                      className="ml-4 text-sm bg-red-500 text-white w-32 h-10 px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-300 flex-shrink-0"
                    >
                      {markingAsRead === notif._id
                        ? "Marking..."
                        : "Mark as read"}
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
