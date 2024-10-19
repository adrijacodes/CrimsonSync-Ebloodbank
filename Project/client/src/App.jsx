import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Homepage from "./Components/Homepage/Homepage";

export  const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
    <Route path="/" element={<Homepage />}/>
      <Route path="/register" element={<Register />}/>
      
    </Routes>
 
  </BrowserRouter>
  );
}

