import React from "react";
import { FaPlus, FaSignOutAlt } from "react-icons/fa"; // Using react-icons for the icons

interface HeaderProps {
  username: string;
  setShowAddBookPopup: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  username,
  setShowAddBookPopup,
  handleLogout,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 px-4">
      {/* Left section (user info) */}
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <div className="w-16 h-16 sm:w-12 sm:h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl sm:text-xl font-bold shadow-lg">
          {username?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Welcome, {username}!
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Manage your personal bookshelf.
          </p>
        </div>
      </div>

      {/* Right section (buttons) */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-x-4 sm:space-y-0">
        {/* Add New Book Button */}
        <button
          className="w-full sm:w-auto px-6 py-3 sm:px-4 sm:py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
          onClick={() => setShowAddBookPopup(true)}
        >
          {/* Desktop: text, Mobile: icon */}
          <span className="hidden sm:inline">+ Add New Book</span>
          <FaPlus className="sm:hidden text-2xl" />
        </button>

        {/* Logout Button */}
        <button
          className="w-full sm:w-auto px-6 py-3 sm:px-4 sm:py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-all"
          onClick={handleLogout}
        >
          {/* Desktop: text, Mobile: icon */}
          <span className="hidden sm:inline">Logout</span>
          <FaSignOutAlt className="sm:hidden text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Header;
