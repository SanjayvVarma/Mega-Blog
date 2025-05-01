import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="bg-gray-700 text-white flex items-center justify-center p-5">
            <div className="bg-gray-900 text-white flex flex-col items-center p-7 rounded-2xl max-w-7xl w-full">

                {/* Top Section Inside bg-gray-900 */}
                <div className="text-center w-full max-w-5xl mb-5">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold text-blue-400"
                        animate={{ textShadow: ["0px 0px 10px rgba(0, 200, 255, 0.8)", "0px 0px 20px rgba(0, 200, 255, 0.5)", "0px 0px 10px rgba(0, 200, 255, 0.8)"] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    >
                        About Us
                    </motion.h1>
                    <motion.p
                        className="text-yellow-400 text-2xl  font-mono mt-2"
                        animate={{ textShadow: ["0px 0px 10px rgba(0, 200, 255, 0.8)", "0px 0px 20px rgba(0, 200, 255, 0.5)", "0px 0px 10px rgba(0, 200, 255, 0.8)"] }}
                        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                    >
                        We are here to get as many people <span className="text-red-500">moving</span> as possible.
                    </motion.p>
                </div>

                {/* Left-Right Layout */}
                <div className="flex flex-col md:flex-row items-center justify-between w-full">

                    {/* Left Side - Content */}
                    <div className="text-center md:text-center md:w-1/2 space-y-6">
                        <p className="text-gray-200 text-[21px] leading-relaxed font-sans font-light">
                            Welcome to <span className="text-blue-500 font-semibold">Our Blog</span>,
                            your ultimate destination for insightful articles, expert opinions, and
                            engaging discussions. We bring you the latest trends, tech updates, and
                            lifestyle insights to keep you informed and inspired.
                        </p>

                        <p className="text-gray-300 text-[20px] font-sans font-light">
                            Our mission is to empower and educate readers through well-researched,
                            thought-provoking content. Whether you're a tech geek, a creative mind,
                            or simply curious, our blog has something for you.
                        </p>

                        <div>
                            <p className="text-gray-300 text-lg italic">
                                "The only way to do great work is to love what you do." – Steve Jobs
                            </p>
                            <p className="text-gray-300 text-lg italic">
                                "Your only limit is your mind. Keep pushing forward and achieve greatness!"
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-center md:justify-center space-x-4 mt-6">
                            <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-lg">
                                Home
                            </Link>
                            <Link to="/blogs" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-lg">
                                Explore Blog
                            </Link>
                        </div>
                    </div>

                    {/* Right Side - Images */}
                    <div className="md:w-1/2 flex flex-col items-center mt-2 max-w-5xl space-y-6">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                            alt="Creative Blogging"
                            className="w-72 md:w-80 rounded-lg shadow-2xl transition transform hover:scale-105"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                            alt="Tech and Learning"
                            className="w-72 md:w-80 rounded-lg shadow-2xl transition transform hover:scale-105"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default About;

