import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../components/dashboard/Sidebar'
import Profile from '../components/dashboard/Profile'
import CreateBlog from '../components/dashboard/CreateBlog'
import Reviews from '../components/dashboard/Reviews'
import MyBlog from '../components/dashboard/MyBlog'
import ChangePassword from '../components/dashboard/ChangePassword'

const Dashboard = () => {

  const [components, setComponents] = useState('Profile')

  const user = useSelector((state) => state.user.user)

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0e0e10] text-white border-b-2 border-blue-500">

      <Sidebar components={components} setComponents={setComponents} />

      <div className="flex-1 bg-[#1a1a1d] overflow-y-auto min-h-[calc(100vh-64px)]">
        {user.role === "Admin" ? (
          components === "Profile" ? (
            <Profile />
          ) : components === "CreateBlog" ? (
            <CreateBlog setComponents={setComponents} />
          ) : components === "Reviews" ? (
            <Reviews />
          ) : components === "MyBlog" ? (
            <MyBlog setComponents={setComponents}/>
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

  )
}

export default Dashboard