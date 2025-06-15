import axios from "axios";
import LoaderSpin from "../LoaderSpin";
import { toast } from "react-toastify";
import TotalReviews from "./TotalReviews";
import { useEffect, useState } from "react";

const ReviewForm = ({ user }) => {

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/review/create-review`,
        { fullName, email, message, rating },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Review submitted successfully");
        if (!user) {
          setFullName("");
          setEmail("");
        }
        setMessage("");
        setRating(0);
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit review");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#552525] via-[#252548] to-[#311717] p-5 border-b border-gray-700 shadow-3xl">
      <h3 className="text-3xl font-bold text-yellow-500 text-center mb-8">✍️ Add Your Review</h3>
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-6xl mx-auto hover:shadow-2xl transition duration-300">
        {isLoading && (<LoaderSpin text="Sharing Your Thoughts" message="We're adding your opinion to the conversation..." />)}
        <div>
          <TotalReviews />
        </div>
        <h3 className="text-xl font-semibold text-white mb-6">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={user}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={user}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Your Message</label>
            <textarea
              id="message"
              placeholder="Write your message..."
              className="w-full px-4 py-3 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition min-h-[150px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Your Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className={`text-3xl transition transform hover:scale-125 ${(hoveredRating || rating) >= star ? "text-yellow-400" : "text-gray-500"}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;