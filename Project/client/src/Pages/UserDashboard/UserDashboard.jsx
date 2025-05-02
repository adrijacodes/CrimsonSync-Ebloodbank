import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [donorEnabled, setDonorEnabled] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [bloodType, setBloodType] = useState("O+");
  const [saveMessage, setSaveMessage] = useState("");
  const [updatedCity, setUpdatedCity] = useState("");
  const [updatedState, setUpdatedState] = useState("");
  const [activeTab, setActiveTab] = useState("donor");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
    setSaveMessage(msg);
    setTimeout(() => setSaveMessage(""), duration);
  };

  const updateProfile = async (url, method, body) => {
    try {
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

  const handleSaveLocation = async () => {
    const success = await updateProfile(
      "http://localhost:8001/api/auth/user/profile/update-location",
      "PUT",
      { city: updatedCity, state: updatedState }
    );

    if (success) {
      setUser({ ...user, location: { city: updatedCity, state: updatedState } });
      showMessage("Location updated successfully!");
    } else {
      showMessage("Failed to update location.");
    }

    setIsEditingLocation(false);
  };

  const handleSaveDonorSettings = async () => {
    const success = await updateProfile(
      "http://localhost:8001/api/auth/user/profile/update-donor-status",
      "PATCH",
      { isDonor: donorEnabled }
    );

    showMessage(success ? "Donor status updated!" : "Failed to update donor status");
  };

  const handleSaveAvailability = async () => {
    const success = await updateProfile(
      "http://localhost:8001/api/auth/user/profile/update-availability",
      "PATCH",
      { availability: availability.map((d) => d.toUpperCase()) }
    );

    showMessage(success ? "Availability updated!" : "Failed to update availability");
  };

  const handleSaveBloodType = async () => {
    const success = await updateProfile(
      "http://localhost:8001/api/auth/user/profile/update-blood-type",
      "PUT",
      { bloodType }
    );

    showMessage(success ? "Blood type updated!" : "Failed to update blood type");
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      return showMessage("Fill in both fields.");
    }

    const success = await updateProfile(
      "http://localhost:8001/api/auth/user/profile/update-password",
      "PATCH",
      { currentPassword, newPassword }
    );

    if (success) {
      showMessage("Password updated!");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      showMessage("Failed to update password.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;

    try {
      const res = await fetch("http://localhost:8001/api/auth/user/delete-account", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      localStorage.removeItem("token");
      setUser(null);
      showMessage("Account deleted.");
      setTimeout(() => navigate("/"), 2000); // Wait 2 seconds before redirecting
    } catch {
      showMessage("Failed to delete account.");
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
                isEditingLocation ? handleSaveLocation() : setIsEditingLocation(true)
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
                    availability.includes(day) ? "bg-red-600 text-white" : "bg-gray-300"
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
              {["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
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
              Save Password
            </button>
          </div>
        )}
      </motion.div>

      {/* Delete Account */}
      <button
        onClick={handleDeleteAccount}
        className="mt-6 bg-red-500 text-white py-2 px-4 rounded"
      >
        Delete Account
      </button>

      {/* Save Message */}
      {saveMessage && (
        <div className="mt-4 text-sm text-center text-green-600">{saveMessage}</div>
      )}
    </div>
  );
};

export default Dashboard;
