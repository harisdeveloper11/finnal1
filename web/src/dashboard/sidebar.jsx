// src/dashboard/sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`w-64 lg:w-80 h-screen bg-gray-900 text-white fixed left-0 top-0 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:z-auto`}>
        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h1 className="text-2xl font-bold text-center py-6">Admin Panel</h1>
        <ul className="space-y-4 px-4">
          <li>
            <Link to="/dashboard" className="hover:bg-gray-700 block px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Dashboard</Link>
          </li>
          <li>
            <Link to="/dashboard/products" className="hover:bg-gray-700 block px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Products</Link>
          </li>
          <li>
            <Link to="/dashboard/orders" className="hover:bg-gray-700 block px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Orders</Link>
          </li>
          <li>
            <Link to="/dashboard/users" className="hover:bg-gray-700 block px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Users</Link>
          </li>
          <li>
            <Link to="/dashboard/contacts" className="hover:bg-gray-700 block px-4 py-2 rounded" onClick={() => setIsOpen(false)}>Contacts</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
