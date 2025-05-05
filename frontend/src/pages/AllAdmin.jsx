import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaFacebook, FaGraduationCap, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners'
import { toast } from 'react-toastify';

const AllAdmin = () => {
    const [authores, setAuthores] = useState([])

    const isAuth = useSelector((state) => state.auth.isAuth)

    const fetchAuthor = async () => {

        try {

            const res = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/all-admin`,
                { withCredentials: true }
            )


            if (res.data.success) {
                setAuthores(res.data.data)
            }

        } catch (error) {
            toast.error(error.res.data.message || "No Admin available")
        }

    }

    useEffect(() => {
        fetchAuthor()
    }, [isAuth])

    return (
        <div className="py-10 px-5 bg-gray-800">

            <div className="flex flex-wrap justify-center gap-6">
                {authores && authores.length > 0 ? (
                    authores.map((author) => (
                        <div
                            key={author._id}
                            className="bg-gray-900 border-3 border-green-500 rounded-lg shadow-md p-6 w-[260px] hover:shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            <div className="flex flex-col items-center">
                                <img
                                    src={author.avatar}
                                    alt={author.fullName}
                                    className="w-32 h-32 bottom-40 rounded-full object-cover border-3 border-green-500 shadow-md"
                                />
                                <h2 className="text-lg font-semibold mt-4 text-white text-center">
                                    {author.fullName}
                                </h2>
                                {author.about && (
                                    <div className="text-sm mt-1 text-white text-center bg-white/5 py-1 px-2">
                                        <p>{author.about}</p>
                                    </div>
                                )}
                                <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                                    <FaGraduationCap className="text-blue-400" />
                                    {author.education}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">📞 {author.phone}</p>
                                <p className="text-sm text-gray-400 mt-1">📧 {author.email}</p>

                                <div className="flex gap-4 mt-3 text-blue-400 text-xl">
                                    <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                                    <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                                    <FaYoutube className="hover:text-red-600 cursor-pointer" />
                                    <FaTwitter className="hover:text-sky-500 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="w-full flex flex-col items-center justify-center py-20 space-y-6 bg-gray-900 text-white">
                        <ClimbingBoxLoader color="#3B82F6" size={20} />

                        <h1 className="text-2xl md:text-3xl font-bold text-center">
                            You are not login
                        </h1>

                        <Link
                            to="/login"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 shadow-lg"
                        >
                            Log In to Explore
                        </Link>
                    </div>
                )}
            </div>
        </div>

    );
};

export default AllAdmin