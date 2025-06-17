import LoaderSpin from "../LoaderSpin";
import { FaCalendarAlt } from "react-icons/fa";
import useAllUser from "../../hooks/useAllUser";
import formatCount from "../../utils/formatCount";
import { getTimeAgo } from "../../utils/timeDate";

const Users = () => {

  const { isLoading, filteredUsers } = useAllUser();

  return (
    <div className="flex-1 p-2">
      {isLoading && (
        <LoaderSpin text="Fetching All Users" message="Please wait while we load all users." />
      )}

      {filteredUsers.length > 0 && (
        <div className="sticky top-0 z-10 py-3 text-center border-b border-gray-700 bg-gray-950">
          <p className="text-lg font-bold text-white">
            Total Users :-{" "}
            <span className="text-green-400">{formatCount(filteredUsers.length)}</span>
          </p>
        </div>
      )}

      <div className="overflow-y-auto md:max-h-[calc(100vh-170px)] max-h-[calc(100vh-250px)] pt-2 pr-2 scrollbar-hide">
        {filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredUsers.map((user) => (
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
                  <button className="bg-red-600 hover:bg-red-700 text-sm px-4 py-1 rounded-full transition-all duration-200">
                    Block
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

export default Users