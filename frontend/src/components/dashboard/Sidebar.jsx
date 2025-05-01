import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaPenFancy, FaBlog, FaStar, FaKey, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../features/authSlice";
import { clearUser } from "../../features/userSlice";

const Sidebar = ({ components, setComponents }) => {

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);


  const handleLogOut = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:8080/api/v1/users/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      )

      if (!response.data.success) {
        console.error("❌ Logout failed:", response.data.message);
        toast.error(response.data.message || "Logout failed!");
        return;
      }

      dispatch(logout());
      dispatch(clearUser());
      toast.success(response.data.message || "Logged out successfully!");
      navigate("/");

    } catch (error) {
      console.error("❌ Logout Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred while logging out.");
    }
  };

  const navItems = [
    { label: 'My Profile', value: 'Profile', icon: <FaUser />, bgColor: 'bg-blue-900' },
    { label: 'My Blogs', value: 'MyBlog', icon: <FaBlog />, bgColor: 'bg-purple-900' },
    { label: 'Create Blog', value: 'CreateBlog', icon: <FaPenFancy />, bgColor: 'bg-green-900' },
    { label: 'Reviews', value: 'Reviews', icon: <FaStar />, bgColor: 'bg-pink-900' },
    { label: 'Change Password', value: 'ChangePassword', icon: <FaKey />, bgColor: 'bg-blue-900' },
  ];

  const filteredNavItems = navItems.filter(item => {
    if (user.role === 'Reader') {
      return item.value === 'Profile' || item.value === 'ChangePassword';
    }
    return true;
  });

  return (
    <>
      {/* Topbar for Mobile */}
      <div className="md:hidden sticky top-[55px] z-30 bg-white/10 backdrop-blur-md border-b border-white/20 p-3 flex items-center gap-2 overflow-x-auto">
        <img
          src={user?.avatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 shadow"
        />
        {
          filteredNavItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setComponents(item.value)}
              className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition ${components === item.value
                ? 'bg-indigo-500 text-white shadow'
                : `${item.bgColor} text-white opacity-90 hover:opacity-100`
                }`}
            >
              {item.value}
            </button>
          ))
        }
        <button
          onClick={handleLogOut}
          className="px-3 py-1 text-sm rounded-full whitespace-nowrap transition bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-gray-900 text-white h-[calc(100vh-64px)] sticky top-[64px] shadow-md border-r border-gray-800">
        <div className="flex flex-col items-center py-6 px-4 border-b border-gray-800">
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover border-3 border-green-500 mb-3 shadow"
          />
          <h3 className="font-semibold text-lg">{user?.fullName}</h3>
          <p className="text-sm text-gray-400">{user?.email}</p>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 mt-6 space-y-2">
          {filteredNavItems.map((item) => (
            <button
              key={item.value}
              onClick={() => setComponents(item.value)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${components === item.value
                ? 'bg-indigo-500 text-white shadow'
                : `${item.bgColor} text-white opacity-90 hover:opacity-100`
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={handleLogOut}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-red-500 hover:bg-red-600"
          >
            <span className="text-lg"><FaSignOutAlt /></span>
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;



