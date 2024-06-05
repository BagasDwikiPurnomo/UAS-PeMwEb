import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css'; // Import Tailwind CSS

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <div className="text-9xl font-bold text-blue-500">404</div>
        <div className="mt-4 text-2xl font-semibold">Page Not Found</div>
        <div className="mt-2 text-gray-500">The page you are looking for does not exist.</div>
        <Link
          to="/login"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
