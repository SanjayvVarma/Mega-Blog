import { useSelector } from 'react-redux';
import Hero from '../components/home/Hero';
import ReviewForm from '../components/home/ReviewForm';
import LatestBlog from '../components/home/LatestBlog';
import WelcomeBanner from '../components/WelcomeBanner';
import TrandingBlog from '../components/home/TrandingBlog';
import PopularAuthors from '../components/home/PopularAuthors';

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
                    <PopularAuthors />
                    <ReviewForm user={user} />
                </div>
            ) : (
                <WelcomeBanner />
            )}
        </div>
    )
}

export default Home;