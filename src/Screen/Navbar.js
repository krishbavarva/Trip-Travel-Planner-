import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleCustomTripClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/custom-trip");
    } else {
      navigate("/auth?redirect=/custom-trip"); // redirect to login then back to custom-trip
    }
    setIsOpen(false);
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-gradient-to-b from-gray-900 to-black shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          Travel Planner
        </Link>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-600">Home</Link>
          <Link to="/packages" className="text-white hover:text-blue-600">Packages</Link>
          <button onClick={handleCustomTripClick} className="text-white hover:text-blue-600">Custom Trip</button>
          <Link to="/about" className="text-white hover:text-blue-600">About</Link>
          <Link to="/contact" className="text-white hover:text-blue-600">Contact</Link>
          <Link to="/booking" className="text-white hover:text-blue-600">Bookings</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/auth" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white">Login</Link>
              <Link to="/auth?mode=register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Register</Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col items-center space-y-4 py-4">
          <Link to="/" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/packages" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Packages</Link>
          <button onClick={handleCustomTripClick} className="hover:text-blue-600">Custom Trip</button>
          <Link to="/about" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/booking" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Bookings</Link>

          {isLoggedIn ? (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-600 hover:text-white"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/auth" className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white">Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
