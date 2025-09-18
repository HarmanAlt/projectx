import React from 'react';
import React, { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  AcademicCapIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

interface ModernSidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({
  activeSection,
  setActiveSection,
  isOpen,
  setIsOpen
}) => {
  const { user, logout } = useAuth();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon, roles: ['student', 'faculty', 'admin'] },
    { id: 'attendance', label: 'Attendance', icon: ClipboardDocumentCheckIcon, roles: ['student', 'faculty', 'admin'] },
    { id: 'classes', label: 'Classes', icon: CalendarIcon, roles: ['faculty', 'admin'] },
    { id: 'students', label: 'Students', icon: UserGroupIcon, roles: ['faculty', 'admin'] },
    { id: 'faculty', label: 'Faculty', icon: AcademicCapIcon, roles: ['admin'] },
    { id: 'reports', label: 'Reports', icon: DocumentTextIcon, roles: ['faculty', 'admin'] },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon, roles: ['faculty', 'admin'] },
    { id: 'settings', label: 'Settings', icon: CogIcon, roles: ['student', 'faculty', 'admin'] }
  ];

  const filteredItems = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsOpen(false);
  };

  // Close sidebar on Esc key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setIsOpen]);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen) {
      const firstNavButton = document.querySelector('[data-nav-item]') as HTMLButtonElement;
      firstNavButton?.focus();
    }
  }, [isOpen]);

  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleOverlayClick}
        />
      )}

      {/* Sidebar */}
      <div 
        id="sidebar"
        className={`
        fixed top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-md dark:bg-gray-900/60 border-r border-white/10 dark:border-gray-700/40 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 dark:border-gray-700/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] rounded-xl flex items-center justify-center">
              <AcademicCapIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Attendify
              </h2>
              <p className="text-xs text-gray-500 capitalize">{user?.role} Portal</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-2 rounded-lg bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white hover:opacity-90 transition-opacity"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-6 border-b border-white/10 dark:border-gray-700/40">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#6D28D9] to-[#3B82F6] rounded-xl flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {user?.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="font-semibold text-gray-800">{user?.name}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    data-nav-item
                    onClick={() => handleNavigation(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 dark:border-gray-700/40">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-2xl font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ModernSidebar;