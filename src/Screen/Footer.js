import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <hr className='border-solid border-2 mb-3' />
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Name */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">🌍 Trip Traveler</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400">Home</a>
          <a href="#" className="hover:text-gray-400">Destinations</a>
          <a href="#" className="hover:text-gray-400">Packages</a>
          <a href="#" className="hover:text-gray-400">Contact</a>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400">📷 Instagram</a>
          <a href="#" className="hover:text-gray-400">📘 Facebook</a>
          <a href="#" className="hover:text-gray-400">🐦 Twitter</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs mt-4">
        &copy; {new Date().getFullYear()} Trip Traveler.
      </div>
    </footer>
  );
};

export default Footer;
