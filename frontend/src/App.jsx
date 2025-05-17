import './App.css';
import axios from 'axios';
import Home from './pages/Home';
import About from './pages/About';
import LogIn from './pages/LogIn';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Register from './pages/Register';
import AllAdmin from './pages/AllAdmin';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';
import SingleBlog from './pages/SingleBlog';
import UpdateBlog from './pages/UpdateBlog';
import { login } from './features/authSlice';
import { setUser } from './features/userSlice';
import PageNotFound from './pages/PageNotFound';
import { Routes, Route } from 'react-router-dom';
import UpdateProfile from './pages/UpdateProfile';
import ForgotPassword from './pages/ForgotPassword';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs, setPages } from './features/blogSlice';

function App() {

  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/current-user`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(login());
          dispatch(setUser(res.data.data));
        } else {
          toast.error(res.data.message || "Not logged in");
        }
      } catch (err) {
        if (err?.response?.status !== 401) {
          toast.error(err?.response?.data.message || "Something went wrong");
        }
      }
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {

    const fetchBlogs = async () => {

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/all-blogs?page=${page}&limit=12`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setBlogs(res.data.data.blogs));
          dispatch(setPages(res.data.data.totalPages))
        }

      } catch (err) {
        toast.error(err?.response?.data.message || "Something went wrong while fetching blogs");
      }
    };

    if (isAuth) {
      fetchBlogs();
    } else {
      dispatch(setBlogs(null));
    }
  }, [isAuth, dispatch, page]);

  return (
    <>
      <div className='relative'>
        <div className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
          <Navbar />
        </div>
        <div className="pt-12 md:pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blogs" element={<Blogs page={page} setPage={setPage} />} />
            <Route path="/authors" element={<AllAdmin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/blog/:id" element={<SingleBlog />} />
            <Route path="/update/:id" element={<UpdateBlog />} />
            <Route path='/update-profile' element={<UpdateProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <ToastContainer position="top-center" autoClose='2500' />
    </>
  )
}

export default App;