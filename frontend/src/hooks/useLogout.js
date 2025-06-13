import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { logout } from "../features/authSlice";
import { clearUser } from "../features/userSlice";

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

    const logoutUser = async ({ setIsLoading, setLoadingAction }) => {
        const result = await Swal.fire({
            title: "Ready to Logout?",
            text: "You will need to sign in again to continue.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel',
            background: '#1f2937',
            color: '#fff',
        });

        if (result.isConfirmed) {
            if (setLoadingAction) setLoadingAction("logout");
            if (setIsLoading) setIsLoading(true);

            try {
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/logout`,
                    {},
                    { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
                )

                if (response.data.success) {
                    dispatch(logout());
                    dispatch(clearUser());
                    toast.success(response.data.message || "Logged out successfully!");
                    navigate("/");
                }

            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred while logging out.");
            } finally {
                if (setIsLoading) setIsLoading(false);
                if (setLoadingAction) setLoadingAction("");
            }
        }
    };

    return logoutUser;
};

export default useLogout;