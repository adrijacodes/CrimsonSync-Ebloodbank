import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Homepage from "./Components/Homepage/Homepage";
import SearchBlood from "./Pages/SearchBlood";
import About from "./Components/About/About";
import ProtectedRoute from "./Components/ProtectedRoute"; 
import SearchEvent from "./Pages/SearchEvent"; 

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/SearchBlood" element={<SearchBlood />} />
        
        {/* Protected Search Event routes for both roles */}
        <Route
          path="/search-event"
          element={
            <ProtectedRoute requiredRole="admin">
              <SearchEvent />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-search-event"
          element={
            <ProtectedRoute requiredRole="user">
              <SearchEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
