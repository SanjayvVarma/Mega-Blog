import { useState } from 'react';
import LoaderSpin from '../LoaderSpin';
import useLogout from '../../hooks/useLogout';
import { FaUsers, FaEnvelope, FaStar, FaUser, FaSignOutAlt, FaChartBar, FaFileAlt, FaList, FaCog, FaFlag, } from 'react-icons/fa';

const PlatformSidebar = ({ components, setComponents }) => {

  const [isLoading, setIsLoading] = useState(false);
  const logoutUser = useLogout();

  const navItems = [
    { label: 'Dashboard', value: 'AdminPanel', icon: <FaChartBar />, bgColor: 'bg-blue-600' },
    { label: 'All Blogs', value: 'AllBlogs', icon: <FaFileAlt />, bgColor: 'bg-indigo-600' },
    { label: 'Categories', value: 'Categories', icon: <FaList />, bgColor: 'bg-green-600' },
    { label: 'Reviews', value: 'Reviews', icon: <FaStar />, bgColor: 'bg-pink-600' },
    { label: 'Subscribers', value: 'Subscriber', icon: <FaUsers />, bgColor: 'bg-yellow-600' },
    { label: 'Messages', value: 'Message', icon: <FaEnvelope />, bgColor: 'bg-cyan-700' },
    { label: 'Users', value: 'Users', icon: <FaUser />, bgColor: 'bg-red-600' },
    { label: 'Report', value: 'Report', icon: <FaFlag />, bgColor: 'bg-teal-600' },
    { label: 'Settings', value: 'Settings', icon: <FaCog />, bgColor: 'bg-gray-600' },
  ];

  const handleLogout = () => {
    logoutUser({ setIsLoading })
  };

  return (

    <div className="fixed top-25 left-0 md:w-[250px] w-full md:border-r border-blue-500 z-40 h-[65px] md:h-[calc(100vh-100px)] bg-gradient-to-br from-[#586020] via-[#1e1e61] to-[#481906] overflow-y-auto">
      {isLoading && (
        <LoaderSpin text="Logging Out" message="Ending your session, please wait..." />
      )}

      <div className="md:hidden sticky top-13 z-30 border-white/20 p-3 flex items-center gap-2 overflow-x-auto">
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => setComponents(item.value)}
            className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition ${components === item.value ? 'bg-indigo-500 text-white shadow' : `${item.bgColor} text-white opacity-90 hover:opacity-100`}`}
          >
            {item.value}
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="px-3 py-1 text-sm rounded-full whitespace-nowrap transition bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="hidden md:flex flex-col text-white shadow-md">
        <nav className="flex-1 px-4 mt-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setComponents(item.value)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${components === item.value ? 'bg-indigo-500 text-white shadow' : `${item.bgColor} text-white opacity-90 hover:opacity-100`}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-red-500 hover:bg-red-600"
          >
            <span className="text-lg"><FaSignOutAlt /></span>
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default PlatformSidebar;