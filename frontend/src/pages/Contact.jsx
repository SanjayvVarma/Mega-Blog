import { Link } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-700 py-4 px-4">
      <div className="bg-gradient-to-br from-[#5c2a87] via-[#0f0f1c] to-[#860c9c] rounded-2xl text-white min-h-screen flex flex-col items-center p-5">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-400 mb-4">Get in Touch</h1>

        <p className="text-gray-300 text-lg text-center max-w-5xl mb-4">
          We'd love to hear from you! Whether you have a question, feedback, or just want to say hello,
          feel free to reach out using the form below or through our contact details.
        </p>

        <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-6xl flex flex-col md:flex-row gap-8">

          <div className="md:w-1/2 space-y-6">
            <h2 className="text-2xl font-semibold text-blue-400">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-400 text-2xl" />
                <p className="text-lg">support@skblog.com</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-400 text-2xl" />
                <p className="text-lg">+91 90097 XXXXX</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-blue-400 text-2xl" />
                <p className="text-lg">136 Main Road, Sarangpur, Mp</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-blue-400 mt-6">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://github.com/SanjayvVarma" className="hover:text-gray-300 transition">
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

            <div className="flex space-x-6 mt-6">
              <Link to="/" className="text-blue-400 hover:text-blue-500 text-lg transition">
                🏠 Home
              </Link>
              <Link to="/blogs" className="text-blue-400 hover:text-blue-500 text-lg transition">
                📝 Blogs
              </Link>
            </div>
            <p className="text-gray-300 text-lg italic">
              "Every connection begins with a conversation—let’s create something amazing together." 💙
            </p>
          </div>

          <div className="md:w-1/2 bg-gray-700 p-8 rounded-2xl shadow-lg">
            <form>

              <div className="mb-4 flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="block text-gray-300 text-lg mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your Name"
                  />
                </div>
                <div className="w-full">
                  <label className="block text-gray-300 text-lg mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your Email"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-300 text-lg mb-2">Message</label>
                <textarea
                  rows="4"
                  className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your Message"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;