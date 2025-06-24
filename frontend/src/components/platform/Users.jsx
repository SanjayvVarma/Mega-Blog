import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import LoaderSpin from "../LoaderSpin";
import useAllUser from "../../hooks/useAllUser";
import { getTimeAgo } from "../../utils/timeDate";
import formatCount from "../../utils/formatCount";
import { FaCalendarAlt, FaLock, FaUnlock } from "react-icons/fa";

const Users = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [isBlocking, setIsBlocking] = useState(false);
  const { isLoading, filteredUsers, fetchUsers } = useAllUser();

  const userBlock = async (id) => {
    setIsBlocking(true);

    try {
      const res = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/block-unblock/${id}`,
        {},
        { withCredentials: true }
      )

      if (res.data.success) {
        toast.success(res.data.message || "User Blocked")
        fetchUsers()
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "user block failed")
    } finally {
      setIsBlocking(false);
    }
  };

  const searchUser = filteredUsers.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
    user.phone.includes(searchTerm.trim())
  )

  return (
    <div className="flex-1 px-2">
      {isLoading && (
        <LoaderSpin text="Fetching All Users" message="Please wait while we load all users." />
      )}

      {isBlocking && (
        <LoaderSpin text="Blocking User" message="Please wait while we update the user status." />
      )}

      {searchUser.length > 0 && (
        <div className="sticky top-0 z-10 py-2 text-center border-b border-gray-700 bg-gray-950">
          <p className="text-lg font-bold text-white">
            Total Users :-{" "}
            <span className="text-green-400">{formatCount(searchUser.length)}</span>
          </p>
        </div>
      )}

      <div className="sticky top-0 z-10 py-1 border-b border-gray-700">
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search user by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-transparent text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-y-auto md:max-h-[calc(100vh-200px)] max-h-[calc(100vh-260px)] pt-1 pr-2 scrollbar-hide">
        {searchUser.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {searchUser.map((user) => (
              <div
                key={user._id}
                className="relative group bg-gray-900 border-2 border-gray-700 hover:border-blue-700 rounded-2xl p-4 text-white shadow-lg"
              >
                <div className="flex justify-between">
                  <img
                    src={user.avatar}
                    alt={user.fullName}
                    className="w-16 h-16 rounded-full object-cover border border-gray-500"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{user.fullName}</h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <p className="text-sm text-gray-400">{user.phone}</p>
                  </div>
                </div>

                <div className="my-3 border-t border-gray-600"></div>

                <div className="text-sm text-gray-400 space-y-1">
                  {user.education && <p>🎓 {user.education}</p>}
                  {user.about && <p>📝 {user.about}</p>}
                  <p>🔐 Role: <span className="capitalize text-green-500">{user.role}</span></p>
                </div>

                <div className="my-3 border-t border-gray-600"></div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => userBlock(user._id)}
                    className={`flex items-center gap-2 text-white px-2 py-1 rounded-sm transition-all duration-200 ${user.isBlocked ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
                  >
                    {user.isBlocked ? (
                      <>
                        <FaUnlock className="text-sm" />
                        Unblock
                      </>
                    ) : (
                      <>
                        <FaLock className="text-sm" />
                        Block
                      </>
                    )}
                  </button>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <FaCalendarAlt className="text-indigo-400" />
                    <span>{getTimeAgo(user.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">No users found.</p>
        )}
      </div>
    </div>
  )
}

export default Users;