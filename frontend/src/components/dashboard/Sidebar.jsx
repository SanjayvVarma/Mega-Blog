import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser, FaPenFancy, FaBlog, FaStar, FaKey, FaSignOutAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { logout } from "../../features/authSlice";
import { clearUser } from "../../features/userSlice";
import axios from 'axios';
import Swal from 'sweetalert2';

const Sidebar = ({ components, setComponents }) => {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.auth.token);

  const handleLogOut = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/logout`,
        {},
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      )

      if (response.data.success) {
        dispatch(logout());
        dispatch(clearUser());
        toast.success(response.data.message || "Logged out successfully!");
        setIsLoading(false)
        navigate("/");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while logging out.");
      setIsLoading(false)
    }
  };

  const handleDeleteProfile = async () => {

    setIsLoading(true)

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your profile!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff',
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/delete-user/${user._id}`,
          { withCredentials: true }
        )

        setIsLoading(false)

        if (res.data.success) {
          dispatch(logout());
          dispatch(clearUser());
          toast.success(res.data.message || "profile deleted")
          navigate('/')
        }

      } catch (error) {
        toast.error(error?.response?.data?.message || "user delete failed")
        setIsLoading(false)
      }
    }

    setIsLoading(false)
  }

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
      {isLoading && (
        <div className='fixed inset-0 backdrop-blur-sm bg-black/10 z-40 flex justify-center items-center'>
          <div className='w-14 h-14 border-4 border-white border-t-red-600 rounded-full animate-spin'></div>
        </div>
      )}

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

        {user.role === "Reader" && (
          <button
            onClick={handleDeleteProfile}
            className="px-3 py-1 text-sm rounded-full whitespace-nowrap transition text-white bg-red-700 hover:bg-red-600"
          >
            DeleteProfile
          </button>
        )}

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

          {user.role === "Reader" && (
            <button
              onClick={handleDeleteProfile}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-red-700 hover:bg-red-600"
            >
              <span className="text-sm"><FaTrash /></span>
              <span>Delete Profile</span>
            </button>
          )}

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



