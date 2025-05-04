import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [donorEnabled, setDonorEnabled] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [bloodType, setBloodType] = useState("O+");
  const [updatedCity, setUpdatedCity] = useState("");
  const [updatedState, setUpdatedState] = useState("");
  const [activeTab, setActiveTab] = useState("donor");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetch("http://localhost:8001/api/auth/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const { data } = await res.json();
        const userData = data.UserInfo[0];
        setUser(userData);
        setBloodType(userData.bloodType || "O+");
        setUpdatedCity(userData.location?.city || "");
        setUpdatedState(userData.location?.state || "");
        setDonorEnabled(userData.isDonor || false);
        setAvailability(userData.availability || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserProfile();
  }, [token]);

  const showMessage = (msg, duration = 3000) => {
    toast(msg, { autoClose: duration });
  };

  const updateProfile = async (url, method, body) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error();
      return true;
    } catch {
      return false;
    }
  };
  // Location section
  const handleSaveLocation = async () => {
    const response = await fetch(
      "http://localhost:8001/api/auth/user/profile/update-location",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          city: updatedCity,
          state: updatedState,
        }),
      }
    );

    if (response) {
      setUser({
        ...user,
        location: { city: updatedCity, state: updatedState },
      });
      showMessage("Location updated successfully!");
    } else {
      showMessage("Failed to update location.");
    }

    setIsEditingLocation(false);
  };
  // SaveDonor Section
  const handleSaveDonorSettings = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/api/auth/user/profile/update-donor-status",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ isDonor: donorEnabled }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showMessage("Donor status updated!");
      } else {
        showMessage(data.message || "Failed to update donor status");
      }
    } catch (error) {
      console.error("Error updating donor status:", error);
      showMessage("Something went wrong while updating donor status.");
    }
  };

  // Availability section
  const handleSaveAvailability = async () => {
    const token = localStorage.getItem("token");

    const validDays = ["MON", "TUES", "WED", "THURS", "FRI", "SAT", "SUN"];
    const normalizedAvailability = [
      ...new Set(availability.map((d) => d.toUpperCase())),
    ];
    const filteredAvailability = normalizedAvailability.filter((day) =>
      validDays.includes(day)
    );

    console.log("Sending valid availability:", filteredAvailability);

    const response = await fetch(
      "http://localhost:8001/api/auth/user/profile/update-availability",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          availability: filteredAvailability,
        }),
      }
    );

    if (response.ok) {
      showMessage("Availability updated!");
    } else {
      const errorData = await response.json();
      console.error("Error response from backend:", errorData);
      showMessage("Failed to update availability.");
    }
  };

  // SaveBlood section
  const handleSaveBloodType = async () => {
    try {
      const response = await fetch(
        "http://localhost:8001/api/auth/user/profile/update-blood-type",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ bloodType }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showMessage("Blood type updated!");
      } else {
        showMessage(data.message || "Failed to update blood type");
      }
    } catch (error) {
      console.error("Error updating blood type:", error);
      showMessage("Something went wrong while updating blood type.");
    }
  };

  // password change section
  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      return showMessage("Fill in both fields.");
    }

    try {
      const response = await fetch(
        "http://localhost:8001/api/auth/user/profile/update-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showMessage("Password updated!");
        setCurrentPassword("");
        setNewPassword("");
      } else {
        showMessage(data.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      showMessage("Something went wrong while updating password.");
    }
  };

  // Delete account section
  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:8001/api/auth/user/profile/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        showMessage("Account deleted.");

        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("loggedIn");
          setUser(null);
          navigate("/");
        }, 2000);
      } else {
        showMessage("Failed to delete account.");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      showMessage("Something went wrong while deleting account.");
    }
  };

  const toggleDay = (day) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  if (!user) return <p className="text-center p-6">Loading user profile...</p>;

  return (
    <div className="bg-gray-50 p-6 max-w-4xl mx-auto">
      {/* Profile */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <RxAvatar size={97} className="text-black" />
        <div>
          <h2 className="text-2xl font-semibold text-red-600">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-600">Username: {user.username}</p>
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600">
              Location:{" "}
              {isEditingLocation ? (
                <>
                  <input
                    name="city"
                    value={updatedCity}
                    onChange={(e) => setUpdatedCity(e.target.value)}
                    className="border p-1 rounded text-sm"
                    placeholder="City"
                  />
                  <input
                    name="state"
                    value={updatedState}
                    onChange={(e) => setUpdatedState(e.target.value)}
                    className="border p-1 rounded text-sm"
                    placeholder="State"
                  />
                </>
              ) : (
                `${updatedCity.toUpperCase()}, ${updatedState.toUpperCase()}`
              )}
            </p>
            <button
              onClick={() =>
                isEditingLocation
                  ? handleSaveLocation()
                  : setIsEditingLocation(true)
              }
              className="text-sm text-red-900"
            >
              {isEditingLocation ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Settings Tabs */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="mb-4 flex gap-2">
          {["donor", "availability", "bloodType", "password"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 rounded ${
                activeTab === tab ? "bg-red-500 text-white" : "bg-gray-200"
              }`}
            >
              {tab === "donor"
                ? "Donor Settings"
                : tab === "availability"
                ? "Availability"
                : tab === "bloodType"
                ? "Blood Type"
                : "Change Password"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "donor" && (
          <div>
            <p>Are you a blood donor?</p>
            <button
              onClick={() => setDonorEnabled(!donorEnabled)}
              className={`py-2 px-4 rounded ${
                donorEnabled ? "bg-red-600 text-white" : "bg-gray-300"
              }`}
            >
              {donorEnabled ? "Enabled" : "Disabled"}
            </button>
            <button
              onClick={handleSaveDonorSettings}
              className="ml-3 bg-red-500 py-2 px-4 rounded text-white"
            >
              Save
            </button>
          </div>
        )}

        {activeTab === "availability" && (
          <div>
            <p className="mb-2">Select your availability:</p>
            <div className="flex gap-2 mb-4">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`py-2 px-4 rounded ${
                    availability.includes(day)
                      ? "bg-red-600 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <button
              onClick={handleSaveAvailability}
              className="bg-red-500 py-2 px-4 rounded text-white"
            >
              Save
            </button>
          </div>
        )}

        {activeTab === "bloodType" && (
          <div>
            <p className="mb-2">Select your blood type:</p>
            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className="border p-2 rounded"
            >
              {["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"].map(
                (type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                )
              )}
            </select>
            <button
              onClick={handleSaveBloodType}
              className="ml-3 bg-red-500 py-2 px-4 rounded text-white"
            >
              Save
            </button>
          </div>
        )}

        {activeTab === "password" && (
          <div>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border p-2 rounded mb-4 w-full"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border p-2 rounded mb-4 w-full"
            />
            <button
              onClick={handlePasswordChange}
              className="bg-red-500 py-2 px-4 rounded text-white"
            >
              Change Password
            </button>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={handleDeleteAccount}
            className="bg-red-700 py-2 px-4 rounded text-white"
          >
            Delete Account
          </button>
        </div>
      </motion.div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
