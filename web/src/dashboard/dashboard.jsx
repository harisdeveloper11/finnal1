// src/dashboard/dashboard.jsx
import React, { useState } from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile hamburger button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main content */}
      <div className={`flex-1 p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen transition-all duration-300 ${sidebarOpen ? 'ml-64 lg:ml-80' : 'ml-0'} md:ml-64 lg:ml-80`}>
        <div className="md:hidden h-16"></div> {/* Spacer for mobile hamburger */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">Dashboard</h1>
        <Outlet /> {/* Nested routes render here */}
      </div>
    </div>
  );
};

export default Dashboard;
