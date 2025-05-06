import React, { useEffect, useState, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotificationSound from "../../assets/Sound/notificationsound.mp3";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    all: 0,
    active: 0,
    seen: 0,
    cancelled: 0,
    accepted: 0,
    rejected: 0,
  });
  const [markingAsRead, setMarkingAsRead] = useState(null);
  const [previousActiveCount, setPreviousActiveCount] = useState(0);

  const filterRef = useRef(filter);
  const accessToken = localStorage.getItem("token");

// play NotificationSound when new "active" notifications are received
  const playNotificationSound = () => {
    const audio = new Audio(NotificationSound);
    audio
      .play()
      .catch((err) => console.warn("Notification sound failed to play:", err));
  };

  // Fetch the number of notifications in each category and detect new ones
  const fetchCounts = async () => {
    try {
      const [
        allRes,
        activeRes,
        seenRes,
        cancelledRes,
        acceptedRes,
        rejectedRes,
      ] = await Promise.all([
        fetch("http://localhost:8001/api/notifications", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch("http://localhost:8001/api/notifications/search?status=active", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch("http://localhost:8001/api/notifications/search?status=seen", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch("http://localhost:8001/api/notifications/search?status=cancelled", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch("http://localhost:8001/api/notifications/search?status=accepted", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch("http://localhost:8001/api/notifications/search?status=rejected", {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ]);

      const [
        allData,
        activeData,
        seenData,
        cancelledData,
        acceptedData,
        rejectedData,
      ] = await Promise.all([
        allRes.json(),
        activeRes.json(),
        seenRes.json(),
        cancelledRes.json(),
        acceptedRes.json(),
        rejectedRes.json(),
      ]);

      const activeCount = activeData.data?.notifications?.length || 0;
      const seenCount = seenData.data?.notifications?.length || 0;
      const allCount = allData.data?.length || allData.data?.notifications?.length || 0;
      const cancelledCount = cancelledData.data?.notifications?.length || 0;
      const acceptedCount = acceptedData.data?.notifications?.length || 0;
      const rejectedCount = rejectedData.data?.notifications?.length || 0;

      if (activeCount > previousActiveCount) {
        toast.info(`🔔 You have ${activeCount - previousActiveCount} new notification(s)!`);
        playNotificationSound();
      }

      setPreviousActiveCount(activeCount);

      setCounts({
        all: activeCount + seenCount,
        active: activeCount,
        seen: seenCount,
        cancelled: cancelledCount,
        accepted: acceptedCount,
        rejected: rejectedCount,
      });
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

  // Fetch and display filtered notification list based on selected tab
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
        Array.isArray(data.data) ? data.data : data.data.notifications || []
      );
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Update notification status to "seen" and refresh list + counts
  const markAsRead = async (id) => {
    setMarkingAsRead(id);
    try {
      const response = await fetch(`http://localhost:8001/api/notifications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ status: "seen" }),
      });

      if (!response.ok) {
        throw new Error("Failed to mark as read");
      }

      fetchNotifications(filterRef.current);
      fetchCounts();
    } catch (error) {
      console.error("Error marking as read:", error);
    } finally {
      setMarkingAsRead(null);
    }
  };

  // Handles rejection of action-required notifications
  const handleRejectionRequired = async (id) => {
    const notif = notifications.find((n) => n._id === id);
    try {
      const response = await fetch(
        `http://localhost:8001/api/notifications/action/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to process action");
      }

      fetchNotifications(filterRef.current);
      fetchCounts();
      toast.success(`❌ Rejected: "${notif?.message}"`);
    } catch (error) {
      console.error("Error processing action:", error);
    }
  };

  // Changes the visible notification list and remembers current tab for polling
  const handleFilterChange = (status) => {
    setFilter(status);
    filterRef.current = status;
    fetchNotifications(status);
  };

  //  (**Polling & Initialization**)every 50s, refresh notifications and counts for current tab
  useEffect(() => {
    if (accessToken) {
      fetchNotifications(filter);
      fetchCounts();

      const interval = setInterval(() => {
        fetchNotifications(filterRef.current);
        fetchCounts();
      }, 50000);

      return () => clearInterval(interval);
    }
  }, [accessToken]);
  // Ensure filterRef always matches the latest selected tab, for polling to work
  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center gap-2">
          <FaBell />
          Notifications
          {counts.active > 0 && (
            <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {counts.active > 99 ? "99+" : counts.active}
            </span>
          )}
        </h2>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {["all", "active", "seen", "cancelled", "accepted", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleFilterChange(tab)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium ${
                filter === tab ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === "active" && counts.active > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs font-bold">
                  {counts.active > 99 ? "99+" : counts.active}
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

                  {notif.status === "active" &&
                    !notif.isRead &&
                    notif.type === "info" && (
                      <button
                        onClick={() => markAsRead(notif._id)}
                        disabled={markingAsRead === notif._id}
                        className="ml-4 text-sm bg-red-500 text-white w-32 h-10 px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-300"
                      >
                        {markingAsRead === notif._id ? "Marking..." : "Mark as read"}
                      </button>
                    )}

                  {notif.type === "action_required" &&
                    (notif.status === "rejected" ? (
                      <span className="ml-4 text-lg font-bold text-red-600">Rejected</span>
                    ) : (
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleRejectionRequired(notif._id)}
                          className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </div>
                    ))}
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
