    import React, { useState, useEffect } from "react";
    import { Link } from "react-router-dom";
    import defaultPackages from "./DefaultPackage.json"; // Adjust the path if needed

    const PackagesPage = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        // Check if the JSON data is correctly loaded and has the `packages` array
        if (defaultPackages && Array.isArray(defaultPackages.packages)) {
        setPackages(defaultPackages.packages); // Set the packages state to the array
        } else {
        console.error("Packages data is not an array or not available.");
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 bg-opacity-70 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-11/12 sm:w-4/5 md:w-3/5 lg:w-2/5 text-center space-y-6">
            <h1 className="text-4xl font-bold text-cyan-400">Available Packages</h1>
            
            {packages.length === 0 ? (
            <p className="text-gray-400">Loading packages...</p>
            ) : (
            packages.map((pkg) => (
                <div
                key={pkg.id}
                className="bg-gray-700 bg-opacity-80 rounded-lg p-6 shadow-xl hover:shadow-2xl hover:bg-gray-600 transition-all duration-300 ease-in-out"
                >
                <h2 className="text-2xl font-bold text-white">{pkg.name}</h2>
                <p className="text-gray-300">Destination: {pkg.destination}</p>
                <p className="text-gray-300">Duration: {pkg.duration} days</p>
                <div className="mt-4">
                    <Link
                    to={`/package/${pkg.id}`}
                    className="px-8 py-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 hover:scale-105 transition-all duration-300"
                    >
                    View Details
                    </Link>
                </div>
                </div>
            ))
            )}
        </div>
        </div>
    );
    };

    export default PackagesPage;
