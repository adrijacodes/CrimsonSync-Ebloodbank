import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const FindDonor = () => {
    const [donornDate, setDonordate] = useState(new Date());
  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-4xl text-center font-bold text-red-600 mb-6">Find a Blood Donor</h1>
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
          <label className="block mb-2">Urgency Type:</label>
          <select className="w-full px-4 py-2 border rounded">
            <option value="Within 2 Hours">Within 2 Hours</option>
            <option value="Today">Today</option>
            <option value="Tommorow">Tommorow</option>
            <option value="Flexible">Flexible</option>
          </select> 
        </div>

        <div className="mb-4">
          <label className="block mb-2">Select Donation Date:</label>
          <DatePicker
            selected={donornDate}
            onChange={(date) => setDonordate(date)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>
    </div>
  );
};

export default FindDonor;
