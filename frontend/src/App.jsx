import './App.css';
import axios from 'axios';
import Home from './pages/Home';
import About from './pages/About';
import LogIn from './pages/LogIn';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Register from './pages/Register';
import Scroll from './components/Scroll';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AllAuthor from './pages/AllAuthors';
import { useEffect, useState } from 'react';
import SingleBlog from './pages/SingleBlog';
import UpdateBlog from './pages/UpdateBlog';
import { login } from './features/authSlice';
import { setUser } from './features/userSlice';
import Footer from './components/footer/Footer';
import PageNotFound from './pages/PageNotFound';
import LoaderSpin from './components/LoaderSpin';
import { Routes, Route } from 'react-router-dom';
import UpdateProfile from './pages/UpdateProfile';
import PlatformAdmin from './pages/PlatformAdmin';
import ForgotPassword from './pages/ForgotPassword';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setBlogs, setPages } from './features/blogSlice';
import TermsAndConditions from './components/TermsAndConditions';
import VerifySubscribe from './components/footer/VerifySubscribe';

function App() {

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const refreshBlogs = useSelector(state => state.blogs.refreshBlogs);

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
      setIsLoading(true);

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/all-blogs?page=${page}&limit=12`,
          { withCredentials: true }
        );

        setIsLoading(false)

        if (res.data.success) {
          dispatch(setBlogs(res.data.data.blogs));
          dispatch(setPages(res.data.data.totalPages))
        }

      } catch (err) {
        toast.error(err?.response?.data.message || "Something went wrong while fetching blogs");
        setIsLoading(false);
      }
    };

    if (isAuth) {
      fetchBlogs();
    } else {
      dispatch(setBlogs(null));
    }
  }, [isAuth, dispatch, page, refreshBlogs]);

  return (
    <>
      {isLoading && <LoaderSpin text="Blog Loading" message="Please wait while we fetch your blog..." />}
      <Scroll />
      <Routes>
        <Route path="/verify" element={<VerifySubscribe />} />
        <Route path="/platform" element={<PlatformAdmin />} />
        <Route path="/*" element={
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
                <Route path="/authors" element={<AllAuthor />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/blog/:id" element={<SingleBlog />} />
                <Route path="/update/:id" element={<UpdateBlog />} />
                <Route path='/update-profile' element={<UpdateProfile />} />
                <Route path="/term" element={<TermsAndConditions />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        } />
      </Routes>
      <ToastContainer position="top-center" autoClose='2500' />
    </>
  )
}

export default App;