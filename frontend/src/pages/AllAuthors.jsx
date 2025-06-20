import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import LoaderSpin from '../components/LoaderSpin';
import { FaFacebook, FaGraduationCap, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const AllAuthor = () => {

    const [authores, setAuthores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAuthor = async () => {
        setIsLoading(true);

        try {

            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/all-author`,
                { withCredentials: true }
            )
            setIsLoading(false)

            if (res.data.success) {
                setAuthores(res.data.data)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "No Admin available")
            setIsLoading(false)
        }

    };

    useEffect(() => {
        fetchAuthor()
    }, []);

    return (
        <div className="py-10 px-5 bg-gradient-to-br from-[#252555] via-[#252548] to-[#271731]">
            {isLoading && <LoaderSpin text='Fetching All Admins' />}
            <div className="flex flex-wrap justify-center gap-6">
                {authores && authores.length > 0 ? (
                    authores.map((author) => (
                        <div key={author._id} className="bg-gray-900 border-3 border-green-500 rounded-lg shadow-md p-6 w-[260px] hover:shadow-lg transition-transform duration-300 hover:scale-105">
                            <div className="flex flex-col items-center">
                                <img
                                    src={author.avatar}
                                    alt={author.fullName}
                                    className="w-32 h-32 bottom-40 rounded-full object-cover border-3 border-green-500 shadow-md"
                                />
                                <h2 className="text-lg font-semibold mt-4 text-white text-center">{author.fullName}</h2>

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
                                    <Link to="/">
                                        <FaFacebook className="hover:text-blue-600 cursor-pointer" />
                                    </Link>
                                    <Link to="/">
                                        <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                                    </Link>
                                    <Link to="/">
                                        <FaYoutube className="hover:text-red-600 cursor-pointer" />
                                    </Link>
                                    <Link to="/">
                                        <FaTwitter className="hover:text-sky-500 cursor-pointer" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-center text-lg mt-10">No Authors Available</p>
                )}

            </div>
        </div>

    );
};

export default AllAuthor;