import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useReview from '../../hooks/useReview';
import useMessage from '../../hooks/useMessage';
import useAllUser from '../../hooks/useAllUser';
import useReports from '../../hooks/useReports';
import formatCount from '../../utils/formatCount';
import useSubscriber from '../../hooks/useSubscriber';
import { FaUsers, FaUserTie, FaUserAlt, FaEnvelopeOpenText, FaCommentDots, FaChartLine, FaStar, FaBlog, FaFlag, } from 'react-icons/fa';

const AdminPanel = () => {

  const [totalHits, setToatalHits] = useState(0);
  const { messages } = useMessage();
  const { allReports } = useReports();
  const { totalReviews } = useReview();
  const { subscribers } = useSubscriber();
  const { users, filteredUsers } = useAllUser();

  const adminUsers = users.filter((user) => user.role === "Author");
  const readerUsers = users.filter((user) => user.role === "Reader");
  const blogs = useSelector((state) => state.blogs.blogData);

  useEffect(() => {
    const getHits = async () => {
      try {

        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/hit/total-hits`)

        if (res.data.success) {
          setToatalHits(res.data.data.count)
        }

      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch hits");
      }
    }

    getHits()
  }, []);

  const stats = {
    totalUsers: filteredUsers?.length,
    adminUsers: adminUsers?.length,
    readerUsers: readerUsers?.length,
    totalBlogs: blogs?.length,
    subscribers: subscribers?.length,
    reviews: totalReviews,
    message: messages?.length,
    reports: allReports,
    totalHits: formatCount(totalHits),
  };

  const cards = [
    { title: 'Total Users', icon: <FaUsers />, value: stats.totalUsers },
    { title: 'Author Users', icon: <FaUserTie />, value: stats.adminUsers },
    { title: 'Reader Users', icon: <FaUserAlt />, value: stats.readerUsers },
    { title: 'Total Blogs', icon: <FaBlog />, value: stats.totalBlogs },
    { title: 'Subscribers', icon: <FaEnvelopeOpenText />, value: stats.subscribers },
    { title: 'Messages', icon: <FaCommentDots />, value: stats.message },
    { title: 'Reviews', icon: <FaStar />, value: stats.reviews },
    { title: 'Reports', icon: <FaFlag />, value: stats.reports },
    { title: 'Total Hits', icon: <FaChartLine />, value: stats.totalHits },
  ];

  return (
    <div className="max-h-[calc(100vh-160px)] overflow-y-auto p-6 scrollbar-hide">
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