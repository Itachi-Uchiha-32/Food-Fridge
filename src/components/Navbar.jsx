import React, { useEffect, useState, useContext } from 'react';
import { Link, NavLink } from 'react-router';
import userProfile from '../../public/user.png';
import { toast, ToastContainer } from 'react-toastify';
import { AuthContext } from '../context/AuthContext/AuthContext';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isTop, setIsTop] = useState(true);
  const [isNameVisible, setIsNameVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsTop(window.scrollY === 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.warning('Logged Out'))
      .catch((error) => console.error(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" end className={({ isActive }) => isActive ? "underline underline-offset-4 text-orange-300" : undefined}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-products" className={({ isActive }) => isActive ? "underline underline-offset-4 text-orange-300" : undefined}>All Products</NavLink>
      </li>
      <li>
        <NavLink to="/fridge" className={({ isActive }) => isActive ? "underline underline-offset-4 text-orange-300" : undefined}>Fridge</NavLink>
      </li>
      {user && (
        <>
          <li><NavLink to="/addFood" className={({ isActive }) => isActive ? "underline underline-offset-4 text-orange-300" : undefined}>Add Food</NavLink></li>
          <li><NavLink to="/my-items" className={({ isActive }) => isActive ? "underline underline-offset-4 text-orange-300" : undefined}>My Items</NavLink></li>
        </>
      )}
    </>
  );

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isTop ? 'bg-orange-500' : 'bg-gradient-to-r from-orange-400 to-orange-600 shadow-md'}`}>
      
      <ToastContainer />
      
      <div className="container mx-auto px-4 navbar">
        
        {/* Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow rounded-box w-52 text-green-100 font-medium bg-gradient-to-b from-orange-500 to-orange-700 z-50">
              {navLinks}
            </ul>
          </div>
          <h1 className="text-2xl font-semibold text-white cursor-pointer select-none">
            Food<span className="text-orange-200">Fridge</span>
          </h1>
        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white font-medium">
            {navLinks}
          </ul>
        </div>

        {/* End */}
        <div className="navbar-end flex items-center gap-4">
          {!user ? (
            <div className="flex gap-3">
              <Link to="/auth/login">
                <button className="btn bg-white text-orange-500 border-none hover:bg-orange-200 font-medium rounded-full">Login</button>
              </Link>
              <Link to="/auth/register">
                <button className="btn border border-white hover:bg-white hover:text-orange-500 text-white font-medium rounded-full">Register</button>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogOut}
                className="btn bg-white text-orange-500 hover:bg-orange-200 font-medium rounded-full"
              >
                Logout
              </button>
              <div className="relative group">
                <img
                  src={user.photoURL || userProfile}
                  alt="user"
                  className="w-12 h-12 rounded-full border-2 border-orange-300 cursor-pointer"
                  onClick={() => setIsNameVisible((prev) => !prev)}
                />
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 rounded bg-neutral text-orange-200 text-sm z-10 whitespace-nowrap transition-opacity duration-300 font-normal
                  ${isNameVisible ? 'opacity-100' : 'opacity-0 lg:group-hover:opacity-100'}`}>
                  {user.displayName || 'No Name'}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
