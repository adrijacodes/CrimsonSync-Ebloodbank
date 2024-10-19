import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Homepage from "./Components/Homepage/Homepage";
import FindDonor from "./Pages/FindDonor";
import DonateBlood from "./Pages/DonateBlood/DonateBlood";

export  const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Homepage />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/finddonor" element={<FindDonor />}/>
      <Route path="/donateblood" element={<DonateBlood/>}/>
    </Routes>
 
  </BrowserRouter>
  );
}

