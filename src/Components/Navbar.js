import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { Clapperboard } from "lucide-react";
import user from "../store/user";
import EditAccount from './EditAccount'

const Navbar = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const renderAuthButtons = () => {

    const handleMenuOptionClick = () => {
      setProfileOpen(false); 
    };

    if (auth.username) {
      return (
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="block border-2 border-gray-600 focus:outline-none focus:border-white"
          >
            Welcome {auth.username}
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg py-2 shadow-md z-10">
              <Link
                to="/favorites"
                onClick={() => handleMenuOptionClick()}
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                My Favorites
              </Link>
              <div>
              <Link to='/editAccount'
              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >Edit Account</Link><br />
            </div>
              <button
                onClick={() => {
                  dispatch(logout())
                  handleMenuOptionClick()
                }}
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div>
          <Link
            to="/login"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Login
          </Link>
        </div>
      );
    }
  };

  return (
    <nav className="flex items-center justify-between flex-wrap p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="flex font-semibold text-xl tracking-tight">
          <Clapperboard />
          <Link to="/">Reel Relations</Link>
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 border rounded text-white-200 border-white-400 hover:text-white hover:border-teal-400"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div></div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } w-full lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <Link
            to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            About
          </Link>
          <Link
            to="/casts/85"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Single Actor
          </Link>
          <Link
            to="/movie/10196"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Single Movie
          </Link>
        </div>
        {renderAuthButtons()}
      </div>
    </nav>
  );
};

export default Navbar;
