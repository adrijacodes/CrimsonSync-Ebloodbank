import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FindDonor = () => {
    const [donorDate, setDonorDate] = useState(new Date());
    const [location, setLocation] = useState('');
    const [state, setState] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [urgency, setUrgency] = useState('Flexible');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
    
        const formData = { location, state, bloodGroup, urgency, donorDate };
    
        try {
            const res = await fetch("http://localhost:8001/api/searchDonors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const data = await res.json();
            console.log(data);
    
            if (!data.success) {
                setError(data.message);
                setLoading(false);
                return;
            }
            
            // Navigate to the Choose Donor page and pass the donor data
            navigate('/choosedonor', { state: { donors: data.donors } });
        } catch (error) {
            console.error("Fetch error:", error);
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md p-5 bg-white shadow-md rounded">
                <h1 className="text-4xl text-center font-bold text-red-600 mb-6">Find Blood Donor</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Enter your city"
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">State:</label>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="Enter your state"
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Blood Group:</label>
                        <select
                            value={bloodGroup}
                            onChange={(e) => setBloodGroup(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                        >
                            <option value="" disabled>Select your blood group</option>
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
                        <label className="block mb-2">Urgency Type:</label>
                        <select
                            value={urgency}
                            onChange={(e) => setUrgency(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                        >
                            <option value="Within 2 Hours">Within 2 Hours</option>
                            <option value="Today">Today</option>
                            <option value="Tomorrow">Tomorrow</option>
                            <option value="Flexible">Flexible</option>
                        </select>
                    </div>
                   
                    <div className="mb-4">
                        <label className="block mb-2">Select Donation Date:</label>
                        <DatePicker
                            selected={donorDate}
                            onChange={(date) => setDonorDate(date)}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    
                    <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded w-full" disabled={loading}>
                        {loading ? "Searching..." : "Search"}
                    </button>
                    {error && <p className="text-red-600 mt-4">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default FindDonor;
