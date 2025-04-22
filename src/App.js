import './App.css';
import './index.css';
import AboutPage from './Screen/AboutPage';
import AdventureFinder from './Screen/EventPage';
import Footer from './Screen/Footer';
import TravelPlannerHome from './Screen/HomePage';
import HotelPage from './Screen/HotelPage';
import LocationPage from './Screen/LocationPage';
import Navbar from './Screen/Navbar';
import FindTransportation from './Screen/Transpotation';
import WeatherDetails from './Screen/WeatherDetail';
import Auth from './Screen/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserBookingsPage from './Screen/BookingDetails.js';
import PaymentPage from './Screen/Payment.js';
import PackagesPage from './Screen/PackagePage.js';
import PackageDetailPage from './Screen/PackageDetail.js';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TravelPlannerHome />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/custom-trip" element={<LocationPage />} />
          <Route path="/events" element={<AdventureFinder />} />
          <Route path="/hotels" element={<HotelPage />} />
          <Route path="/transportation" element={<FindTransportation />} />
          <Route path="/weather" element={<WeatherDetails />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/booking" element={<UserBookingsPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          {/* Corrected route for package details */}
          <Route path="/package/:id" element={<PackageDetailPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
