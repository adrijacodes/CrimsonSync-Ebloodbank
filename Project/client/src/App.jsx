import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Homepage from "./Components/Homepage/Homepage";
import SearchBlood from "./Pages/SearchBlood";
import About from "./Components/About/About";
import ProtectedRoute from "./Components/ProtectedRoute";
import SearchEvent from "./Pages/SearchEvent";

const AppWrapper = () => {
  const location = useLocation();
  const hiddenLayoutRoutes = ["/Login", "/register","/SearchEvent"]; 
  const shouldHideLayout = hiddenLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {!shouldHideLayout && <Navbar />} 

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SearchBlood" element={<SearchBlood />} />
          <Route path="/SearchEvent" element={<SearchEvent />} />
        </Routes>
      </div>

      {!shouldHideLayout && <Footer />} 
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppWrapper />
  </BrowserRouter>
);

export default App;
