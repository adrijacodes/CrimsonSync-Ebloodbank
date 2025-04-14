import React, { useState } from 'react';

const NewEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    location: '',
    city: '',
    venue: '',
    description: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Event:', formData);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({
      eventName: '',
      date: '',
      location: '',
      city: '',
      venue: '',
      description: '',
    });
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center px-4 bg-red-200">
      <div className="max-w-2xl w-full p-6 bg-white bg-opacity-50 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6 font-serif">Add New Event</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full p-2 border rounded-full"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-full"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-2 border rounded-full"
            required
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full p-2 border rounded-full"
            required
          />
          <textarea
            name="description"
            placeholder="Event Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-serif w-full"
          >
            Submit
          </button>
          {success && <p className="text-green-600 mt-2 text-center font-serif">✅ Event added successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default NewEvent;
