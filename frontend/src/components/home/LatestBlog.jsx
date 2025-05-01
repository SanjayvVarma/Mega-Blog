import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const LatestBlog = () => {
    const blogs = useSelector((state) => state.blogs.blogData);;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setLoading(false);
    }
  }, [blogs]);

  const latestBlogs = [...(blogs || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 7);

  return (
    <div className="py-12 px-4 md:px-10 bg-gray-950">
      <h2 className="text-3xl font-bold text-center text-green-400 mb-8">🆕 Latest Blogs</h2>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <ClipLoader color="#22c55e" size={50} />
        </div>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="w-full"
        >
          {latestBlogs.map((blog) => (
            <SwiperSlide key={blog._id}>
              <Link to={`/blog/${blog._id}`}>
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 h-full">

                  <img
                    src={blog.mainImage}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h4 className="text-sm text-purple-400 mb-1">{blog.category}</h4>
                    <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-gray-300 text-sm line-clamp-3">{blog.intro}</p>

                    {blog.author && (
                      <div className="flex items-center gap-3 mt-4">
                        <img
                          src={blog.author.avatar}
                          alt={blog.author.fullName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div className="text-sm text-white">
                          <p>{blog.author.fullName}</p>
                        </div>
                      </div>
                    )}
                    <span className="inline-block mt-3 text-blue-500 hover:underline">
                      Read More →
                    </span>
                  </div>

                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default LatestBlog;
