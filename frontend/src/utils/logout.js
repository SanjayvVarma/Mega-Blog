import axios from "axios";
import Swal from "sweetalert2";
import { logout } from "../features/authSlice";
import { clearUser } from "../features/userSlice";
import { toast } from "react-toastify";


const logoutUser = async ({ dispatch, token, navigate, setIsLoading, setLoadingAction }) => {
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
        if (setLoadingAction) setLoadingAction("logout")
        setIsLoading(true)

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
            setIsLoading(false);
            if (setLoadingAction) setLoadingAction("");
        }
    }
};

export default logoutUser;