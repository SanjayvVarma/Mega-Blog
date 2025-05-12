import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEnvelope, FaPhoneAlt, FaGraduationCap, FaUserShield, FaUserAlt, FaInfoCircle } from 'react-icons/fa';
import { Camera } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { setUser } from '../../features/userSlice';
import { Link } from 'react-router-dom';

const Profile = () => {

    const [avatar, setAvatar] = useState(null)
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch()

    const userInfo = [
        {
            icon: <FaUserAlt className="text-pink-500" />,
            label: 'Name',
            value: user.fullName,
            className: "font-semibold text-pink-400 capitalize"
        },
        {
            icon: <FaEnvelope className="text-blue-500" />,
            label: 'Email',
            value: user.email,
            className: "font-semibold text-blue-400 lowercase"
        },
        {
            icon: <FaPhoneAlt className="text-green-500" />,
            label: 'Phone',
            value: user.phone,
            className: "font-semibold text-green-400"
        },
        {
            icon: <FaGraduationCap className="text-yellow-400" />,
            label: 'Education',
            value: user.education,
            className: "font-semibold text-yellow-400 capitalize"
        },
        {
            icon: <FaUserShield className="text-purple-500" />,
            label: 'Role',
            value: user.role,
            className: "font-semibold text-[#07edf5]"
        },
    ];

    const handleChangeAvatar = async () => {
        setIsLoading(true)

        const formData = new FormData();
        formData.append("avatar", avatar);

        try {

            const res = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/update-avatar`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            )

            if (res.data.success) {
                toast.success(res.data.message || 'User Avatar changed')
                dispatch(setUser(res.data.data))
                setIsLoading(false)
                setAvatar(null)
            }

        } catch (error) {
            toast.error(error?.response?.data.message || "Something went wrong")
            setIsLoading(false)
        }

    }

    return (
        <div
            className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
            style={{ backgroundImage: `url(${user.avatar})` }}
        >

            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

            <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 md:p-10 max-w-3xl w-full rounded-2xl shadow-2xl m-4 text-white flex flex-col items-center gap-4 md:gap-4">
                <div className="relative w-44 h-44 group">

                    {isLoading && (
                        <div className='w-full h-full object-cover rounded-full absolute inset-0 backdrop-blur-sm bg-black/10 z-40 flex justify-center items-center'>
                            <div className='w-11 h-11 border-4 border-white border-t-pink-600 rounded-full animate-spin'></div>
                        </div>
                    )}

                    <img
                        src={avatar ? URL.createObjectURL(avatar) : user.avatar}
                        alt="Avatar"
                        className="w-40 h-40 object-cover rounded-full border-4 border-white/20 shadow-md transition-transform group-hover:scale-105 duration-300"
                    />

                    <label className="absolute bottom-5 right-6 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition cursor-pointer">
                        <Camera size={18} />
                        <input
                            type="file"
                            accept='image/*'
                            onChange={(e) => setAvatar(e.target.files[0])}
                            className='hidden'
                        />
                    </label>
                </div>

                {avatar && (
                    <button
                        onClick={handleChangeAvatar}
                        className="px-5 py-2 bg-blue-600 text-sm font-semibold text-white rounded-full hover:bg-blue-700 transition shadow-md"
                    >
                        Update Avatar
                    </button>
                )}

                {user.about && (
                    <div className="w-full max-w-lg mx-auto bg-white/5 p-4 rounded-md text-white">
                        <div className="text-[16px] flex gap-2 items-center text-gray-200 leading-snug">
                            <FaInfoCircle className="text-blue-300 text-[16px]" />
                            <span>{user.about}</span>
                        </div>
                    </div>
                )}

                <div className="w-full flex flex-col gap-2">

                    {userInfo.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-5 bg-white/5 p-4 rounded-lg shadow-inner"
                        >
                            <div className="text-2xl">{item.icon}</div>
                            <div className="flex gap-2 flex-wrap text-lg">
                                <span className="text-gray-300">{item.label} :</span>
                                <span className={item.className}>{item.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='mt-5'>
                    <Link
                        to={'/update-profile'}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm"
                    >
                        Update Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;

