
import { Link } from 'react-router-dom';
import bgUrl from '../assets/homeBg.jpg';
import { useSelector } from 'react-redux';
import Hero from '../components/home/Hero';
import Authores from '../components/home/Authores';
import ReviewForm from '../components/home/ReviewForm';
import LatestBlog from '../components/home/LatestBlog';
import TrandingBlog from '../components/home/TrandingBlog';

const Home = () => {

    const isAuth = useSelector((state) => state.auth.isAuth);
    const user = useSelector((state) => state.user.user);

    return (
        <div>
            {isAuth && user ? (
                <div>
                    <Hero />
                    <TrandingBlog />
                    <LatestBlog />
                    <Authores />
                    <ReviewForm user={user} />
                </div>
            ) : (
                <div
                    className="min-h-[70vh] flex items-center justify-center text-center px-6 py-5 bg-gray-700 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${bgUrl})` }}
                >
                    <div className="bg-gray-900 shadow-lg rounded-xl p-8 max-w-2xl">
                        <h2 className="text-3xl font-bold text-blue-400 mb-4">🚀 Welcome to Mega <span className='text-green-500'>SK</span><span className='text-blue-500'>BLOG</span>💖 </h2>
                        <p className="text-gray-200 text-lg mb-4">
                            Dive into a world of stories, ideas, and insights from creators around the globe.
                            Whether you're here to read, learn, or share your own voice — you're in the right place.
                        </p>

                        <p className="text-gray-200 text-lg mb-4">
                            " दुनिया भर के रचनाकारों की कहानियों, विचारों और अंतर्दृष्टि की दुनिया में गोता लगाएँ। चाहे आप यहाँ पढ़ने, सीखने या अपनी आवाज़ साझा करने के लिए आए हों - आप सही जगह पर हैं। "
                        </p>
                        <p className="text-gray-200 text-lg mb-6">
                            To get started, please <span className="font-semibold text-blue-500">log in</span> or create an account.
                            Join our community and start your blogging journey today!
                        </p>

                        <Link
                            to="/login"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
                        >
                            Log In to Explore
                        </Link>

                        <p className="text-orange-600 text-lg italic mt-3">
                            "Read blogs and get inspired!"
                        </p>
                        <p className="text-white text-lg italic">
                            "Explore blogs and stay motivated!"
                        </p>
                        <p className="text-green-600 text-lg italic">
                            "Fuel your mind — read, learn, and stay inspired!"
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;