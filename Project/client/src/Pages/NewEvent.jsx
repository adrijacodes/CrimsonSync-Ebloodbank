import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    date: '',
    location: '',
    city: '',
    venue: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('token');

    try {
      console.log(formData);

      const response = await fetch('https://crimsonsync-ebloodbank.onrender.com/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add event');
      }

      const result = await response.json();
      console.log('Event added:', result);

      toast.success('🤗Event added successfully!');

      setFormData({
        eventName: '',
        date: '',
        location: '',
        city: '',
        venue: '',
        description: '',
      });
    } catch (error) {
      console.error('Error submitting event:', error);
      toast.error('Something went wrong while submitting the event 😥');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-center px-4 bg-white">
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
        </form>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
    </div>
  );
};

export default NewEvent;
