import React from 'react';
import blood2 from "../../assets/blood2.jpg"
const About = () => {
  return (
     
   <div className="min-h-screen bg-contain bg-center bg-opacity-20" style={{ backgroundImage: `url(${blood2})` }}>
   <div className=" bg-slate-200 border-slate-400 rounded-lg shadow-lg p-6 text-center backdrop-filter backdrop-blur-sm bg-opacity-30">
     <h1 className="text-4xl font-bold font-serif text-gray-800 mb-5">About Us</h1>
     <p className="text-lg text-black font-serif font-semibold leading-relaxed">
       Welcome to CrimsonSync-Ebloodbank.
     </p>
     <p className="text-lg text-black font-serif font-semibold leading-relaxed">
      We are committed to delivering high-quality products and services to meet the diverse needs of our customers. Our mission is to innovate and create solutions that make a positive impact on the world.
     </p>
   </div>

   

   <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
     <div className="bg-slate-200 border-slate-400 rounded-lg shadow-lg p-6 text-center backdrop-filter backdrop-blur-sm bg-opacity-50">
       <h2 className="text-2xl font-bold text-red-600">🎯 Our Mission</h2>
       <p className="text-gray-800 font-semibold mt-3">
         To provide exceptional services that bring value and exceed expectations.
       </p>
     </div>

     <div className="bg-slate-200 border-slate-400 rounded-lg shadow-lg p-6 text-center backdrop-filter backdrop-blur-sm bg-opacity-50">
       <h2 className="text-2xl font-bold text-red-600">📝 Our Story</h2>
       <p className="text-gray-800 font-semibold mt-3">
       We started with a simple idea — to create something meaningful that brings value to people’s lives.
       </p>
     </div>

     <div className="bg-slate-200 border-slate-400 rounded-lg shadow-lg p-6 text-center backdrop-filter backdrop-blur-sm bg-opacity-50">
       <h2 className="text-2xl font-bold text-red-600">✨ Our Vision</h2>
       <p className="text-gray-800 font-semibold mt-3">
         To be a global leader in our industry and set the standard for quality and innovation.
       </p>
     </div>

     <div className="bg-slate-200 border-slate-400 rounded-lg shadow-lg p-6 text-center backdrop-filter backdrop-blur-sm bg-opacity-50">
       <h2 className="text-2xl font-bold text-red-600">💡 Our Values</h2>
       <p className="text-gray-800 font-semibold mt-3">
         Integrity, Empathy, and Customer Focus are the pillars that guide us.
       </p>
     </div>

     <div className="bg-slate-200 border-slate-400 rounded-lg shadow-lg p-6 text-center backdrop-filter backdrop-blur-sm bg-opacity-50">
       <h2 className="text-2xl font-bold text-red-600">🌐 Global Impact</h2>
       <p className="text-gray-800 font-semibold mt-3">
       We’re proud to serve communities around the world and support causes that make a difference.
       </p>
     </div>

     <div className="bg-slate-200 border-slate-400 rounded-lg shadow-lg p-6 text-center backdrop-filter backdrop-blur-sm bg-opacity-50">
       <h2 className="text-2xl font-bold text-red-600">🏆 Our Excellence</h2>
       <p className="text-gray-800 font-semibold mt-3">
       We pursue the highest standards in everything we do.
       </p>
     </div>

     
   </div>
 </div>


    
  )
}

export default About;