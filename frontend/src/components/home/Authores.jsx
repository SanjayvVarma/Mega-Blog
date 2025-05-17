import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaFacebook, FaGraduationCap, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Authores = () => {

  const [authores, setAuthores] = useState([])

  const isAuth = useSelector((state) => state.auth.isAuth)

  const fetchAuthor = async () => {

    try {

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/all-admin`,
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
    <div className="py-10 px-5 bg-gradient-to-br from-[#554425] via-[#252548] to-[#312b17]">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">🌟 Our Popular Authors</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {authores && authores.length > 0 ? (
          authores.slice(0, 5).map((author) => (
            <div
              key={author._id}
              className="bg-gray-900 rounded-lg shadow-md p-6 w-[260px] hover:shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="flex flex-col items-center">
                <img
                  src={author.avatar}
                  alt={author.fullName}
                  className="w-32 h-32 rounded-full object-cover border-3 border-green-500 shadow-md"
                />
                <h2 className="text-lg font-semibold mt-4 text-white text-center">{author.fullName}</h2>

                {author.about && (
                  <div className="text-sm mt-1 text-white text-center bg-white/5 py-1 px-2">
                    <p>{author.about}</p>
                  </div>
                )}

                <p className="text-sm text-gray-400 flex items-center gap-2 mt-3">
                  <FaGraduationCap className="text-blue-400" />
                  {author.education}
                </p>

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
          <p className="text-center text-white w-full">
            No authors available at the moment. Stay tuned!
          </p>
        )}
      </div>
    </div>
  );
};

export default Authores;