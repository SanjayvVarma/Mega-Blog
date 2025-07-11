import LoaderSpin from "../LoaderSpin";
import { getTimeAgo } from "../../utils/timeDate";
import formatCount from "../../utils/formatCount";
import useSubscriber from "../../hooks/useSubscriber";
import { FaCalendarAlt, FaTrash } from "react-icons/fa";

const Subscriber = () => {

    const { isLoading, subscribers, deleteSubHandler } = useSubscriber();

    return (
        <div className="relative h-full min-h-screen px-4 sm:px-8">
            {isLoading && <LoaderSpin text="Fetching Subscriber" />}
            <div className="sticky top-0 z-10 py-3 text-center border-b border-gray-600">
                <p className="text-lg sm:text-base font-bold">
                    Total Subscribers :- <span className="font-bold text-green-500">{formatCount(subscribers.length)}</span>
                </p>
            </div>

            <div className="max-w-7xl mx-auto mt-1">
                {subscribers.length > 0 ? (
                    <div className="md:max-h-[calc(100vh-160px)] max-h-[calc(100vh-220px)] overflow-y-auto pr-2 scrollbar-hide">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subscribers.map((sub, i) => {
                                const bgGradients = [
                                    'bg-gradient-to-r from-rose-400 via-red-500 to-orange-500',
                                    'bg-gradient-to-r from-indigo-500 to-purple-600',
                                    'bg-gradient-to-r from-pink-500 to-red-500',
                                    'bg-gradient-to-r from-green-500 to-teal-500',
                                    'bg-gradient-to-r from-yellow-500 to-orange-500',
                                    'bg-gradient-to-r from-cyan-500 to-blue-500',
                                    'bg-gradient-to-r from-fuchsia-500 to-rose-500',
                                    'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500',
                                    'bg-gradient-to-r from-teal-400 via-lime-400 to-yellow-400',
                                ]

                                const bgColor = bgGradients[i % bgGradients.length]

                                return (
                                    <div
                                        key={sub._id}
                                        className={`rounded-xl shadow-lg overflow-hidden ${bgColor} transition`}
                                    >
                                        <div className="p-5 flex flex-col justify-between h-full text-white">
                                            <div>
                                                <h2 className="text-2xl font-bold">{sub.fullName}</h2>
                                                <p className="text-sm py-2">{sub.email}</p>
                                            </div>

                                            <div className="mt-4 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs opacity-90">
                                                    <FaCalendarAlt className="text-white/80" />
                                                    <span>{getTimeAgo(sub.createdAt)}</span>
                                                </div>

                                                <button
                                                    onClick={() => deleteSubHandler(sub._id)}
                                                    className="px-3 py-2 bg-red-600 hover:bg-red-800 text-white text-xs rounded-md flex items-center gap-1 shadow-sm transition-all duration-200"
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-300 mt-16">
                        <h1 className="text-xl font-bold">No subscribers yet</h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Subscriber;