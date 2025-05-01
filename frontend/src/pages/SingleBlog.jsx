import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ClimbingBoxLoader } from 'react-spinners'
import { toast } from 'react-toastify';

const SingleBlog = () => {

  const { id } = useParams()
  const [singleBlog, setSingleBlog] = useState(null)

  const isAuth = useSelector((state) => state.auth.isAuth)
  const user = useSelector((state) => state.user.user)

  const fetchSingleBlog = async () => {
    try {

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/single-blog/${id}`, {
        withCredentials: true,
      })

      if (res.data.success) {
        setSingleBlog(res.data.data)
      }
    } catch (error) {

      toast.error(error?.response?.data?.message || 'Failed to fetch blog')

    }
  }

  useEffect(() => {
    fetchSingleBlog()
  }, [id])

  return (
    <div className='bg-gray-800'>
      {
        singleBlog ? (
          <div className="bg-gray-950 text-white px-5 md:px-10 py-10">
            <div className="max-w-5xl mx-auto space-y-10">

              {/* Title with subtle background */}
              <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{singleBlog.title}</h1>
              </div>

              {/* Main Image */}
              <div className="rounded-xl overflow-hidden shadow-md">
                <img
                  src={singleBlog.mainImage}
                  alt={singleBlog.title}
                  className="w-full object-cover hover:scale-[1.02] transition-all duration-300"
                />
              </div>

              {/* Category + Author */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-sm text-gray-300 mt-4">
                {/* Category + Date */}
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

                {/* Author Info */}
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


              {/* Intro */}
              <p className="text-gray-300 text-lg leading-relaxed">
                {singleBlog.intro}
              </p>

              {/* Sections */}
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

export default SingleBlog
