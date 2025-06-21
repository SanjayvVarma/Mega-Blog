import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import LoaderSpin from '../LoaderSpin';
import { MdSend } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import useMessage from "../../hooks/useMessage";
import { getTimeAgo } from "../../utils/timeDate";
import formatCount from "../../utils/formatCount";

const Message = () => {

  const [isSendLoading, setIsSendLoading] = useState(false);
  const [reply, setReply] = useState('');
  const [replyActiveId, setReplyActiveId] = useState(null);
  const { isLoading, messages, fetchMessage } = useMessage();

  const sendReply = async (id) => {
    setIsSendLoading(true)

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/message//send-reply/${id}`,
        { reply },
        { withCredentials: true }
      )

      setIsSendLoading(false)

      if (res.data.success) {
        toast.success(res.data.message || "Reply Send Successfully")
        setReply('')
        setReplyActiveId(null)
        fetchMessage()
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send message reply");
      setIsSendLoading(false)
    }

  };

  return (
    <div>
      <div className="flex-1 p-2 rounded-2xl">
        {isLoading && (
          <LoaderSpin text="Fetching User Messages" message="Please wait while we load user messages." />
        )}

        {messages.length > 0 && (
          <div className="sticky top-0 z-10 py-3 text-center border-b border-gray-600">
            <p className="text-lg sm:text-base font-bold">
              Total Users Message : - <span className="font-bold text-green-500">{formatCount(messages.length)}</span>
            </p>
          </div>
        )}

        <div className="md:max-h-[calc(100vh-160px)] max-h-[calc(100vh-270px)] overflow-y-auto pt-1 pr-2 scrollbar-hide">
          {messages && messages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {messages.map((message) => (
                <div key={message._id} className="relative group bg-gradient-to-br from-[#252555] via-[#252548] to-[#171731] border border-gray-700 rounded-2xl p-6 text-white flex flex-col justify-between min-h-[280px] shadow-xl transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]" >
                  <div className="absolute -inset-[1px] rounded-2xl border border-transparent group-hover:border-indigo-500 transition-all duration-300 pointer-events-none blur-[1px]"></div>

                  <div className="flex flex-wrap gap-2 justify-between items-start">

                    <div>
                      <p className="text-lg font-semibold tracking-wide">{message.fullName}</p>
                      <p className="text-sm text-gray-400">{message.email}</p>
                    </div>

                    <div className="flex flex-col gap-1">

                      <button
                        onClick={() => {
                          setReplyActiveId(replyActiveId === message._id ? null : message._id);
                          setReply('');
                        }}
                        className=" py-0.5 bg-blue-600 hover:bg-blue-700 rounded-md"
                      >
                        Reply
                      </button>

                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FaCalendarAlt className="text-indigo-400" />
                        <span>{getTimeAgo(message.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="w-full border-b border-gray-400 my-2"></div>

                  <div className="text-gray-300 text-base mt-4 leading-relaxed tracking-wide flex-1">
                    <ul className="list-decimal list-inside space-y-1 pl-4">
                      {message?.message?.map((val, idx) => (
                        <li key={idx} className="text-gray-200">
                          {val}
                        </li>
                      ))}
                    </ul>
                  </div>


                  <div className="w-full border-b border-gray-400 my-2"></div>

                  {replyActiveId === message._id && (
                    <div className="flex gap-2 items-start">
                      <input
                        type="text"
                        placeholder="Type your reply..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-400 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                      />
                      <button
                        onClick={() => sendReply(message._id)}
                        disabled={!reply}
                        className={`mt-1 p-2 rounded-full shadow-md transition duration-200 ${reply ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}
                      >
                        {isSendLoading ? (
                          <div className="w-6 h-6 border-4 border-white border-t-green-700 rounded-full animate-spin"></div>
                        ) : (
                          <MdSend className="w-5 h-5 text-white" />
                        )}

                      </button>
                    </div>
                  )}

                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center">No message yet.</p>
          )}

        </div>
      </div>
    </div>
  )
}

export default Message;