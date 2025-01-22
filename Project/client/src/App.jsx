import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Homepage from "./Components/Homepage/Homepage";
import FindDonor from "./Pages/FindDonor";
import DonateBlood from "./Pages/DonateBlood/DonateBlood";
import About from "./Components/About/About";




const App = () => {
  return (
    
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Homepage />}/>
    <Route path="/" element={<About />}/>
    <Route path="/register" element={<Register />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/finddonor" element={<FindDonor />}/>
      <Route path="/donateblood" element={<DonateBlood/>}/>
    </Routes>
 
  </BrowserRouter>
  
  );
};

export default App;
