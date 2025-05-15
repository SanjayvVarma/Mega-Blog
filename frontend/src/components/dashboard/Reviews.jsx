import axios from 'axios';
import { useState, useEffect } from 'react'
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaRegStar, FaStar, FaStarHalfAlt, FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Reviews = () => {

  const [reviews, setReviews] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [page, setPage] = useState(1);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.user.user);

  const fetchReviews = async () => {

    try {

      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/review/all-review?page=${page}&limit=6`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setReviews(res.data.data.reviews);
        setTotalPages(res.data.data.totalPages);
        setAverageRating(res.data.data.averageRating);
        setTotalReviews(res.data.data.totalReview);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch reviews");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

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
    <div className="flex-1 bg-gray-900 p-8 rounded-2xl shadow-xl">
      <h3 className="text-2xl font-bold text-white mb-6">Reviews</h3>

      {totalReviews > 0 && (
        <div className="flex items-center justify-between bg-gray-800 text-white mb-8 p-5 rounded-xl shadow-md">
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

      {reviews && reviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {
            reviews.map((review) => (
              <div
                key={review._id}
                className="bg-gray-800 p-6 rounded-xl text-white shadow-md flex flex-col justify-between"
              >
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-bold">{review.fullName}</p>
                    </div>
                    <p className="text-sm text-gray-400">{review.email}</p>
                    <div className="mt-2 text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="inline-block" />
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 text-sm text-gray-400">
                    {
                      isAuth && user?._id === review.createdBy.toString() && (
                        <button
                          onClick={() => handleDelete(review._id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md flex items-center gap-1"
                        >
                          <FaTrash /> Delete
                        </button>
                      )
                    }

                    <div className="flex items-center gap-2 mt-4 text-sm text-gray-400">
                      <FaCalendarAlt className="text-indigo-400" />
                      <span>{getTimeAgo(review.createdAt)}</span>
                    </div>

                  </div>
                </div>

                <p className="text-gray-300 mt-4 text-base leading-relaxed">{review.message}</p>
              </div>
            ))
          }
        </div>
      ) : (
        <p className="text-gray-400 text-center">No reviews yet.</p>
      )}

      <div className="flex justify-center items-center gap-4 mt-10">
        {page > 1 && (
          <button
            onClick={() => setPage(page - 1)}
            className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center"
          >
            <FaArrowLeft />
          </button>
        )}
        <span className="text-white text-sm font-medium">
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg flex items-center"
          >
            <FaArrowRight />
          </button>
        )}
      </div>
    </div>

  );
}

export default Reviews