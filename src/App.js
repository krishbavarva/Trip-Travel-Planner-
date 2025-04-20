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
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
