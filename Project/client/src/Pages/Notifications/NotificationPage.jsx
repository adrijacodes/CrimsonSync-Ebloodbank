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

  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    hadRecentIllness: "No",
    onMedication: "",
    recentSurgery: "No",
    alcoholUse: "No",
    chronicDiseases: "No",
    covidExposure: "No",
    lastDonationDate: "",
    currentlyPregnant: "No",
    consent: "No",
  });

  const [currentNotificationId, setCurrentNotificationId] = useState(null);

  const filterRef = useRef(filter);
  const accessToken = localStorage.getItem("token");

  const playNotificationSound = () => {
    const audio = new Audio(NotificationSound);
    audio
      .play()
      .catch((err) => console.warn("Notification sound failed to play:", err));
  };

  const fetchCounts = async () => {
    try {
      const urls = [
        "notifications",
        "notifications/search?status=active",
        "notifications/search?status=seen",
        "notifications/search?status=cancelled",
        "notifications/search?status=accepted",
        "notifications/search?status=rejected",
      ];
      const [
        allRes,
        activeRes,
        seenRes,
        cancelledRes,
        acceptedRes,
        rejectedRes,
      ] = await Promise.all(
        urls.map((url) =>
          fetch(`http://localhost:8001/api/${url}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          })
        )
      );
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
        all: activeCount + seenCount,
        active: activeCount,
        seen: seenCount,
        cancelled: cancelledData.data?.notifications?.length || 0,
        accepted: acceptedData.data?.notifications?.length || 0,
        rejected: rejectedData.data?.notifications?.length || 0,
      });
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  };

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
          body: JSON.stringify({ status: "seen" }),
        }
      );

      if (!response.ok) throw new Error("Failed to mark as read");

      fetchNotifications(filterRef.current);
      fetchCounts();
    } catch (error) {
      console.error("Error marking as read:", error);
    } finally {
      setMarkingAsRead(null);
    }
  };

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
    } catch (error) {
      console.error("Error processing action:", error);
    }
  };

  const handleAcceptRequired = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8001/api/notifications/accept/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
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

  const handleFilterChange = (status) => {
    setFilter(status);
    filterRef.current = status;
    fetchNotifications(status);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log(currentNotificationId);
      const response = await fetch(
        `http://localhost:8001/api/blood-requests/eligibility-form/${currentNotificationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Form submission failed");

      toast.success("✅ Form submitted successfully!");
      setShowFormModal(false);
      setFormData({ name: "", message: "" });
    } catch (err) {
      toast.error("❌ Failed to submit form.");
      console.error(err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchNotifications(filter);
      fetchCounts();
      const interval = setInterval(() => {
        fetchNotifications(filterRef.current);
        fetchCounts();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [accessToken]);

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

        <div className="flex gap-4 mb-6">
          {["all", "active", "seen", "cancelled", "accepted", "rejected"].map(
            (tab) => (
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
                {tab === "active" && counts.active > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs font-bold">
                    {counts.active > 99 ? "99+" : counts.active}
                  </span>
                )}
              </button>
            )
          )}
        </div>

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
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {showFormModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Submit Form</h3>
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <input
                type="number"
                placeholder="What is your age?"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />

              <input
                type="text"
                placeholder="What is your current weight (in kg)?"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />

              <select
                value={formData.hadRecentIllness}
                onChange={(e) =>
                  setFormData({ ...formData, hadRecentIllness: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="No">
                  Have you had any illness (cold, flu, etc.) in the last 7 days?
                  - No
                </option>
                <option value="Yes">Yes</option>
              </select>

              <textarea
                placeholder="Are you currently on any medication? If yes, please mention."
                value={formData.onMedication}
                onChange={(e) =>
                  setFormData({ ...formData, onMedication: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <select
                value={formData.recentSurgery}
                onChange={(e) =>
                  setFormData({ ...formData, recentSurgery: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="No">
                  Have you undergone any surgery in the past 6 months? - No
                </option>
                <option value="Yes">Yes</option>
              </select>

              <select
                value={formData.alcoholUse}
                onChange={(e) =>
                  setFormData({ ...formData, alcoholUse: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="No">
                  Did you consume alcohol in the past 24 hours? - No
                </option>
                <option value="Yes">Yes</option>
              </select>

              <select
                value={formData.chronicDiseases}
                onChange={(e) =>
                  setFormData({ ...formData, chronicDiseases: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="No">
                  Do you have any chronic diseases (like diabetes,
                  hypertension)? - No
                </option>
                <option value="Yes">Yes</option>
              </select>

              <select
                value={formData.covidExposure}
                onChange={(e) =>
                  setFormData({ ...formData, covidExposure: e.target.value })
                }
                className="w-full p-2 border rounded"
              >
                <option value="No">
                  Have you been exposed to COVID-19 or tested positive recently?
                  - No
                </option>
                <option value="Yes">Yes</option>
              </select>

              <input
                type="date"
                placeholder="When was your last blood donation?"
                value={formData.lastDonationDate}
                onChange={(e) =>
                  setFormData({ ...formData, lastDonationDate: e.target.value })
                }
                className="w-full p-2 border rounded"
              />

              <select
                value={formData.currentlyPregnant}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentlyPregnant: e.target.value,
                  })
                }
                className="w-full p-2 border rounded"
              >
                <option value="No">
                  Are you currently pregnant or gave birth in last 6 months? -
                  No
                </option>
                <option value="Yes">Yes</option>
              </select>

              <select
                value={formData.consent}
                onChange={(e) =>
                  setFormData({ ...formData, consent: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value="No">
                  Do you give your consent to donate blood voluntarily? - No
                </option>
                <option value="Yes">Yes</option>
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
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
