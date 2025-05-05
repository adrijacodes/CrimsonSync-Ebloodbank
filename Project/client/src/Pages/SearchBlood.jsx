import React, { useState } from 'react';
import bloodImage from '../assets/blood2.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const SearchBlood = () => {
  const [location, setLocation] = useState('');
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [donors, setDonors] = useState([]); // New state for donor results

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('token');
  
    try {
      const response = await fetch('http://localhost:8001/api/blood-requests/search-donors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          bloodType: selectedBloodType,
          city: location,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch donors');
      }
  
      // ✅ Show toast with backend message
      if (data.message) {
        toast.success(data.message);
      }
  
      setDonors(data.donors || []);
  
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Something went wrong');
      setDonors([]);
    }
  };
  
  
  
  

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bloodImage})` }}
    >
      <div className="flex flex-col items-center justify-start min-h-screen pt-20 px-4">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-200 border-slate-400 p-8 rounded-3xl shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50 w-full max-w-3xl"
        >
          <div className="mb-6">
            <label className="block mb-2 text-center text-xl font-serif">
              Choose Your Blood Type
            </label>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {bloodTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  className={`flex justify-center items-center p-2 rounded cursor-pointer font-serif transition-transform duration-200 ${
                    selectedBloodType === type
                      ? 'bg-red-600 text-white shadow-lg scale-105'
                      : 'bg-gray-200 text-gray-800 hover:bg-red-500 hover:text-white'
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

        {/* Donor Results */}
        {donors.length > 0 ? (
          <div className="mt-10 bg-white bg-opacity-80 p-6 rounded-xl shadow-md w-full max-w-3xl">
            <h2 className="text-center text-2xl font-semibold mb-4 font-serif">Available Donors</h2>
            <ul className="space-y-4">
              {donors.map((donor, index) => (
                <li
                  key={index}
                  className="border border-gray-300 rounded-md p-4 flex flex-col md:flex-row justify-between items-start md:items-center"
                >
                  <div>
                    <p className="font-bold">{donor.name}</p>
                    <p className="text-gray-700">Blood Type: {donor.bloodType}</p>
                    <p className="text-gray-700">City: {donor.city}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-10 text-center text-white text-lg font-medium">
            {selectedBloodType && location && 'No donors found for your selection.'}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchBlood;
