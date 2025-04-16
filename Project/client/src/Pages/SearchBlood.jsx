import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SearchBlood = () => {
    const [location, setLocation] = useState("");
    const [selectedBloodType, setSelectedBloodType] = useState(''); // default: none selected

    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-contain bg-center" style={{ backgroundImage: "url('../src/assets/blood2.jpg')" }}>
      <div className="flex items-center justify-center h-[100vh]">
        <form className="bg-slate-200 border-slate-400 p-8 rounded-3xl shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-50">
        
        <div className="mb-4">
          <label className="block mb-2 text-center text-xl font-serif">Choose Blood Type</label>
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
  {bloodTypes.map((type) => (
    <button
      key={type}
      type="button"
      className={`flex items-center justify-center p-2 rounded cursor-pointer font-serif ${
        selectedBloodType === type
          ? 'bg-red-600 text-white shadow-lg'
          : 'bg-gray-200 text-gray-800'
      }`}
      onClick={() => setSelectedBloodType(type)}
    >
      {type}
    </button>
  ))}
</div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2 text-center text-xl font-serif">Location</label>
          <input
      type="text"
      placeholder="Enter the Location"
      value={location}
      onChange={(e) => setLocation(e.target.value)}
      className="w-full border rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-300"
    />

        </div>
        <Link to={'/Donorlist'}>
        <button type="submit" className="bg-red-500 text-white w-full py-2 rounded">
          Search Donor
        </button>
        </Link>
      </form>
    </div>
    </div>
  );
};

export default SearchBlood;
