import React from 'react';
import { useSelector } from 'react-redux';
import { FaEnvelope, FaPhoneAlt, FaGraduationCap, FaUserShield, FaUserAlt } from 'react-icons/fa';

const Profile = () => {
    const user = useSelector((state) => state.user.user);

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


    return (
        <div
            className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
            style={{ backgroundImage: `url(${user.avatar})` }}
        >

            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

            <div className="relative z-10 bg-white/10 backdrop-blur-lg p-10 max-w-3xl w-full rounded-xl shadow-2xl text-white flex flex-col items-center gap-5">

                <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-44 h-44 object-cover rounded-full shadow-xl"
                />


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
            </div>
        </div>
    );
};

export default Profile;

