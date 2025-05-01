import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaTrash } from "react-icons/fa";


const ReviewForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.user.user);

  const fetchReviews = async () => {

    try {
      const res = await axios.get(`http://localhost:8080/api/v1/review/all-review?page=${page}&limit=3`,
        { withCredentials: true }
      );
      
      setReviews(res.data.data.reviews);
      setTotalPages(res.data.data.totalPages);

    } catch (error) {

      toast.error(error?.response?.data?.message || "Failed to fetch reviews");

    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/v1/review/create-review",
        { fullName, email, message, },
        { withCredentials: true }
      );

      toast.success("Review submitted successfully");
      setFullName("");
      setEmail("");
      setMessage("");
      fetchReviews();

    } catch (error) {

      toast.error(error?.response?.data?.message || "Failed to submit review");

    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/review/delete-review/${id}`,
        { withCredentials: true, }
      );

      toast.success("Review deleted successfully");
      fetchReviews();

    } catch (error) {

      toast.error(error?.response?.data?.message || "Failed to delete review");

    }
  };

  return (
    <div className="bg-gray-900 p-8 border-b border-gray-700 shadow-3xl">

      <h3 className="text-3xl font-bold text-yellow-500 text-center mb-6">✍️ Add Your Review </h3>

      <div className="flex flex-col md:flex-row md:space-x-8 space-y-10 md:space-y-0">

        <div className="flex-1 bg-gray-800 p-8 rounded-lg shadow-lg">

          <h3 className="text-xl font-semibold text-white mb-4">Leave a Reviews</h3>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="flex flex-col">
              <label htmlFor="fullName" className="text-white text-sm font-medium mb-2">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-600 transition"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-white text-sm font-medium mb-2">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-600 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="text-white text-sm font-medium mb-2">Your Message</label>
              <textarea
                id="message"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-600 transition min-h-[150px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-md transition duration-300"
            >
              Submit Review
            </button>

          </form>
        </div>


        <div className="flex-1 bg-gray-800 p-8 rounded-lg shadow-lg">

          <h3 className="text-xl font-semibold text-white mb-4">Reviews</h3>

          {
            reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review._id} className="bg-gray-700 p-6 rounded-lg text-white shadow-md mb-4 flex flex-col space-y-3">

                  <div className="flex justify-between items-start">

                    <div>
                      <p className="text-lg font-semibold">{review.fullName}</p>
                      <p className="text-sm text-yellow-300">{review.email}</p>
                    </div>

                    <div className="text-right flex flex-col items-end">

                      <div className="flex items-center text-sm text-gray-400 gap-2">

                        <FaCalendarAlt className="text-indigo-400" />
                        <span>
                          {
                            new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", })
                          }
                        </span>
                      </div>

                      {
                        (isAuth && user?._id === review.createdBy.toString()) && (
                          <button
                            onClick={() => handleDelete(review._id)}
                            className="mt-2 rounded-full p-1.5 bg-red-500 text-white hover:text-blue-300 transition duration-300 flex items-center gap-2 text-sm"
                          >
                            <FaTrash />
                          </button>
                        )
                      }
                    </div>
                  </div>

                  <p className="text-gray-300 text-base">{review.message}</p>

                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews yet.</p>
            )
          }

          <div className="flex justify-center items-center gap-4 mt-6">
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center"
              >
                <FaArrowLeft />
              </button>
            )}

            <span className="text-white text-sm font-medium">Page {page} of {totalPages}</span>

            {page < totalPages && (
              <button
                onClick={() => setPage(page + 1)}
                className="text-white bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md flex items-center"
              >
                <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default ReviewForm;
