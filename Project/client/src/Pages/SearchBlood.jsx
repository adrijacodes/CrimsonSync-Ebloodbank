import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bloodImage from "../assets/blood2.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SearchBlood = () => {
  const [location, setLocation] = useState("");
  const [selectedBloodType, setSelectedBloodType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8001/api/blood-requests/search-blood",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            bloodType: selectedBloodType,
            city: location,
          }),
        }
      );

      const data = await response.json();
      
      if (!response.ok) {
        
        throw new Error(data.message || "Failed to fetch donors");
      }

      if (data.message) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      
      console.error("Error:", error);
      toast.error(error.message || "Something went wrong");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bloodImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
      <div className=" relative z-10 flex flex-col items-center justify-start min-h-screen pt-20 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-md border border-red-500 p-8 rounded-3xl shadow-lg  w-full max-w-3xl"
        >
          <div className="mb-6">
            <label className="block mb-2 text-center text-2xl font-serif">
              Choose Your Blood Type
            </label>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {bloodTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`flex justify-center items-center p-2 rounded cursor-pointer font-serif transition-transform duration-200 ${
                    selectedBloodType === type
                      ? "bg-red-600 text-white shadow-lg scale-105"
                      : "bg-gray-200 text-gray-800 hover:bg-red-500 hover:text-white"
                  }`}
                  onClick={() => setSelectedBloodType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-center text-xl font-serif">
              Location
            </label>
            <input
              type="text"
              placeholder="Enter the Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600 transition duration-200"
          >
            Search Blood
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchBlood;
