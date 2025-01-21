import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';


const HomePage = () => {
  return (
    <div className="min-h-screen bg-white p-5">
     
      <h1 className="text-6xl text-center font-bold">
        <span className="text-red-600 font-Alkatra">Welcome to </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-white animate-blood-flow font-Alkatra">
          CrimsonSync
        </span>
      </h1>
      <p className="text-center text-3xl font-semibold mb-8 font-Alkatra">Join the heartbeat of change—find donors, give blood,save lives.</p>

    </div>
  );
};

export default HomePage;
