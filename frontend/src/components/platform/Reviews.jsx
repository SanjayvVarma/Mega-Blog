import LoaderSpin from '../LoaderSpin';
import { useSelector } from 'react-redux';
import useReview from '../../hooks/useReview';
import { getTimeAgo } from '../../utils/timeDate';
import formatCount from '../../utils/formatCount';
import { FaCalendarAlt, FaRegStar, FaStar, FaStarHalfAlt, FaTrash } from 'react-icons/fa';

const Reviews = () => {

  const { reviews, averageRating, totalReviews, isLoading, handleDelete } = useReview()
  const isAuth = useSelector((state) => state.auth.isAuth);
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
    <div className="flex-1 p-2 rounded-2xl shadow-xl">
      {isLoading && (
        <LoaderSpin text="Retrieving Feedback" message="Please wait while we load user reviews." />
      )}

      {totalReviews > 0 && (
        <div className="flex items-center justify-between bg-gradient-to-br from-[#3232c0] via-[#1a1a2e] to-[#1313e7] text-white mb-2 p-5 rounded-xl shadow-md">
          <div className="flex items-center gap-3 text-2xl font-semibold">

            <div className="flex text-yellow-400 gap-1">
              {renderStars(averageRating)}
            </div>

            <span className="text-white text-lg">{averageRating} / 5</span>
          </div>

          <p className="text-gray-300 text-sm"> {formatCount(totalReviews)} reviews</p>
        </div>
      )}

      <div className="md:max-h-[calc(100vh-190px)] max-h-[calc(100vh-250px)] overflow-y-auto pr-2 scrollbar-hide">
        {reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div key={review._id} className="relative group bg-gradient-to-br from-[#252555] via-[#252548] to-[#171731] border border-gray-700 rounded-2xl p-6 text-white flex flex-col justify-between min-h-[280px] shadow-xl transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]" >
                <div className="absolute -inset-[1px] rounded-2xl border border-transparent group-hover:border-indigo-500 transition-all duration-300 pointer-events-none blur-[1px]"></div>

                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-lg font-semibold tracking-wide">{review.fullName}</p>
                    <p className="text-sm text-gray-400">{review.email}</p>
                  </div>
                  <div className="flex text-yellow-400 text-sm">
                    {renderStars(review.rating)}
                  </div>
                </div>
                <div className="w-full border-b border-gray-400 my-2"></div>
                <p className="text-gray-300 text-base mt-4 leading-relaxed tracking-wide flex-1">
                  {review.message}
                </p>
                <div className="w-full border-b border-gray-400 my-2"></div>
                <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
                  {
                    isAuth && (user?._id === review.createdBy.toString() || user?.role === "Admin") ? (
                      <button
                        onClick={() => handleDelete(review._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md flex items-center gap-1 shadow-sm transition-all duration-200"
                      >
                        <FaTrash /> Delete
                      </button>
                    ) : (
                      <div />
                    )
                  }

                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <FaCalendarAlt className="text-indigo-400" />
                    <span>{getTimeAgo(review.createdAt)}</span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center">No reviews yet.</p>
        )}

      </div>
    </div>

  );
}

export default Reviews;