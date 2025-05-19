import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, NavLink, } from 'react-router-dom';

const Navbar = () => {

  const [toggleIcon, setToggleIcon] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth)
  const user = useSelector((state) => state.user.user)

  const handleToggleIcon = () => {
    setToggleIcon(!toggleIcon)
  };

  return (
    <div className="bg-gradient-to-br from-[#2b2b7f] via-[#1b1b32] to-[#591091] text-white shadow-md py-2 px-10 flex justify-between items-center z-10 relative border-b border-blue-600">

      <Link to='/' className="relative flex items-center h-11 rounded-full text-lg md:text-xl font-extrabold bg-gradient-to-r from-[#145603] via-[#125f59] to-[#860830] p-1 borderAnimation border-2">
        <span className="relative z-10 left-6 bottom-3 text-green-500">SK</span>
        <span className="absolute left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">💖</span>
        <span className="relative z-10 text-blue-300 right-3 top-2" >BLOG</span>
      </Link>

      <div className="flex items-center gap-5 md:hidden">

        {isAuth ? (
          <div className="flex gap-4 items-center">
            <Link to="/dashboard">
              <div className="p-0.5 rounded-full border-2 borderAnimation">
                <img
                  src={user.avatar}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
              </div>
            </Link>
          </div>
        ) : (
          <Link
            to="/login"
            className="py-1 px-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300 text-sm"
          >
            Login
          </Link>
        )}

        <div onClick={handleToggleIcon}>
          {toggleIcon ? <HiX size={28} /> : <FaBars size={28} />}
        </div>
      </div>

      <div className={`fixed top-13 right-0 h-full w-1/3 bg-[#04152D] shadow-md md:static md:w-auto md:bg-transparent md:shadow-none transition-transform duration-300 ease-in-out ${toggleIcon ? "translate-x-0" : "translate-x-full"} md:translate-x-0 md:flex md:items-center md:gap-5`} >

        <ul className="flex flex-col md:flex-row md:gap-3 text-lg text-white text-center py-6 px-6 md:p-0">

          <li className="border-b border-yellow-400 last:border-none md:border-none">
            <NavLink
              to='/'
              className={({ isActive }) =>
                `block px-2 py-3 transition-all duration-200 rounded-md ${isActive ? "text-blue-500" : "text-white"
                } hover:text-blue-400 font-bold`
              }
              onClick={handleToggleIcon}
            >
              Home
            </NavLink>
          </li>

          {(isAuth && user) && (
            <li className="border-b border-yellow-400 last:border-none md:border-none">
              <NavLink
                to='/blogs'
                className={({ isActive }) =>
                  `block px-2 py-3 transition-all duration-200 rounded-md ${isActive ? "text-blue-500" : "text-white"
                  } hover:text-blue-400 font-bold`
                }
                onClick={handleToggleIcon}
              >
                Blogs
              </NavLink>
            </li>
          )}
          <li className="border-b border-yellow-400 last:border-none md:border-none">
            <NavLink
              to='/authors'
              className={({ isActive }) =>
                `block px-2 py-3 transition-all duration-200 rounded-md ${isActive ? "text-blue-500" : "text-white"
                } hover:text-blue-400 font-bold`
              }
              onClick={handleToggleIcon}
            >
              Authors
            </NavLink>
          </li>

          <li className="border-b border-yellow-400 last:border-none md:border-none">
            <NavLink
              to='/about'
              className={({ isActive }) =>
                `block px-2 py-3 transition-all duration-200 rounded-md ${isActive ? "text-blue-500" : "text-white"
                } hover:text-blue-400 font-bold`
              }
              onClick={handleToggleIcon}
            >
              About
            </NavLink>
          </li>

          <li className="border-b border-yellow-400 md:border-none">
            <NavLink
              to='/contact'
              className={({ isActive }) =>
                `block px-2 py-3 transition-all duration-200 rounded-md ${isActive ? "text-blue-500" : "text-white"
                } hover:text-blue-400 font-bold`
              }
              onClick={handleToggleIcon}
            >
              Contact
            </NavLink>
          </li>

        </ul>

        <div className="hidden md:flex mt-4 md:mt-0 mx-2 items-center gap-2 justify-center">

          {isAuth ? (
            <div className="flex gap-4 items-center">
              <Link to="/dashboard">
                <div className="p-0.5 rounded-full borderAnimation border-2">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                </div>
              </Link>
            </div>

          ) : (
            <Link
              to="/login"
              className="py-1 px-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

    </div >

  )
}

export default Navbar;