import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Homepage from "./Components/Homepage/Homepage";
import DonateBlood from "./Pages/DonateBlood/DonateBlood";
import Profile from "./Pages/UserProfile/Profile";
import ChooseDonor from "./Pages/ChooseDonor/ChooseDonor";
import FindDonor from "./Pages/FindDonor/FindDonor";

export  const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Homepage />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/finddonor" element={<FindDonor />}/>
      <Route path="/donateblood" element={<DonateBlood/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/choosedonor" element={<ChooseDonor />}/>
    </Routes>
 
  </BrowserRouter>
  );
}

