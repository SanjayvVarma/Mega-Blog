import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ErrorPageNotFound from "../assets/404_ErrorPage.jpg";

const PageNotFound = () => {

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-700 text-white px-6">

            <motion.img
                src={`${ErrorPageNotFound}`}
                alt="404 Not Found"
                className="w-72 md:w-80 mb-6 drop-shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />

            <motion.h1
                className="text-[3.5rem] md:text-6xl font-bold text-blue-500 tracking-wide select-none"
                animate={{ textShadow: ["0px 0px 10px #3b82f6", "0px 0px 30px #2563eb"] }}
                transition={{ repeat: Infinity, repeatType: "mirror", duration: 1.5 }}
            >
                404 - Page Not Found
            </motion.h1>

            <motion.p
                className="text-gray-400 mt-3 text-lg md:text-xl text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                Oops! The page you’re looking for doesn’t exist or has been moved.
            </motion.p>

            <motion.div
                className="mt-6"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <Link
                    to="/"
                    className="relative px-8 py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white
                    hover:bg-blue-700 transition-all shadow-md shadow-blue-500/50"
                >
                    Go Back Home
                </Link>
            </motion.div>
        </div>
    );
};

export default PageNotFound;