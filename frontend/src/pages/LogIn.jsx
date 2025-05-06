import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../features/authSlice';
import { setUser } from '../features/userSlice';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import loginBg from '../assets/loginBg.avif';
import loginImg from '../assets/loginSideImg.webp'
import LoadingBar from 'react-top-loading-bar';

const LogIn = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false)
  const loadingBar = useRef()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isFormValid = username && password && role;

  const handleLogin = async (e) => {
    e.preventDefault();
    loadingBar.current.continuousStart()
    setIsLoading(true)

    const loginData = { password, role };

    if (username.includes("@")) {
      loginData.email = username;
    } else {
      loginData.phone = username;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
        loginData,
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );

      if (!response.data.success) {
        toast.error(response.data.message || "Login failed !");
        setIsLoading(false)
        loadingBar.current.complete();
        return;
      }

      dispatch(login(response.data.data.accessToken));
      dispatch(setUser(response.data.data.user));

      toast.success(response.data.message || "Login successful!");
      navigate('/');
      loadingBar.current.complete();
      setIsLoading(false)

      setUsername('');
      setPassword('');
      setRole('');

    } catch (error) {

      toast.error(error.response?.data?.message || "Login failed!");
      setIsLoading(false)
      loadingBar.current.complete();
      
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-gray-700 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <LoadingBar color="#3b82f6" ref={loadingBar} height={4} />

      {isLoading && (
        <div className='fixed inset-0 backdrop-blur-sm bg-black/10 z-40 flex justify-center items-center'>
          <div className='w-14 h-14 border-4 border-white border-t-green-500 rounded-full animate-spin'></div>
        </div>
      )}

      <div className="bg-gray-900 shadow-lg rounded-lg flex w-full overflow-hidden m-5 max-w-5xl border-2 border-red-600 shadow-lg">

        <div className="hidden md:block w-1/2">
          <img
            src={`${loginImg}`}
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 bg-[#04152D] text-white">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">USER LOGIN</h2>
          <form onSubmit={handleLogin}>

            <div className="mb-4">
              <label className="block text-sm font-medium">Email or Phone</label>
              <input
                type={username.includes("@") ? "email" : "text"}
                placeholder="Enter your email or phone"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-3 mt-1 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
            </div>

            <div className="mb-4 relative">
              <label className="block text-sm font-medium">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full p-3 mt-1 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pr-10"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="absolute top-9 right-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium">Select Role</label>
              <select
                className="w-full p-3 mt-1 border border-gray-500 rounded-md bg-[#04152D] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="" className="bg-[#04152D] text-white" disabled>Select Role</option>
                <option className="bg-[#04152D] text-white" value="Admin">Admin</option>
                <option className="bg-[#04152D] text-white" value="Reader">Reader</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 text-white font-semibold rounded-md transition duration-200 ${isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"
                }`}
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-blue-400 text-sm hover:underline">
              Forgot your password?
            </Link>
          </div>

          <div className="mt-2 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-400 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LogIn;