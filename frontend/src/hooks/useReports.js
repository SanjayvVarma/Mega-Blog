import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const useReports = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [reports, setReports] = useState([]);
    const [allReports, setAllReports] = useState(0);

    const fetchReports = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/report/getblog-report`,
                { withCredentials: true }
            )

            if (res.data.success) {
                setReports(res.data.data.allBlogsReports)
                setAllReports(res.data.data.totalReportCount)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Reports Fetch Failed")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchReports()
    }, [])

    return { isLoading, reports, allReports };
}

export default useReports;