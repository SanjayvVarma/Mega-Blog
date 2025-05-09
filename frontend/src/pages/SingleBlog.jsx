import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MdSend } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom'
import { ClimbingBoxLoader } from 'react-spinners'
import { toast } from 'react-toastify';
import { FaCalendarAlt, FaCommentDots, FaTrash } from 'react-icons/fa';

const SingleBlog = () => {

  const { id } = useParams()
  const [singleBlog, setSingleBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('')

  const isAuth = useSelector((state) => state.auth.isAuth)
  const user = useSelector((state) => state.user.user)

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
  }

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
  }

  useEffect(() => {
    fetchSingleBlog()
  }, [id])

  const handleAddComment = async () => {
    try {

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/comment/${id}`,
        { message: newComment },
        { withCredentials: true }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        setComments((prev) => [...prev, res.data.data])
        fetchComments()
        setNewComment('')
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "add comment failed")
    }
  }

  const handleDeleteComment = async (commentId) => {

    try {

      const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/comment/${id}/comment/${commentId}`,
        { withCredentials: true }
      )

      if (res.data.success) {
        toast.success(res.data.message || "comment deleted")
        fetchComments()
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "delete comment failed")
    }

  }

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
                    {singleBlog.createdBy.fullName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-white">{singleBlog.createdBy.fullName}</p>
                    <p className="text-xs text-gray-400">{singleBlog.createdBy.email}</p>
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

              {
                (isAuth && singleBlog) && (
                  <div className='flex gap-3 items-start mt-4'>
                    <input
                      type="text"
                      placeholder='Enter your comment'
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 p-4 border border-gray-600 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />

                    <button
                      onClick={handleAddComment}
                      disabled={!newComment}
                      className={`flex items-center justify-center mt-1 w-12 h-12 rounded-full shadow-md transition duration-200 ${newComment ? "bg-green-500 hover:bg-green-700" : "bg-gray-500 cursor-not-allowed"}`}
                    >
                      <MdSend className="w-6 h-6 text-black" />
                    </button>
                  </div>
                )
              }

              <div className="max-h-[700px] bg-gray-600 p-5 rounded-xl overflow-y-auto pr-2 space-y-4 scrollbar-hide">
                {
                  comments.length === 0 ? (
                    <div className="flex flex-col items-center text-center text-gray-400 mt-8">
                      <FaCommentDots className="text-5xl mb-3 animate-bounce" />
                      <p className="text-lg text-gray-200 italic">No comments yet. Be the first to comment!</p>
                    </div>

                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment._id}
                        className="bg-gray-900 p-4 rounded-lg text-white shadow-md flex flex-col"
                      >

                        <div className="flex justify-between items-start">
                          <p className="text-lg font-semibold">{comment.user.fullName}</p>

                          <div className="text-right flex flex-col items-end">
                            <div className="flex items-center text-sm text-gray-400 gap-2">
                              <FaCalendarAlt className="text-indigo-400" />
                              <span>
                                {
                                  new Date(comment.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric", month: "long", day: "numeric",
                                  })
                                }
                              </span>
                            </div>

                            {
                              (comment.user._id === user._id || singleBlog.createdBy._id === user._id) && (
                                <button
                                  onClick={() => handleDeleteComment(comment._id)}
                                  className="mt-2 rounded-full p-1.5 bg-red-500 text-white hover:text-blue-300 transition duration-300 flex items-center gap-2 text-sm"
                                >
                                  <FaTrash />
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



// const SingleBlog = () => {
//   const { id } = useParams();
//   const [singleBlog, setSingleBlog] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const isAuth = useSelector((state) => state.auth.isAuth);
//   const user = useSelector((state) => state.user.user);

//   const fetchSingleBlog = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/single-blog/${id}`, {
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         setSingleBlog(res.data.data);
//         fetchComments(); // Fetch comments when the blog is fetched
//       } else {
//         setError('Blog not found');
//       }
//     } catch (err) {
//       setError(err?.response?.data?.message || 'Failed to fetch blog');
//       toast.error(err?.response?.data?.message || 'Failed to fetch blog');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/comment/${id}`, {
//         withCredentials: true,
//       });

//       if (res.data.success) {
//         setComments(res.data.data.comments); // ✅ fix here

//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || 'Failed to fetch comments');
//       setComments([]); // prevent .map() crash
//     }
//   };


//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/v1/comment/${id}`,
//         { message: newComment },
//         {
//           withCredentials: true,
//         }
//       );

//       if (res.data.success) {
//         setNewComment('');
//         fetchComments(); // Reload comments after adding one
//         toast.success('Comment added successfully');
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || 'Failed to add comment');
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     console.log(commentId);

//     try {
//       const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/comment/${id}/comment/${commentId}`,
//         { withCredentials: true, }
//       );

//       if (res.data.success) {
//         fetchComments(); // Reload comments after deletion
//         toast.success('Comment deleted successfully');
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || 'Failed to delete comment');
//     }
//   };

//   useEffect(() => {
//     fetchSingleBlog();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="w-full flex justify-center items-center py-20">
//         <ClimbingBoxLoader color="#3B82F6" size={20} />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full text-center py-20">
//         <p className="text-xl text-red-600">{error}</p>
//         <Link to="/">
//           <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300">
//             ← Go back to Home
//           </button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-800">
//       {singleBlog && (
//         <div className="bg-gray-950 text-white px-5 md:px-10 py-10">
//           <div className="max-w-5xl mx-auto space-y-10">
//             {/* Title with subtle background */}
//             <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
//               <h1 className="text-3xl md:text-4xl font-bold text-white">{singleBlog.title}</h1>
//             </div>

//             {/* Main Image */}
//             <div className="rounded-xl overflow-hidden shadow-md">
//               <img
//                 src={singleBlog.mainImage}
//                 alt={singleBlog.title}
//                 className="w-full object-cover hover:scale-[1.02] transition-all duration-300"
//               />
//             </div>

//             {/* Category + Author */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-gray-300 mt-4">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//                 <span className="bg-indigo-600 text-white px-3 py-1 rounded-full uppercase tracking-wide font-semibold text-xs">
//                   {singleBlog.category}
//                 </span>
//                 <span className="text-gray-400 text-xs sm:ml-4">
//                   {new Date(singleBlog.createdAt).toLocaleDateString('en-GB', {
//                     day: '2-digit',
//                     month: 'short',
//                     year: 'numeric',
//                   })}
//                 </span>
//               </div>

//               {/* Author Info */}
//               <div className="flex items-center gap-3">
//                 <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center font-bold uppercase text-white">
//                   {singleBlog.createdBy.fullName.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="font-semibold text-sm text-white">{singleBlog.createdBy.fullName}</p>
//                   <p className="text-xs text-gray-400">{singleBlog.createdBy.email}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Intro */}
//             <p className="text-gray-300 text-lg leading-relaxed">{singleBlog.intro}</p>

//             {/* Sections */}
//             <div className="space-y-12">
//               {singleBlog.sections.map((section, index) => (
//                 <div
//                   key={section._id}
//                   className="bg-gray-800 flex flex-col justify-center items-center rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
//                 >
//                   <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>

//                   {section.image && (
//                     <div className="mb-5 rounded-lg overflow-hidden max-h-[400px]">
//                       <img
//                         src={section.image}
//                         alt={`Section ${index + 1}`}
//                         className="w-xl object-cover hover:scale-[1.01] transition-all duration-300"
//                       />
//                     </div>
//                   )}

//                   <p className="text-gray-300 leading-relaxed">{section.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Comments Section */}
//           <div className="mt-12">
//             <h2 className="text-2xl text-white font-semibold mb-4">Comments</h2>

//             {/* Add Comment */}
//             {isAuth && (
//               <form onSubmit={handleAddComment} className="mb-6">
//                 <textarea
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   className="w-full p-4 rounded-lg text-white"
//                   placeholder="Add your comment..."
//                   rows="4"
//                 />
//                 <button
//                   type="submit"
//                   className="bg-indigo-600 text-white px-4 py-2 rounded-full mt-2 hover:bg-indigo-700"
//                 >
//                   Add Comment
//                 </button>
//               </form>
//             )}

//             {/* Display Comments */}
//             {comments.length === 0 ? (
//               <p className="text-gray-400">No comments yet. Be the first to comment!</p>
//             ) : (
//               <div className="space-y-6">
//                 {comments.map((comment) => (

//                   <div key={comment._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
//                     <p className="font-semibold text-white">{comment.user.fullName}</p>
//                     <p className="text-gray-300">{comment.message}</p>
//                     {(comment.user._id === user._id || singleBlog.createdBy._id === user._id) && (
//                       <button
//                         onClick={() => handleDeleteComment(comment._id)}
//                         className="text-red-500 mt-2 hover:text-red-700"
//                       >
//                         Delete Comment
//                       </button>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="mt-8 text-center">
//             <Link to="/">
//               <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition duration-300">
//                 ← Go back to Home
//               </button>
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleBlog;

