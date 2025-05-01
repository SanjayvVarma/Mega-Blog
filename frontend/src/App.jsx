import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LogIn from './pages/LogIn'
import Register from './pages/Register'
import About from './pages/About'
import Footer from './components/Footer'
import { toast, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { login } from './features/authSlice'
import { setUser } from './features/userSlice'
import { setBlogs, setPages, updateBlog } from './features/blogSlice'
import Dashboard from './pages/Dashboard'
import Blogs from './pages/Blogs'
import AllAdmin from './pages/AllAdmin'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import SingleBlog from './pages/SingleBlog'
import UpdateBlog from './pages/UpdateBlog'
import ForgotPassword from './pages/ForgotPassword'
import PageNotFound from './pages/PageNotFound'

function App() {

  const [page, setPage] = useState(1);

  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)

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

        console.log("Fetch user failed:", err);

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

        } else {

          toast.error(res.data.message || "Could not load blogs");

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
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
      <ToastContainer position="top-center" autoClose='2000' />
    </>
  )
}

export default App;
