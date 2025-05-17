import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BounceLoader } from 'react-spinners';

const Hero = () => {

    const blogs = useSelector((state) => state.blogs.blogData);

    return (
        <div className="w-full h-[88vh] relative bg-gray-700 flex items-center justify-center p-2">
            {blogs && blogs.length > 0 ? (
                [blogs[Math.floor(Math.random() * blogs.length)]].map((blog) => (
                    <div key={blog._id} className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                        <Link to={`/blog/${blog._id}`}>
                            <img
                                src={blog.mainImage}
                                alt={blog.title}
                                className="w-full h-full object-cover brightness-90"
                            />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center px-8">
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
                                    {blog.title}
                                </h1>
                                <p className="text-gray-200 text-lg md:text-xl line-clamp-3 max-w-2xl">
                                    {blog.intro}
                                </p>
                                <div className="mt-6">
                                    <span className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition" >
                                        Read More
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className="flex items-center justify-center h-full">
                    <BounceLoader color="#3B82F6" />
                </div>
            )}
        </div>
    );
};

export default Hero;