import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const TrendingBlog = () => {

    const [trendingBlogs, setTrendingBlogs] = useState([]);
    const isAuth = useSelector((state) => state.auth.isAuth);

    const trandingBlog = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/trending-blogs`,
                { withCredentials: true }
            )

            if (res.data.success) {
                setTrendingBlogs(res.data.data)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch popular authors");
        }
    };

    useEffect(() => {
        trandingBlog()
    }, [isAuth])

    return (
        <div className="bg-gradient-to-br from-[#387138] via-[#0d1c0f] to-[#268339] py-10 px-5">
            <h2 className="text-3xl font-bold text-blue-400 text-center mb-8">🔥 Trending Blogs</h2>

            {
                trendingBlogs && trendingBlogs.length > 0 ? (
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
                        {trendingBlogs?.map((blog) => (
                            <SwiperSlide key={blog._id}>
                                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 h-full">
                                    <Link to={`/blog/${blog._id}`}>
                                        <img
                                            src={blog.mainImage}
                                            alt={blog.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-4">
                                            <h4 className="text-sm text-yellow-400 mb-1 uppercase">{blog.category}</h4>
                                            <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{blog.title}</h3>
                                            <p className="text-gray-400 text-sm line-clamp-3">{blog.intro}</p>

                                            {blog.author && (
                                                <div className="flex items-center gap-2 mt-4">
                                                    <img
                                                        src={blog.author.avatar}
                                                        alt={blog.author.fullName}
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                    <p className="text-sm text-white">{blog.author.fullName}</p>
                                                </div>
                                            )}

                                            <span className="inline-block mt-3 text-blue-500 hover:underline">Read More →</span>
                                        </div>
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <BeatLoader color="#3B82F6" />
                    </div>
                )
            }
        </div>
    );
};

export default TrendingBlog;