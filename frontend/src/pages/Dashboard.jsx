import { useState } from 'react';
import { useSelector } from 'react-redux';
import MyBlog from '../components/dashboard/MyBlog';
import Profile from '../components/dashboard/Profile';
import Sidebar from '../components/dashboard/Sidebar';
import WelcomeBanner from '../components/WelcomeBanner';
import CreateBlog from '../components/dashboard/CreateBlog';
import ChangePassword from '../components/dashboard/ChangePassword';

const Dashboard = () => {

  const [components, setComponents] = useState('Profile');

  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <>
      {isAuth && user ? (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#0e0e10] text-white border-b-2 border-blue-500">

          <Sidebar components={components} setComponents={setComponents} />

          <div className="flex-1 bg-[#1a1a1d] overflow-y-auto min-h-[calc(100vh-64px)]">
            {
              user.role === "Author" ? (
                components === "Profile" ? (
                  <Profile />
                ) : components === "CreateBlog" ? (
                  <CreateBlog setComponents={setComponents} />
                ) : components === "MyBlog" ? (
                  <MyBlog />
                ) : components === "ChangePassword" ? (
                  <ChangePassword setComponents={setComponents} />
                ) : (
                  <div className='text-center text-blue-500 font-semibold text-xl'>
                    <p>Component Not Found</p>
                  </div>
                )
              ) : (
                components === "Profile" ? (
                  <Profile />
                ) : components === "ChangePassword" ? (
                  <ChangePassword />
                ) : (
                  <div className='text-center text-blue-500 font-semibold text-xl'>
                    <p>Component Not Found</p>
                  </div>
                )
              )
            }
          </div>
        </div>
      ) : (
        <WelcomeBanner />
      )}
    </>
  )
}

export default Dashboard;