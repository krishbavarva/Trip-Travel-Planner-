import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import defaultPackages from "./DefaultPackage.json"; // Adjust the path if needed

const PackageDetailPage = () => {
  const { id } = useParams(); // Get the package ID from the URL
  const [packageDetail, setPackageDetail] = useState(null);

  useEffect(() => {
    const pkg = defaultPackages.packages.find((pkg) => pkg.id === parseInt(id));
    setPackageDetail(pkg); // Set the package details based on the ID
  }, [id]);

  if (!packageDetail) {
    return <p className="text-center text-lg text-gray-400">Package not found...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-indigo-800 text-white p-8">
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full sm:w-11/12 md:w-3/5 lg:w-2/5 text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-cyan-400">{packageDetail.name}</h1>
        <p className="text-gray-300 text-lg">Destination: <span className="font-semibold">{packageDetail.destination}</span></p>
        <p className="text-gray-300 text-lg">Duration: <span className="font-semibold">{packageDetail.duration} days</span></p>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Events:</h2>
          <div className="space-y-4">
            {packageDetail.events.map((event) => (
              <div key={event.day} className="bg-gray-700 p-4 rounded-xl shadow-md hover:bg-gray-600 transition-all duration-300">
                <h3 className="font-semibold text-xl">Day {event.day}: {event.activity}</h3>
                <p className="text-gray-300">{event.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Accommodation:</h2>
          <p className="text-gray-300">
            <span className="font-semibold">{packageDetail.accommodation.hotel}</span> - {packageDetail.accommodation.rating} stars
          </p>
          <ul className="list-disc pl-5 text-gray-300">
            {packageDetail.accommodation.amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Pricing:</h2>
          <p className="text-gray-300">
            <span className="font-semibold">Adults:</span> {packageDetail.pricing.adults} {packageDetail.pricing.currency}<br />
            <span className="font-semibold">Children:</span> {packageDetail.pricing.children} {packageDetail.pricing.currency}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold text-white mb-4">Inclusions:</h2>
          <ul className="list-disc pl-5 text-gray-300">
            {packageDetail.inclusions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
