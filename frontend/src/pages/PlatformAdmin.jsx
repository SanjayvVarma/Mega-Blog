import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUserShield } from 'react-icons/fa';
import Users from '../components/platform/Users';
import Report from '../components/platform/Report';
import Message from '../components/platform/Message';
import Reviews from '../components/platform/Reviews';
import Setting from '../components/platform/Setting';
import AllBlogs from '../components/platform/AllBlogs';
import Category from '../components/platform/Category';
import WelcomeBanner from '../components/WelcomeBanner';
import AdminPanel from '../components/platform/AdminPanel';
import Subscriber from '../components/platform/Subscriber';
import PlatformSidebar from '../components/platform/PlatformSidebar';

const PlatformAdmin = () => {

  const [components, setComponents] = useState('AdminPanel');
  
  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <>
      {isAuth && user ? (
        <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white relative">

          <header className="fixed top-0 left-0 right-0 border-b border-[#00c6ff] z-50 px-4 py-2 bg-[#0f2027]/80 backdrop-blur-md shadow-md">
            <div className="text-center">
              <h3 className="text-lg text-[#7ef9ff] font-semibold tracking-wider uppercase">💓 MEGA_SKBLOG 💓</h3>
              <h2 className="text-2xl text-[#9be8d8] font-semibold flex items-center justify-center gap-2">
                <FaUserShield className="text-[#00d4ff]" /> <span>Super Admin Dashboard</span>
              </h2>
              <p className="text-sm text-[#c0e0ff] italic">Welcome back, Super Admin! Manage everything from one place.</p>
            </div>
          </header>

          <PlatformSidebar components={components} setComponents={setComponents} />

          <div className="absolute inset-0 border-b md:top-25 md:left-63 top-40 left-0 right-0 text-white">
            {user.role === "SuparAdmin" && (
              components === 'AdminPanel' ? (
                <AdminPanel />
              ) : components === "Reviews" ? (
                <Reviews />
              ) : components === "Subscriber" ? (
                <Subscriber />
              ) : components === "Message" ? (
                <Message />
              ) : components === "Categories" ? (
                <Category />
              ) : components === "Users" ? (
                <Users />
              ) : components === "AllBlogs" ? (
                <AllBlogs />
              ) : components === "Settings" ? (
                <Setting />
              ) : components === "Report" ? (
                <Report />
              ) : (
                <div className="text-center mt-10">
                  <h1 className="text-2xl font-bold text-[#94f5e2] mb-2">Component: {components}</h1>
                  <p className="text-[#dbeafe]">Component coming soon...</p>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className='bg-gray-900 pt-26 h-screen'>
          <WelcomeBanner />
        </div>
      )}
    </>
  );
};

export default PlatformAdmin;