import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Donorlist = () => {
  const [activeTab, setActiveTab] = useState('blood');

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="min-h-screen bg-contain bg-center bg-opacity-20" style={{ backgroundImage: "url('../src/assets/blood2.jpg')" }}>
   <div className=" bg-slate-200 border-slate-400 rounded-lg shadow-lg p-6 text-center backdrop-filter backdrop-blur-sm bg-opacity-30"></div>
   {/* Reviews Section */}
         <motion.div
           className="py-8 px-4"
           variants={sectionVariants}
           initial="hidden"
           animate="visible"
           transition={{ duration: 0.8, delay: 0.6 }}
         >
           <h2 className="text-4xl text-center font-bold font-itim mb-6 font-serif">List Of Donors</h2>
           <motion.div
             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
             initial="hidden"
             animate="visible"
             transition={{ staggerChildren: 0.3 }}
           >
             <motion.div
               className="bg-white p-6 rounded-lg shadow-lg"
               variants={itemVariants}
             >
               <p className="text-lg italic">
                 "CrimsonSync made it so easy to find a donor in an emergency. I am
                 forever grateful for this platform."
               </p>
               <p className="mt-4 font-semibold text-right">- Raj Tripathy</p>
             </motion.div>
             <motion.div
               className="bg-white p-6 rounded-lg shadow-lg"
               variants={itemVariants}
             >
               <p className="text-lg italic">
                 "Donating blood has never been simpler. The community here is
                 amazing and supportive."
               </p>
               <p className="mt-4 font-semibold text-right">- Ajoy Sen</p>
             </motion.div>
             <motion.div
               className="bg-white p-6 rounded-lg shadow-lg"
               variants={itemVariants}
             >
               <p className="text-lg italic">
                 "I appreciate the efforts of CrimsonSync. It's a lifeline for so
                 many people."
               </p>
               <p className="mt-4 font-semibold text-right">- Soumili Das</p>
             </motion.div>
           </motion.div>
         </motion.div>
   
         
       </div>
     );
   };
   
   export default Donorlist;