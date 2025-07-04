import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const useReview = () => {

    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchReviews = async () => {

        try {

            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/review/all-review`,
                { withCredentials: true }
            );

            if (res.data.success) {
                setReviews(res.data.data.reviews);
                setAverageRating(res.data.data.averageRating);
                setTotalReviews(res.data.data.totalReview);
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to fetch reviews");
        } 
    };

    const handleDelete = async (id) => {
        setIsLoading(true)

        try {
            const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/v1/review/delete-review/${id}`,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message || "Review deleted successfully");
                fetchReviews();
            }

        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete review");
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    return { reviews, averageRating, totalReviews, isLoading, handleDelete, fetchReviews };

};

export default useReview;