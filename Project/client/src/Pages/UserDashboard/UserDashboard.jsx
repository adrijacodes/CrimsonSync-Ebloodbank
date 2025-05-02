import React, { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { motion } from "framer-motion"; // Import Framer Motion

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:8001/api/auth/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        const userData = data.data.UserInfo[0];

        setUser(userData);
        setBloodType(userData.bloodType || "O+");
        setUpdatedCity(userData.location?.city || "");
        setUpdatedState(userData.location?.state || "");
        setDonorEnabled(userData.isDonor || false);
        setAvailability(userData.availability || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleDay = (day) => {
    setAvailability((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    if (name === "city") setUpdatedCity(value);
    else if (name === "state") setUpdatedState(value);
  };

  const handleSaveLocation = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:8001/api/auth/user/profile/update-location",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            city: updatedCity,
            state: updatedState,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update location");

      setUser({
        ...user,
        location: { city: updatedCity, state: updatedState },
      });
      setSaveMessage("Location updated successfully!");
    } catch (error) {
      setSaveMessage("Failed to update location.");
      console.error("Location update error:", error);
    }

    setTimeout(() => setSaveMessage(""), 3000);
    setIsEditingLocation(false);
  };

  const handleSaveDonorSettings = async () => {
    setSaveMessage("Saving...");
    const accessToken = localStorage.getItem("token");

    try {
      const donorStatusRes = await fetch(
        "http://localhost:8001/api/auth/user/profile/update-donor-status",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ isDonor: donorEnabled }),
        }
      );

      if (!donorStatusRes.ok) throw new Error("Failed to update donor status");

      setSaveMessage("Donor status saved successfully!");
    } catch (err) {
      console.error("Error saving donor status:", err);
      setSaveMessage("Failed to save donor status.");
    }

    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleSaveAvailability = async () => {
    setSaveMessage("Saving...");
    const accessToken = localStorage.getItem("token");

    try {
      const availabilityUppercase = availability.map((day) =>
        day.toUpperCase()
      );

      const res = await fetch(
        "http://localhost:8001/api/auth/user/profile/update-availability",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ availability: availabilityUppercase }),
        }
      );

      if (!res.ok) throw new Error("Failed to update availability");

      setSaveMessage("Availability saved successfully!");
    } catch (err) {
      console.error("Error saving availability:", err);
      setSaveMessage("Failed to save availability.");
    }

    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handleSaveBloodType = async () => {
    setSaveMessage("Saving...");
    const accessToken = localStorage.getItem("token");

    try {
      const res = await fetch(
        "http://localhost:8001/api/auth/user/profile/update-blood-type",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ bloodType }),
        }
      );

      if (!res.ok) throw new Error("Failed to update blood type");

      setSaveMessage("Blood type saved successfully!");
    } catch (err) {
      console.error("Error saving blood type:", err);
      setSaveMessage("Failed to save blood type.");
    }

    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword) {
      setSaveMessage("Please fill in both fields.");
      setTimeout(() => setSaveMessage(""), 3000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "http://localhost:8001/api/auth/user/profile/update-password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update password");

      setSaveMessage("Password updated successfully!");
      setCurrentPassword(""); // Reset current password field
      setNewPassword(""); // Reset new password field
    } catch (err) {
      console.error("Error updating password:", err);
      setSaveMessage("Failed to update password.");
    }

    setTimeout(() => setSaveMessage(""), 3000);
  };
  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible."
    );

    if (confirmation) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "http://localhost:8001/api/auth/user/delete-account",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to delete account");

        localStorage.removeItem("token"); // Remove token from local storage
        setUser(null); // Reset user data
        alert("Your account has been deleted.");
      } catch (err) {
        console.error("Error deleting account:", err);
        alert("Failed to delete account.");
      }
    }
  };
  if (!user) return <p className="p-6 text-center">Loading user profile...</p>;

  return (
    <div className="bg-gray-50 p-6 max-w-4xl mx-auto">
      {/* Profile Section */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md mb-6 flex items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <RxAvatar size={97} className="w-24 h-24 text-black" />
        <div>
          <h2 className="text-2xl font-semibold font-serif text-red-600">
            {user.name}
          </h2>
          <p className="text-sm text-gray-600 font-serif">{user.email}</p>
          <p className="text-sm text-gray-600 font-serif">
            Username: {user.username}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-600 font-serif">
              Location:{" "}
              {isEditingLocation ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="city"
                    value={updatedCity}
                    onChange={handleLocationChange}
                    placeholder="City"
                    className="border p-1 rounded text-sm"
                  />
                  <input
                    type="text"
                    name="state"
                    value={updatedState}
                    onChange={handleLocationChange}
                    placeholder="State"
                    className="border p-1 rounded text-sm"
                  />
                </div>
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
              className="text-red-900 text-sm"
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
        transition={{ duration: 0.5 }}
      >
        <div className="tabs mb-4 flex gap-2">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "donor" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("donor")}
          >
            Donor Settings
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "availability"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("availability")}
          >
            Availability
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "bloodType"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("bloodType")}
          >
            Blood Type
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "password" ? "bg-red-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
        </div>

        {activeTab === "donor" && (
          <div>
            <p className="mb-2">Are you a blood donor?</p>
            <button
              onClick={() => setDonorEnabled(!donorEnabled)}
              className={`py-2 px-4 rounded ${
                donorEnabled ? "bg-red-600" : "bg-gray-300"
              }`}
            >
              {donorEnabled ? "Enabled" : "Disabled"}
            </button>
            <button
              onClick={handleSaveDonorSettings}
              className="bg-red-500 py-2 px-4 rounded text-white mt-4 ml-3"
            >
              Save Donor Status
            </button>
          </div>
        )}

        {activeTab === "availability" && (
          <div>
            <p className="mb-2">Set your availability:</p>
            <div className="flex gap-2 mb-4">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`py-2 px-4 rounded ${
                    availability.includes(day) ? "bg-red-600" : "bg-gray-300"
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
              Save Availability
            </button>
          </div>
        )}

        {activeTab === "bloodType" && (
          <div>
            <p className="mb-2">Select your blood type:</p>
            <select
              value={bloodType}
              onChange={(e) => setBloodType(e.target.value)}
              className="border p-2 rounded mb-4"
            >
              <option value="O+">O+</option>
              <option value="A+">A+</option>
              <option value="B+">B+</option>
              <option value="AB+">AB+</option>
              <option value="O-">O-</option>
              <option value="A-">A-</option>
              <option value="B-">B-</option>
              <option value="AB-">AB-</option>
            </select>
            <button
              onClick={handleSaveBloodType}
              className="bg-red-500 py-2 px-4 rounded text-white ml-3"
            >
              Save Blood Type
            </button>
          </div>
        )}

        {activeTab === "password" && (
          <div>
            <div className="mb-2">
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="bg-red-500 py-2 px-4 rounded text-white"
            >
              Save Password
            </button>
          </div>
        )}
      </motion.div>
      {/* Delete Account Button */}
      <button
        onClick={handleDeleteAccount}
        className="bg-red-500 text-white py-2 px-4 rounded mt-6"
      >
        Delete Account
      </button>
      {saveMessage && (
        <div className="text-center text-sm text-green-600 mt-4">
          {saveMessage}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
