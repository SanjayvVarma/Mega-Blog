import axios from "axios";
import { useState } from "react";
import LoaderSpin from "./LoaderSpin";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { REASON_OPTIONS } from "../utils/constants";

const ReportBlog = ({ blogId }) => {

    const [reportReason, setReportReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()

    const submitReport = async () => {
        setIsLoading(true)
        const reason = { reason: reportReason === "Other" ? customReason : reportReason }

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/report//blog/${blogId}`,
                reason,
                { withCredentials: true }
            )

            if (res.data.success) {
                toast.success(res.data.message || "Report Submitted");
                navigate('/blogs')
                setReportReason('');
                setCustomReason('');
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Report Submit Failed");
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="w-full p-6 bg-gray-900 text-white rounded-xl shadow-lg">
            {isLoading && (<LoaderSpin text="Submitting your report" message="We're reviewing your submission. Please hang tight for just a moment..." />)}

            <label className="block mb-2 text-sm font-medium text-gray-300">
                Select a reason
            </label>
            <select
                value={reportReason}
                onChange={(e) => setReportReason(e.target.value)}
                className="w-full p-3 mb-4 border border-gray-700 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
                <option value="" disabled>-- Select reason --</option>
                {REASON_OPTIONS.map((optVal) => (
                    <option key={optVal} value={optVal}>
                        {optVal}
                    </option>
                ))}
            </select>

            {reportReason === "Other" && (
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-300">
                        Enter your reason
                    </label>
                    <input
                        type="text"
                        placeholder="Describe your reason"
                        value={customReason}
                        onChange={(e) => setCustomReason(e.target.value)}
                        className="w-full p-3 mb-4 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                </div>
            )}

            <button
                onClick={submitReport}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold transition duration-200"
            >
                {isLoading ? 'Submitting...' : 'Submit Report'}
            </button>
        </div>
    )
}

export default ReportBlog;