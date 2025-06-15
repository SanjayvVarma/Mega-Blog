import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useReview from '../../hooks/useReview';
import useMessage from '../../hooks/useMessage';
import useSubscriber from '../../hooks/useSubscriber';
import { FaUsers, FaUserTie, FaUserAlt, FaEnvelopeOpenText, FaCommentDots, FaChartLine, FaStar, FaBlog, } from 'react-icons/fa';

const AdminPanel = () => {

  const [users, setUsers] = useState([]);
  const { subscribers } = useSubscriber();
  const { totalReviews } = useReview();
  const { messages } = useMessage()

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/all-users`,
        { withCredentials: true }
      )

      if (res.data.success) {
        setUsers(res.data.data)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(() => {
    fetchUsers()
  }, []);

  const filteredUsers = users.filter((user) => user.role !== "Admin");
  const adminUsers = users.filter((user) => user.role === "Admin");
  const readerUsers = users.filter((user) => user.role === "Reader");
  const blogs = useSelector((state) => state.blogs.blogData);

  const stats = {
    totalUsers: filteredUsers?.length,
    adminUsers: adminUsers?.length,
    readerUsers: readerUsers?.length,
    totalBlogs: blogs?.length,
    subscribers: subscribers?.length,
    reviews: totalReviews,
    message: messages?.length,
    totalHits: 13452,
  };

  const cards = [
    { title: 'Total Users', icon: <FaUsers />, value: stats.totalUsers },
    { title: 'Admin Users', icon: <FaUserTie />, value: stats.adminUsers },
    { title: 'Reader Users', icon: <FaUserAlt />, value: stats.readerUsers },
    { title: 'Total Blogs', icon: <FaBlog />, value: stats.totalBlogs },
    { title: 'Subscribers', icon: <FaEnvelopeOpenText />, value: stats.subscribers },
    { title: 'Messages', icon: <FaCommentDots />, value: stats.message },
    { title: 'Reviews', icon: <FaStar />, value: stats.reviews },
    { title: 'Total Hits', icon: <FaChartLine />, value: stats.totalHits },
  ];

  return (
    <div className="flex-1 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-[#1f2937] via-[#1e3a8a] to-[#0f172a] p-5 rounded-xl border border-[#334155] hover:border-cyan-400 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-md font-medium text-[#e0f2fe] tracking-wide">{card.title}</h3>
              <span className="text-cyan-300 text-xl">{card.icon}</span>
            </div>
            <p className="text-3xl font-extrabold text-cyan-400">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;