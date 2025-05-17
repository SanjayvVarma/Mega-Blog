import { Link } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-[#4f5525] via-[#252548] to-[#2f3117] text-gray-300 py-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div>
                        <Link to="/" className="relative text-3xl font-extrabold text-green-400 flex items-center">
                            <span className="relative z-10 left-5 bottom-1.5">SK</span>
                            <span className="relative text-4xl mx-2">💖</span>
                            <span className="relative z-10 text-blue-400 right-8 top-2">BLOG</span>
                        </Link>
                        <p className="mt-6 text-8 text-gray-400">
                            Insights, stories, and tips for tech enthusiasts and developers.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                        <ul className="mt-3 space-y-2">
                            <li><Link to="/" className="hover:text-blue-300 transition">Home</Link></li>
                            <li><Link to="/about" className="hover:text-blue-300 transition">About</Link></li>
                            <li><Link to="/contact" className="hover:text-blue-300 transition">Contact</Link></li>
                            <li><Link to="/blogs" className="hover:text-blue-300 transition">blogs</Link></li>
                            <li><Link to="/privacy" className="hover:text-blue-300 transition">privacy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white">Categories</h3>
                        <ul className="mt-3 space-y-2 text-white">
                            <li className="cursor-pointer hover:underline hover:font-mono hover:text-red-300 transition">LifeStyle</li>
                            <li className="cursor-pointer hover:underline hover:font-mono hover:text-red-300 transition">Technology</li>
                            <li className="cursor-pointer hover:underline hover:font-mono hover:text-red-300 transition">Sports</li>
                            <li className="cursor-pointer hover:underline hover:font-mono hover:text-red-300 transition">Business</li>
                            <li className="cursor-pointer hover:underline hover:font-mono hover:text-red-300 transition">Education</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white">Get blog articles via email</h3>
                        <form className="mt-3 space-y-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-green-500 outline-none"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring focus:ring-green-500 outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex justify-center space-x-5 mt-6">
                    <a href="https://github.com/SanjayvVarma" className="hover:text-white transition">
                        <FaGithub size={24} />
                    </a>
                    <a href="https://twitter.com/SanjayAzad_" className="hover:text-blue-400 transition">
                        <FaTwitter size={24} />
                    </a>
                    <a href='https://www.instagram.com/sanjayazad_/' className="hover:text-red-400 transition">
                        <FaInstagram size={24} />
                    </a>
                    <a href='https://www.linkedin.com/in/sanjaykvarma/' className="hover:text-blue-500 transition">
                        <FaLinkedin size={24} />
                    </a>
                    <a href="mailto:skvarma914@gmail.com" className="hover:text-yellow-400 transition">
                        <TfiEmail size={24} />
                    </a>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
                    <p>© {new Date().toLocaleString("en-US", { month: "long" })} {new Date().getFullYear()} - SK BLOG. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;