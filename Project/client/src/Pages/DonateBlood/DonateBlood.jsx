


const DonateBlood = () => {
 

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-5 bg-white shadow-md rounded">
      <h1 className="text-4xl  text-center font-bold text-red-600 mb-6">Donate Blood</h1>
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
          <label className="block mb-2">State:</label>
          <input
            type="text"
            placeholder="Enter your state"
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
    </div>
  );
}

export default DonateBlood;
