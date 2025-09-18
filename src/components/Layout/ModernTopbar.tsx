import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Bars3Icon,
  BellIcon,
  MoonIcon,
  SunIcon,
  MagnifyingGlassIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

interface ModernTopbarProps {
  setSidebarOpen: (open: boolean) => void;
}

const ModernTopbar: React.FC<ModernTopbarProps> = ({ setSidebarOpen }) => {
  const { user } = useAuth();
  const { darkMode, toggleDarkMode } = useApp();

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-expanded={false}
            aria-controls="sidebar"
            aria-label="Toggle navigation"
          >
            <Bars3Icon className="w-6 h-6 text-white" />
          </button>

          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center space-x-2">
            <img src="/logo.png" alt="Attendify" className="w-8 h-8 rounded-lg" />
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Attendify
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, classes..."
                className="pl-10 pr-4 py-2 w-80 text-sm bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {darkMode ? (
              <SunIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <MoonIcon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <BellIcon className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-semibold">3</span>
            </span>
          </button>

          {/* User Profile */}
          <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ModernTopbar;