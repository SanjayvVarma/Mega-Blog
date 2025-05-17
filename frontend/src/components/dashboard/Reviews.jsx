import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaRegStar, FaStar, FaStarHalfAlt, FaTrash } from 'react-icons/fa';

const Reviews = () => {

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.user.user);

  const fetchReviews = async () => {

    try {

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/review/all-review`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviews(res.data.data.reviews);
        setAverageRating(res.data.data.averageRating);
        setTotalReviews(res.data.data.totalReview);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id) => {

    try {

      const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/review/delete-review/${id}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Review deleted successfully");
        fetchReviews();
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete review");
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => {
      const value = i + 1;
      if (rating >= value) return <FaStar key={i} />;
      else if (rating >= value - 0.5) return <FaStarHalfAlt key={i} />;
      else return <FaRegStar key={i} />;
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now - past) / 1000);

    if (diff < 60) return `${diff} second${diff !== 1 ? 's' : ''} ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minute${diff < 120 ? '' : 's'} ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hour${diff < 7200 ? '' : 's'} ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)} day${diff < 172800 ? '' : 's'} ago`;
    if (diff < 1209600) return `1 week ago`;

    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric"
    });
  };

  return (
    <div className="flex-1 bg-gray-950 p-8 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-4">Reviews</h3>

      {totalReviews > 0 && (
        <div className="flex items-center justify-between bg-gradient-to-br from-[#3232c0] via-[#1a1a2e] to-[#1313e7] text-white mb-2 p-5 rounded-xl shadow-md">
          <div className="flex items-center gap-3 text-2xl font-semibold">

            <div className="flex text-yellow-400 gap-1">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                if (averageRating >= ratingValue) {
                  return <FaStar key={i} />;
                } else if (averageRating >= ratingValue - 0.5) {
                  return <FaStarHalfAlt key={i} />;
                } else {
                  return <FaRegStar key={i} />;
                }
              })}
            </div>

            <span className="text-white text-lg">{averageRating} / 5</span>
          </div>

          <p className="text-gray-300 text-sm">{totalReviews} review{totalReviews > 1 && "s"}</p>
        </div>
      )}

      <div className="overflow-y-auto max-h-[600px] scrollbar-hide p-2">
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