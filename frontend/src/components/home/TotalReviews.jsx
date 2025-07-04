import { useState } from 'react';
import LoaderSpin from '../LoaderSpin';
import { useSelector } from 'react-redux';
import useReview from '../../hooks/useReview';
import formatCount from '../../utils/formatCount';
import { getTimeAgo } from '../../utils/timeDate';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';

function TotalReviews() {

    const [viewReview, setViewReview] = useState(false);
    const { reviews, averageRating, totalReviews, isLoading, handleDelete } = useReview();

    const user = useSelector((state) => state.user.user);

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => {
            const value = i + 1;
            if (rating >= value) return <FaStar key={i} />;
            else if (rating >= value - 0.5) return <FaStarHalfAlt key={i} />;
            else return <FaRegStar key={i} />;
        });
    };

    return (
        <div>
            {totalReviews > 0 && (
                <div
                    onClick={() => setViewReview(true)}
                    className="flex items-center justify-between bg-blue-950 text-white mb-8 py-4 px-1 rounded-xl shadow-md cursor-pointer"
                >
                    <div className="flex items-center gap-2 text-xl font-semibold">
                        <div className="flex text-yellow-400 gap-0.5">
                            {renderStars(averageRating)}
                        </div>
                        <span className="text-white text-sm font-bold">
                            {averageRating.toFixed(1)} / 5
                        </span>
                    </div>

                    <p className="text-gray-200 text-sm">
                        {formatCount(totalReviews)} reviews
                    </p>
                </div>
            )}

            {isLoading &&
                <LoaderSpin text="Retrieving Feedback" message="Please wait while we load user reviews." />
            }

            {viewReview && (
                <div className="fixed h-screen inset-0 backdrop-blur bg-opacity-60 flex items-center justify-center z-50 m-2">
                    <div className="bg-white/20 p-6 rounded-xl w-full max-w-2xl shadow-lg relative">
                        <button
                            onClick={() => setViewReview(false)}
                            className="absolute top-4 right-10 text-white text-3xl font-bold hover:text-red-400"
                        >
                            &times;
                        </button>

                        <h3 className="text-xl font-bold text-white mb-4 text-center"> ⭐User Reviews❤️ </h3>

                        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
                            {reviews.map((review) => (
                                <div key={review._id} className="bg-gradient-to-br from-[#252555] via-[#252548] to-[#171731] p-4 rounded-md shadow relative">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-lg text-blue-300">{review.fullName}</span>
                                        <div className="flex justify-between items-center text-xs text-gray-400">
                                            <span>{getTimeAgo(review.createdAt)}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-300 text-[16px] italic mb-1"> "{review.message}" </p>

                                    <div className="flex justify-between items-center text-xs text-gray-400">
                                        <div className="flex text-yellow-400 text-sm mt-2">
                                            {renderStars(review.rating)}
                                        </div>

                                        {user?._id === review.createdBy && (
                                            <button
                                                onClick={() => handleDelete(review._id)}
                                                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default TotalReviews;