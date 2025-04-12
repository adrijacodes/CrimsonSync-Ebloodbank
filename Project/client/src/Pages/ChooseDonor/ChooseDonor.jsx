import React from 'react';
import { useLocation } from 'react-router-dom';

const ChooseDonor = () => {
    const location = useLocation();
    const donors = location.state?.donors || []; // Retrieve donors from state

    return (
        <div className="min-h-screen bg-gray-100 p-5">
            <h1 className="text-4xl text-center font-bold text-red-600 mb-6">Choose a Blood Donor</h1>
            {donors.length > 0 ? (
                <ul className="space-y-4">
                    {donors.map(donor => (
                        <li key={donor.id} className="bg-white p-4 shadow rounded">
                            <p><strong>Name:</strong> {donor.name}</p>
                            <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                            <p><strong>Location:</strong> {donor.location.city}, {donor.location.state}</p>
                            {/* You can add more donor details here if needed */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No donors found matching your criteria.</p>
            )}
        </div>
    );
};

export default ChooseDonor;
