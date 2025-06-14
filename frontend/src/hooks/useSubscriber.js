import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const useSubscriber = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [subscribers, setSubscribers] = useState([]);

    const fetchSubscriber = async () => {
        setIsLoading(true)

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/subscribe/view-subscriber`,
                { withCredentials: true }
            )

            setIsLoading(false)

            if (res.data.success) {
                setSubscribers(res.data.data)
            }

        } catch (error) {
            setIsLoading(false)
            toast.error(error?.response?.data?.message || "Subscriber fetch faild due to some error")
        }
    };

    const deleteSubHandler = async (id) => {
        setIsLoading(true)

        try {

            const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/subscribe/delete-sub/${id}`,
                { withCredentials: true }
            )
            setIsLoading(false)

            if (res.data.success) {
                toast.success(res.data.message || "Subscriber delete successfully")
                fetchSubscriber()
            }

        } catch (error) {
            setIsLoading(false)
            toast.error(error?.response?.data?.message || "Something went wrong")
        }
    };

    useEffect(() => {
        fetchSubscriber()
    }, []);

    return { isLoading, subscribers, deleteSubHandler }
};

export default useSubscriber;