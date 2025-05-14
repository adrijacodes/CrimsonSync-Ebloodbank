import React, { useEffect, useState, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
    accepted: 0,
    rejected: 0,
  });
  const [markingAsRead, setMarkingAsRead] = useState(null);
  const [previousActiveCount, setPreviousActiveCount] = useState(0);
  const navigate = useNavigate();

  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    hadRecentIllness: "",
    onMedication: "",
    recentSurgery: "",
    alcoholUse: "",
    chronicDiseases: "",
    covidExposure: "",
    lastDonationDate: "",
    currentlyPregnant: "",
    consent: "",
  });

  const [currentNotificationId, setCurrentNotificationId] = useState(null);

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
      const urls = [
        "notifications",
        "notifications/search?status=active",
        "notifications/search?status=seen",
        "notifications/search?status=accepted",
        "notifications/search?status=rejected",
        "notifications/search?status=cancelled", // Added
      ];
      const [
        allRes,
        activeRes,
        seenRes,
        acceptedRes,
        rejectedRes,
        cancelledRes,
      ] = await Promise.all(
        urls.map((url) =>
          fetch(`http://localhost:8001/api/${url}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
        )
      );
      const [allData, activeData, seenData, acceptedData, rejectedData] =
        await Promise.all([
          allRes.json(),
          activeRes.json(),
          seenRes.json(),
          acceptedRes.json(),
          rejectedRes.json(),
          cancelledRes.json(), // Discarded
        ]);

      const activeCount = activeData.data?.notifications?.length || 0;
      const seenCount = seenData.data?.notifications?.length || 0;

      if (activeCount > previousActiveCount) {
        toast.info(
          `🔔 You have ${
            activeCount - previousActiveCount
          } new notification(s)!`
        );
        playNotificationSound();
      }

      setPreviousActiveCount(activeCount);
      setCounts({
        all: allData.data?.notifications?.length || 0,
        active: activeCount,
        seen: seenCount,
        accepted: acceptedData.data?.notifications?.length || 0,
        rejected: rejectedData.data?.notifications?.length || 0,
        // Not adding cancelled count here
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

      if (!response.ok) throw new Error("Failed to fetch notifications");

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
      const response = await fetch(
        ` http://localhost:8001/api/notifications/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status: "seen" }),
        }
      );

      if (!response.ok) throw new Error("Failed to mark as read");

      fetchNotifications(filterRef.current);
      fetchCounts();
      window.location.reload();
    } catch (error) {
      console.error("Error marking as read:", error);
    } finally {
      setMarkingAsRead(null);
    }
  };
  // Handles rejection of action-required notifications
  const handleRejectionRequired = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/notifications/reject/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );

      if (!response.ok) throw new Error("Failed to process rejection");

      fetchNotifications(filterRef.current);
      fetchCounts();
      toast.success("❌ Notification is Rejected :(");
      setTimeout(() => {
        navigate("/");
      }, 3000);

     
    } catch (error) {
      console.error("Error processing action:", error);
    }
  };
  // Handles acceptence of action-required notifications
  const handleAcceptRequired = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/notifications/accept/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` Bearer ${accessToken}`,
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );

      if (!response.ok) throw new Error("Failed to process acceptance");
      console.log(id);
      // After accepting, show form modal
      setCurrentNotificationId(id);
      setShowFormModal(true);

      fetchNotifications(filterRef.current);
      fetchCounts();
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

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8001/api/blood-requests/eligibility-form/${currentNotificationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ formData }),
        }
      );

      if (!response.ok) throw new Error("Form submission failed");
      toast.success("✅ Form submitted successfully!");
      setTimeout(() => {
        navigate("/");
      }, 3000);

      setShowFormModal(false);
      setFormData({
        age: "",
        weight: "",
        hadRecentIllness: "",
        onMedication: "",
        recentSurgery: "",
        alcoholUse: "",
        chronicDiseases: "",
        covidExposure: "",
        lastDonationDate: "",
        currentlyPregnant: "",
        consent: "",
      });

      fetchCounts(); // Optional: to refresh counts
    } catch (err) {
      toast.error("❌ Failed to submit form.");
      console.error(err);
    }
  };

  //(**Polling & Initialization**)every 20s, refresh notifications and counts for current tab
  useEffect(() => {
    if (accessToken) {
      fetchNotifications(filter);
      fetchCounts();
      const interval = setInterval(() => {
        fetchNotifications(filterRef.current);
        fetchCounts();
      }, 20000);
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
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6">
          {["all", "active", "seen", "accepted", "rejected", "cancelled"].map(
            (tab) => {
              const isActive = filter === tab;

              // Define color classes for each tab
              const tabColors = {
                all: isActive
                  ? "bg-pink-500 text-white"
                  : "bg-pink-100 text-white-800",
                active: isActive
                  ? "bg-blue-500 text-white"
                  : "bg-blue-100 text-blue-800",
                seen: isActive
                  ? "bg-gray-500 text-white"
                  : "bg-gray-200 text-gray-800",
                accepted: isActive
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800",
                rejected: isActive
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-yellow-800",
                cancelled: isActive
                  ? "bg-purple-600 text-white"
                  : "bg-purple-100 text-purple-800",
              };

              return (
                <button
                  key={tab}
                  onClick={() => handleFilterChange(tab)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${tabColors[tab]}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {tab === "active" && counts.active > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs font-bold">
                      {counts.active > 99 ? "99+" : counts.active}
                    </span>
                  )}
                </button>
              );
            }
          )}
        </div>

        {/* Notification List */}
        {loading ? (
          <p>Loading notifications...</p>
        ) : notifications.length === 0 ? (
          <p>No {filter} notifications.</p>
        ) : (
          <ul className="space-y-4">
            {notifications.map((notif) => {
              // Define colors based on notification status
              const notificationStatusColors = {
                active: notif.isRead
                  ? "bg-blue-50 border-blue-300"
                  : "bg-blue-100 border-blue-500",
                seen: notif.isRead
                  ? "bg-gray-50 border-gray-300"
                  : "bg-gray-200 border-gray-500",
                accepted: notif.isRead
                  ? "bg-green-50 border-green-300"
                  : "bg-green-100 border-green-500",
                rejected: notif.isRead
                  ? "bg-red-50 border-red-300"
                  : "bg-red-100 border-red-500",
                cancelled: notif.isRead
                  ? "bg-purple-50 border-purple-300"
                  : "bg-purple-100 border-purple-500",
              };

              return (
                <li
                  key={notif._id}
                  className={`p-4 border rounded-lg ${
                    notificationStatusColors[notif.status]
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
                          className="ml-4 text-sm bg-red-500 text-white w-32 h-10 px-4 py-2 rounded hover:bg-red-600 disabled:bg-gray-300 flex-shrink-0"
                        >
                          {markingAsRead === notif._id
                            ? "Marking..."
                            : "Mark as read"}
                        </button>
                      )}

                    {notif.type === "action_required" && (
                      <div className="flex gap-4 ml-4">
                        {notif.status === "rejected" ? (
                          <span className="text-lg font-bold text-red-600">
                            Rejected
                          </span>
                        ) : notif.status === "accepted" ? (
                          <span className="text-lg font-bold text-green-600">
                            Accepted
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleRejectionRequired(notif._id)}
                              className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                              Reject
                            </button>
                            <button
                              onClick={() => handleAcceptRequired(notif._id)}
                              className="text-sm bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                              Accept
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-slate-200 border-slate-400 rounded-2xl  w-full max-w-md max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50">
            <h3 className="text-2xl font-bold text-center text-red-600 font-serif">
              Eligibility Form
            </h3>
            <form
              onSubmit={handleSubmitForm}
              className="space-y-5 text-sm sm:text-base"
            >
              <input
                type="number"
                placeholder="Your age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                min={18}
                max={65}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />

              <input
                type="text"
                placeholder="Current weight (kg)"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />

              <select
                value={formData.hadRecentIllness}
                onChange={(e) =>
                  setFormData({ ...formData, hadRecentIllness: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">--Had illness in the last 7 days?--</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              <textarea
                placeholder="Any medication? Mention here."
                value={formData.onMedication}
                onChange={(e) =>
                  setFormData({ ...formData, onMedication: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <select
                value={formData.recentSurgery}
                onChange={(e) =>
                  setFormData({ ...formData, recentSurgery: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">--Surgery in past 6 months?--</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              <select
                value={formData.alcoholUse}
                onChange={(e) =>
                  setFormData({ ...formData, alcoholUse: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">--Alcohol in last 24 hours?--</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              <select
                value={formData.chronicDiseases}
                onChange={(e) =>
                  setFormData({ ...formData, chronicDiseases: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">--Any chronic diseases?--</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              <select
                value={formData.covidExposure}
                onChange={(e) =>
                  setFormData({ ...formData, covidExposure: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">--Exposed to COVID-19 recently?--</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              <input
                type="date"
                value={formData.lastDonationDate}
                onChange={(e) =>
                  setFormData({ ...formData, lastDonationDate: e.target.value })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <select
                value={formData.currentlyPregnant}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentlyPregnant: e.target.value,
                  })
                }
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">--Currently pregnant?--</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent === "Yes"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      consent: e.target.checked ? "Yes" : "No",
                    })
                  }
                  className="w-5 h-5 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-black font-bold"
                >
                  I give my consent to donate blood.
                </label>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-black rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;