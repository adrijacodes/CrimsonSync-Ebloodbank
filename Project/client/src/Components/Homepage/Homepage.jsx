import React, { useState } from 'react';

const HomePage = () => {
  // State to manage toggle between Find Donor and Donate Blood
  const [view, setView] = useState('findDonor');
  
  function toggleDatePicker() {
    const urgencyType = document.getElementById('urgencyType').value;
    const datePicker = document.getElementById('datePicker');
    
    if (['Tomorrow',  'Flexible'].includes(urgencyType)) {
      datePicker.style.display = 'block';
    } else {
      datePicker.style.display = 'none';
    }
  }
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* Title and Intro */}
      <h1 className="text-6xl text-center font-bold text-red-600 mb-6">Welcome to CrimsonSync</h1>
      <p className="text-center text-4xl mb-8 font-semibold">Join the heartbeat of change—find donors, give blood, save lives</p>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 mx-2 ${view === 'findDonor' ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'} rounded-full`}
          onClick={() => setView('findDonor')}
        >
          Find Donor
        </button>
        <button
          className={`px-4 py-2 mx-2 ${view === 'donateBlood' ? 'bg-red-600 text-white' : 'bg-gray-200 text-black'} rounded-full`}
          onClick={() => setView('donateBlood')}
        >
          Donate Blood
        </button>
      </div>

      {/* Conditional Rendering based on view */}
      <div className="mt-8">
        {view === 'findDonor' && <FindDonor />}
        {view === 'donateBlood' && <DonateBlood />}
      </div>
    </div>
  );
};

// Find Donor Component
const FindDonor = () => {
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Find a Blood Donor</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Location:</label>
          <input
            type="text"
            placeholder="Enter your city"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Blood Group:</label>
          <select className="w-full px-4 py-2 border rounded">
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Urgengy Type:</label>
          <select className="w-full px-4 py-2 border rounded" onchange="toggleDatePicker()" >
            <option value="within 2 Hours">within 2 Hours</option>
            <option value="Today">Today</option>
            <option value="Tommorow">Tommorow</option>
            <option value="Flexible">Flexible</option>
            
          </select>
        </div>
        

        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Search Donor
        </button>
      </form>
    </div>
  );
};

// Donate Blood Component
const DonateBlood = () => {
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4 text-red-600">Donate Blood</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2">Your Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Location:</label>
          <input
            type="text"
            placeholder="Enter your city"
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Blood Group:</label>
          <select className="w-full px-4 py-2 border rounded">
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Register as Donor
        </button>
      </form>
    </div>
  );
};

export default HomePage;

