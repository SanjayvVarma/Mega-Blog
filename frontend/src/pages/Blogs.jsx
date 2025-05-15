import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners'

const Blogs = ({ page, setPage }) => {

  const [searchBlog, setSearchBlog] = useState("")

  const blogs = useSelector((state) => state.blogs.blogData);
  const totalPage = useSelector((state) => state.blogs.pages)

  const isAuth = useSelector((state) => state.auth.isAuth)

  const filteredBlogs = blogs?.filter((blog) =>
    blog.title.toLowerCase().includes(searchBlog.toLowerCase()) ||
    blog.intro.toLowerCase().includes(searchBlog.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchBlog.toLowerCase())
  )

  return (
    <div className="py-12 px-6 bg-gray-800 min-h-screen">
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search blogs by title, intro, category"
          className="px-4 py-2 w-full max-w-md text-white bg-gray-600 rounded-lg shadow-md outline-none"
          value={searchBlog}
          onChange={(e) => setSearchBlog(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {filteredBlogs && filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-900 rounded-2xl shadow-md w-[320px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Link to={`/blog/${blog._id}`} >
                {/* Blog Image */}
                <div className="h-52 rounded-t-2xl overflow-hidden">
                  <img
                    src={blog.mainImage}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-5">
                  {/* Category Badge */}
                  <span className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                    {blog.category}
                  </span>

                  <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3">{blog.intro}</p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-800">
                  <img
                    src={blog.author.avatar}
                    alt={blog.author.fullName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">{blog.author.fullName}</p>
                    <p className="text-xs text-gray-400">Author</p>
                  </div>
                </div>
              </Link>
            </div>

          ))
        ) : isAuth && (
          <h1 className='text-5xl py-32 text-white'>NO BLOG</h1>
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
  );

};

export default Blogs;

