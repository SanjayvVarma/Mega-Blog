import axios from 'axios';
import Swal from 'sweetalert2';
import LoaderSpin from '../LoaderSpin';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { deleteBlogs, triggerRefreshBlogs, updateBlog } from '../../features/blogSlice';

const MyBlog = () => {

  const [userBlogs, setUserBlogs] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()

  const fetchUserBlog = async () => {

    setIsLoading(true)

    try {

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/user-blogs?page=${page}&limit=6`,
        { withCredentials: true }
      )

      setIsLoading(false)

      if (res.data.success) {
        setUserBlogs(res.data.data.userBlogs)
        setTotalPage(res.data.data.totalPages)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch user blog");
      setIsLoading(false)
    }
  };

  useEffect(() => {
    fetchUserBlog()
  }, [page]);

  const togglePublish = async (id, currentPublished) => {
    setIsLoading(true)

    setUserBlogs(prev =>
      prev.map(blog =>
        blog._id === id ? { ...blog, published: !currentPublished } : blog
      )
    );

    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/publish-blog/${id}`,
        { published: !currentPublished },
        { withCredentials: true }
      )

      setIsLoading(false)

      if (res.data.success) {
        toast.success(res.data.message || "Publish status updated")
        dispatch(updateBlog(res.data.data))
        dispatch(triggerRefreshBlogs())
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update publish status");
      setIsLoading(false)
      setUserBlogs(prev =>
        prev.map(blog =>
          blog._id === id ? { ...blog, published: currentPublished } : blog
        )
      );
    }
  };

  const deleteBlog = async (id) => {

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "This blog will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      background: '#1f2937',
      color: '#fff'
    });

    if (result.isConfirmed) {
      setIsLoading(true)

      try {
        const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/delete-blog/${id}`, {
          withCredentials: true
        });

        setIsLoading(false)

        if (res.data.success) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: res.data.message,
            timer: 2000,
            showConfirmButton: false,
            background: '#1f2937',
            color: '#fff'
          });

          setUserBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== id));
          dispatch(deleteBlogs(id))
        }

      } catch (error) {
        setIsLoading(false)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.response?.data?.message || 'Blog delete failed',
          background: '#1f2937',
          color: '#fff'
        });
      }
    }
  };

  const filteredBlogs = userBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.intro.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      {isLoading && (<LoaderSpin />)}

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search blogs..."
          className="px-4 py-2 w-full max-w-md text-white bg-gray-600 rounded-lg shadow-md outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredBlogs && filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog._id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-700 transition duration-300" >
              <Link to={`/blog/${blog._id}`}>
                <img
                  src={blog.mainImage}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4 space-y-2">
                <Link to={`/blog/${blog._id}`}>
                  <span className="inline-block bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                  <h2 className="text-xl font-semibold py-2">{blog.title}</h2>
                  <p className="text-gray-400 text-sm line-clamp-3">{blog.intro}</p>
                  <div className='flex justify-between'>
                    <p className="text-xs text-white py-3">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", })}
                    </p>
                    <p className="text-sm text-white py-3">{blog.views || 0} 👁️</p>
                  </div>
                </Link>

                <div className='flex bg-gray-700 rounded-lg justify-between py-1 px-8'>
                  <p className={`${!blog.published ? 'text-red-400' : 'text-gray-300'}`}>Unpublish</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={blog.published}
                      onChange={() => togglePublish(blog._id, blog.published)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-5 bg-gray-950 rounded-full peer-focus:ring-1 peer-focus:ring-blue-400 peer-checked:bg-blue-600 transition-colors duration-300"></div>
                    <div className="absolute left-0.5 top-0.6 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-6"></div>
                  </label>
                  <p className={`${blog.published ? 'text-green-500' : 'text-gray-300'}`}>Publish</p>
                </div>

                <div className="flex justify-between mt-4">
                  <Link
                    to={`/update/${blog._id}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-full text-sm"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400 text-lg">No posts yet.</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mt-6">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center"
          >
            <FaArrowLeft />
          </button>
        )}

        <span className="text-white text-sm font-medium border px-3 py-1 rounded-full bg-gray-700">
          Page {page} of {totalPage}
        </span>

        {page < totalPage && (
          <button
            onClick={() => setPage(page + 1)}
            className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center"
          >
            <FaArrowRight />
          </button>
        )}
      </div>

    </div>
  )
}

export default MyBlog;