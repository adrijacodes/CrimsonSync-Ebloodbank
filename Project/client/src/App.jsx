import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Homepage from "./Components/Homepage/Homepage";
import SearchBlood from "./Pages/SearchBlood";
import About from "./Components/About/About";
import SearchEvent from "./Pages/SearchEvent";
import NewEvent from "./Pages/NewEvent";
import EventDetails from "./Pages/EventDetails";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./Pages/UserDashboard/UserDashboard";
import { ToastContainer } from "react-toastify";
import ViewEvent from "./Pages/ViewEvent";
import Faq from "./Pages/Faq";
import HowItWorks from "./Pages/HowItWorks";
import EventsCityYearChart from "./Pages/EventsByCityYear";
import UserList from "./Pages/UserList";
import UserSearch from "./Pages/UserSearch";
import AdminList from "./Pages/AdminList";
import AdminSearch from "./Pages/AdminSearch";
import AdminProfile from "./Pages/AdminProfile";

import "react-toastify/dist/ReactToastify.css";
import NotificationPage from "./Pages/Notifications/NotificationPage";

const AppWrapper = () => {
  const location = useLocation();

  const hiddenLayoutRoutes = ["/login", "/register"];
  const hideLayoutForPattern = /^\/event\/\d+$/;

  const shouldHideLayout =
    hiddenLayoutRoutes.includes(location.pathname) || hideLayoutForPattern.test(location.pathname);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {!shouldHideLayout && <Navbar />}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/SearchBlood" element={<SearchBlood />} />
          <Route path="/SearchEvent" element={<SearchEvent />} />
          <Route path="/NewEvent" element={<NewEvent />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/view-event" element={<ViewEvent />} />
          <Route path="/event-by-city-year" element={<EventsCityYearChart />} />
          <Route path="/user-list" element={<UserList />} />
          <Route path="/search-user" element={<UserSearch />} />
          <Route path="/admin-list" element={<AdminList />} />
          <Route path="/search-admin" element={<AdminSearch />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/notification" element={<NotificationPage/>} />
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
