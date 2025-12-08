import axios from 'axios';
import { toast } from 'react-toastify';
import { MdSend } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getTimeAgo } from '../utils/timeDate';
import ReportBlog from '../components/ReportBlog';
import { Link, useParams } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { FaCalendarAlt, FaCommentDots, FaFlag, FaTrash } from 'react-icons/fa';

const SingleBlog = () => {

  const { id } = useParams();
  const [singleBlog, setSingleBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.user.user);

  const fetchSingleBlog = async () => {

    try {

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/single-blog/${id}`,
        { withCredentials: true }
      )

      if (res.data.success) {
        setSingleBlog(res.data.data)
        fetchComments()
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch blog')
    }
  };

  const fetchComments = async () => {

    try {

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/comment/${id}`,
        { withCredentials: true }
      )

      if (res.data.success) {
        setComments(res.data.data)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  };

  useEffect(() => {
    fetchSingleBlog()
  }, [id])

  const handleAddComment = async () => {
    setIsLoading(true)

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/comment/${id}`,
        { message: newComment },
        { withCredentials: true }
      )

      setIsLoading(false)

      if (res.data.success) {
        toast.success(res.data.message)
        setComments((prev) => [...prev, res.data.data])
        fetchComments()
        setNewComment('')
      }

    } catch (error) {
      setIsLoading(false)
      toast.error(error?.response?.data?.message || "add comment failed")
    }
  };

  const handleDeleteComment = async (commentId) => {
    setIsLoading(true)

    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/comment/${id}/comment/${commentId}`,
        { withCredentials: true }
      )

      setIsLoading(false)

      if (res.data.success) {
        toast.success(res.data.message || "comment deleted")
        fetchComments()
      }

    } catch (error) {
      setIsLoading(false)
      toast.error(error?.response?.data?.message || "delete comment failed")
    }

  };

  return (
    <div className='bg-gray-800'>
      {
        singleBlog ? (
          <div className="bg-gray-950 text-white px-5 md:px-10 py-10">
            <div className="max-w-5xl mx-auto space-y-10">

              <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{singleBlog.title}</h1>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src={singleBlog.mainImage}
                  alt={singleBlog.title}
                  className="w-full object-cover hover:scale-[1.02] transition-all duration-300"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-gray-300 mt-4">

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <span className="bg-indigo-600 text-white px-3 py-1 rounded-full uppercase tracking-wide font-semibold text-xs">
                    {singleBlog.category}
                  </span>
                  <span className="text-gray-400 text-xs sm:ml-4">
                    {new Date(singleBlog.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold uppercase text-white">
                    {singleBlog.author.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{singleBlog.author.fullName}</p>
                    <p className="text-xs text-gray-400">{singleBlog.author.email}</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">
                {singleBlog.intro}
              </p>

              <div className="space-y-12">
                {
                  singleBlog.sections.map((section, index) => (
                    <div
                      key={section._id}
                      className="bg-gray-800 flex flex-col justify-center items-center rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>

                      {section.image && (
                        <div className="mb-5 rounded-lg overflow-hidden max-h-[400px]">
                          <img
                            src={section.image}
                            alt={`Section ${index + 1}`}
                            className="w-xl object-cover hover:scale-[1.01] transition-all duration-300"
                          />
                        </div>
                      )}

                      <p className="text-gray-300 leading-relaxed">{section.description}</p>
                    </div>
                  ))
                }
              </div>

              <div className='border border-gray-300 p-2 rounded-lg'>
                <h1 className='text-center text-lg'>Comments</h1>
                {
                  (isAuth && singleBlog) && (
                    <div className='flex gap-3 items-start mt-4 mb-5'>
                      <input
                        type="text"
                        placeholder='Enter your comment'
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 p-4 border border-gray-600 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      />

                      <button
                        onClick={handleAddComment}
                        disabled={!newComment || isLoading}
                        className={`flex items-center justify-center mt-1 w-12 h-12 rounded-full shadow-md transition duration-200 ${newComment ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"}`}
                      >
                        {isLoading ? (
                          <div className="w-6 h-6 border-4 border-white border-t-green-700 rounded-full animate-spin"></div>
                        ) : (
                          <MdSend className="w-6 h-6 text-black" />
                        )}
                      </button>

                    </div>
                  )
                }

                <div className="max-h-[600px] bg-gray-600 p-5 rounded-xl overflow-y-auto pr-2 space-y-4 scrollbar-hide">
                  {
                    comments.length === 0 ? (
                      <div className="flex flex-col items-center text-center text-gray-400 mt-8">
                        <FaCommentDots className="text-5xl mb-3 animate-bounce" />
                        <p className="text-lg text-gray-200 italic">No comments yet. Be the first to comment!</p>
                      </div>

                    ) : (
                      comments.map((comment) => (
                        <div
                          key={comment?._id}
                          className="bg-gray-900 p-4 rounded-lg text-white shadow-md flex flex-col"
                        >

                          <div className="flex justify-between items-start">
                            <p className="text-lg font-semibold">{comment.user.fullName}</p>

                            <div className="text-right flex flex-col items-end">
                              <div className="flex items-center text-sm text-gray-400 gap-2">
                                <FaCalendarAlt className="text-indigo-400" />
                                <span>{getTimeAgo(comment.createdAt)}</span>
                              </div>

                              {
                                isAuth && (comment.user?._id === user?._id || singleBlog.createdBy?._id === user?._id) && (
                                  <button
                                    onClick={() => handleDeleteComment(comment?._id)}
                                    className="mt-2 rounded-full p-1.5 bg-red-500 text-white hover:text-blue-300 transition duration-300 flex items-center gap-2 text-sm"
                                  >

                                    {isLoading ? (
                                      <div className="w-6 h-6 border-4 border-white border-t-green-700 rounded-full animate-spin"></div>
                                    ) : (
                                      <FaTrash />
                                    )}

                                  </button>
                                )
                              }
                            </div>
                          </div>

                          <p className="text-gray-200 text-base">{comment.message}</p>

                        </div>
                      ))
                    )
                  }
                </div>

              </div>
            </div>

            {isAuth && (
              <div className="flex justify-center mt-3">
                <button
                  onClick={() => setShowReportModal(true)}
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-full font-semibold shadow-md transition duration-300 flex items-center gap-2"
                >
                  <FaFlag />
                  Report Blog
                </button>
              </div>
            )}

            {showReportModal && (
              <div className="fixed h-screen inset-0 backdrop-blur bg-opacity-60 flex items-center justify-center z-50 m-2">
                <div className="bg-white/20 p-6 rounded-xl w-full max-w-2xl shadow-lg relative">
                  <button
                    onClick={() => setShowReportModal(false)}
                    className="absolute top-4 right-10 text-white text-3xl font-bold hover:text-red-400"
                  >
                    &times;
                  </button>
                  <h3 className="text-xl font-bold text-white mb-4 text-center"><FaFlag /> Report Blog </h3>
                  <ReportBlog blogId={id} />
                </div>
              </div>
            )}

            <div className="mt-8 text-center">
              <Link to="/">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300">
                  ← Go back to Home
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center py-20">
            <ClimbingBoxLoader color="#3B82F6" size={20} />
          </div>
        )
      }
    </div>
  )

}

export default SingleBlog;