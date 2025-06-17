import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const useAllUser = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchUsers = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/all-users`,
                { withCredentials: true }
            )

            if (res.data.success) {
                setUsers(res.data.data)
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, []);

    return { users, isLoading }
};

export default useAllUser;