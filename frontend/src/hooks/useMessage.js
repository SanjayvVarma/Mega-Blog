import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useMessage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const fetchMessage = async () => {
        setIsLoading(true)

        try {

            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/message/all-message`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setMessages(res.data.data)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to message reviews");
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchMessage()
    }, []);

    return { isLoading, messages, fetchMessage }

};

export default useMessage;