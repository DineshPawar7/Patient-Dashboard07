import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <footer className="bg-white shadow-inner py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Dinesh Pawar. All rights reserved.
      </footer>
    </div>
  );
};

export default DashboardLayout;