import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaBars } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function Nav() {
  const { user } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  let location = useLocation();
  console.log("location", location.pathname);

  const handleToggle = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Implement later
  // const closeMenu = () => {
  //   setMobileMenuOpen(false);
  // };

  return (
    <nav className="bg-gray-200">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex justify-between">
          <div className="flex space-x-3">
            {/* logo */}
            <div className="flex items-center py-4 px-1  text-gray-700 hover:text-gray-900">
              <Link to="/">Logo</Link>
            </div>

            {/* primary nav */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                className="py-4 px-1 text-black text-gray-700 hover:text-gray-900"
                to="/weeks"
              >
                Treatment Plan
              </Link>
            </div>
          </div>
          {/* secondary nan */}
          <div className="hidden md:flex items-center space-x-1">
            <Link className="py-5 px-1" to="/profile">
              Profile
            </Link>
            {user ? (
              <Link
                className="py-1 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-800 hover:text-yellow-800 rounded shadow transition duration-400"
                to="/"
                onClick={logout}
              >
                logout
              </Link>
            ) : (
              <Link
                className="py-1 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-800 hover:text-yellow-800 rounded shadow transition duration-400"
                to="/login"
              >
                login
              </Link>
            )}
          </div>

          {/* Mobile button goes here */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleToggle}
              className="mobile-menu-button"
              type=""
            >
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu*/}
      <div className="md:hidden">
        <Link
          className={`mobile-menu ${
            mobileMenuOpen
              ? "block py-2 px-4 text-sm hover:bg-gray-300"
              : "hidden block py-2 px-4 text-sm hover:bg-gray-300"
          }`}
          to="/weeks"
        >
          Treatment Plan
        </Link>
        <Link
          className={`mobile-menu ${
            mobileMenuOpen
              ? "block py-2 px-4 text-sm hover:bg-gray-300"
              : "hidden block py-2 px-4 text-sm hover:bg-gray-300"
          }`}
          to="/profile"
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Nav;

{
  /* <p>{user.email}</p> */
}
