import axios from "axios";
import { useState } from "react";
import { FiSend } from "react-icons/fi"
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const AskAi = () => {
    const [messages, setMessages] = useState([]);
    const [questions, setQuestions] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAsk = async () => {
        if (!questions.trim()) return;

        const newMessages = [...messages, { role: "user", content: questions }];
        setMessages(newMessages);
        setQuestions("");
        setIsLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/ai/ask`,
                { questions },
                { withCredentials: true }
            );

            if (res.data.success) {
                setMessages([...newMessages, { role: "ai", content: res.data.data }]);
            }

        } catch (error) {
            setMessages([...newMessages, { role: "ai", content: "❌ Something went wrong. Please try again." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setMessages([]);
        setQuestions("");
    };

    return (
        <div className="flex ab flex-col h-screen bg-gray-900 text-gray-100">
            <div className="flex items-center justify-between h-12 bg-gray-800 shadow-md px-6 font-semibold text-gray-100 fixed top-0 left-0 w-full z-10">
                <span className="text-lg flex items-center gap-2">
                    🤖 Ask <span className="text-green-400">SKBlogAI</span>
                </span>
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="hover:text-green-400 transition-colors"
                    >
                        Home
                    </Link>
                    <button
                        onClick={handleReset}
                        className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg text-sm shadow-md transition"
                    >
                        Reset Chat
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 mt-8 space-y-4 scrollbar-hide">
                {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-full px-10 py-2 rounded-2xl shadow-md break-words ${msg.role === 'user'
                                ? 'bg-gray-700 text-white rounded-br-none'
                                : 'text-gray-100 rounded-bl-none'
                                }`}
                        >
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-gray-800 px-4 py-2 rounded-2xl rounded-bl-none flex items-center gap-2 animate-pulse">
                            <span className="text-gray-200 font-medium">Thinking</span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                            <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-800 border-t border-gray-700">
                <textarea
                    className="flex-1 bg-gray-900 text-gray-100 rounded-xl px-4 py-2 border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-inner"
                    placeholder="Type your question..."
                    rows={1}
                    value={questions}
                    onChange={(e) => setQuestions(e.target.value)}
                />
                <button
                    onClick={handleAsk}
                    disabled={isLoading}
                    className="bg-green-700 hover:bg-green-600 p-3 rounded-full flex items-center justify-center shadow-md disabled:opacity-50 transition"
                >
                    <FiSend className="text-gray-100 h-5 w-5" />
                </button>
            </div>
        </div>

    );
};

export default AskAi;