import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiLogOut, FiUser, FiBarChart2, FiTruck, FiHome } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 ease-in-out ${
      isActive
        ? "bg-acme-primary text-white"
        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
    }`;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex-shrink-0 text-2xl font-bold text-acme-primary"
            >
              Dinesh Dashboard
            </NavLink>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" end className={navLinkClass}>
                  <FiHome className="mr-2" /> Overview
                </NavLink>
                <NavLink to="/weight-progress" className={navLinkClass}>
                  <FiBarChart2 className="mr-2" /> Weight
                </NavLink>
                <NavLink to="/shipments" className={navLinkClass}>
                  <FiTruck className="mr-2" /> Shipments
                </NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <span className="text-gray-700 mr-3">
                <FiUser className="inline mr-1" /> Welcome,{" "}
                {user?.name || "User"}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <FiLogOut className="mr-1" /> Logout
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-acme-primary hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-acme-primary">
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
