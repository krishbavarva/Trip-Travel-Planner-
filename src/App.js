import './App.css';
import './index.css';
import AboutPage from './Screen/AboutPage';
import AdventureFinder from './Screen/EventPage';
import Footer from './Screen/Footer';
import  TravelPlannerHome from './Screen/HomePage';
import HotelPage from './Screen/HotelPage';
import LocationPage from './Screen/LocationPage';
import Login from './Screen/Login';
import Navbar from './Screen/Navbar';
import Register from './Screen/Registration';
import FindTransportation from './Screen/Transpotation';
import WeatherDetails from './Screen/WeatherDetail';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
  <>
    {/* <Navbar/> */}
    {/* <TravelPlannerHome/> */}
    {/* <AboutPage/> */}
    {/* <HotelPage/> */}
    {/* <WeatherDetails/> */}
    {/* <FindTransportation/> */}
    {/* <AdventureFinder/> */}
    {/* <Footer/> */}
    {/* <Login/> */}
    {/* <Register/> */}
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<TravelPlannerHome />} />
        <Route path="/custom-trip" element={<LocationPage/>} />
        <Route path="/events" element={<AdventureFinder />} />
        <Route path="/hotels" element={<HotelPage />} />
        <Route path="/transportation" element={<FindTransportation />} />
        <Route path="/weather" element={<WeatherDetails />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
        <Footer/>
    </Router>
  </>
  );
}

export default App;
