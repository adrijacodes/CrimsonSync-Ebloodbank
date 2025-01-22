import React from 'react';

const About = () => {
  return (
     
   <div className="bg-gray-100 py-10 px-5 md:px-20">
   <div className="max-w-4xl mx-auto text-center">
     <h1 className="text-4xl font-bold text-gray-800 mb-5">About Us</h1>
     <p className="text-lg text-gray-600 leading-relaxed">
       Welcome to [Your Company]. We are committed to delivering high-quality products and services to meet the diverse needs of our customers. Our mission is to innovate and create solutions that make a positive impact on the world.
     </p>
   </div>

   <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
     <div className="bg-white rounded-lg shadow-lg p-6 text-center">
       <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
       <p className="text-gray-600 mt-3">
         To provide exceptional services that bring value and exceed expectations.
       </p>
     </div>

     <div className="bg-white rounded-lg shadow-lg p-6 text-center">
       <h2 className="text-2xl font-semibold text-gray-800">Our Vision</h2>
       <p className="text-gray-600 mt-3">
         To be a global leader in our industry and set the standard for quality and innovation.
       </p>
     </div>

     <div className="bg-white rounded-lg shadow-lg p-6 text-center">
       <h2 className="text-2xl font-semibold text-gray-800">Our Values</h2>
       <p className="text-gray-600 mt-3">
         Integrity, Excellence, and Customer Focus are the pillars that guide us.
       </p>
     </div>
   </div>
 </div>


    
  )
}

export default About;