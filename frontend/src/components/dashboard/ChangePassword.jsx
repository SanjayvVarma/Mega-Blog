import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';
import LoaderSpin from '../LoaderSpin';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import forgotPassImg from '../../assets/passwordForgot.png';

const ChangePassword = ({ setComponents }) => {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showComPassword, setShowComPassword] = useState(false);
    const [passValidator, setPassValidator] = useState('')
    const [passMatch, setPassMatch] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [comNewPassword, setComNewPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const isFormValid = oldPassword && newPassword && comNewPassword && newPassword === comNewPassword

    const passwordValidator = (e) => {
        const password = e.target.value;
        setNewPassword(password)

        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        if (!passwordRegex.test(password)) {
            setPassValidator("Must include A-Z, a-z, 0-9 & special char")
        } else {
            setPassValidator('')
        }

        if (password.length < 6) {
            setPassValidator("❌ Password must be at least 6 characters long");
            return;
        }
    };

    const passwordMatch = (e) => {
        const password = e.target.value;
        setComNewPassword(password)

        if (newPassword && password) {
            if (newPassword === password) {
                setPassMatch("✅ Passwords match!");
            } else {
                setPassMatch("❌ Passwords do not match!");
            }
        } else {
            setComNewPassword('')
        }
    };

    const changePasswordHandle = async (e) => {
        e.preventDefault();
        setIsLoading(true)

        try {

            const response = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/change-password`,
                { oldPassword, newPassword },
                { withCredentials: true, }
            )

            if (response.data.success) {
                toast.success(response.data.message || "password changed")
                setOldPassword('')
                setNewPassword('')
                setComNewPassword('')
                setIsLoading(false)
                setComponents("Profile")
            }

        } catch (error) {

            toast.error(error?.response?.data?.message || "Something went wrong");
            setIsLoading(false)

        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
            style={{ backgroundImage: `url(${forgotPassImg})` }}
        >
            {isLoading &&
                <LoaderSpin text="Changing Password" message="Please wait while we update your password...." />
            }

            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

            <div className="relative z-10 bg-gray-500/10 backdrop-blur-lg p-20 max-w-3xl w-full rounded-xl shadow-2xl text-white flex flex-col items-center gap-5">

                <div className="w-full flex flex-col gap-2">
                    <h2 className="text-2xl font-bold text-center mb-5 text-blue-400">Change Password</h2>

                    <form onSubmit={changePasswordHandle} className='flex flex-col gap-8' >
                        <div className="relative">
                            <label className="block text-sm font-medium">Old Password</label>
                            <input
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Enter your old password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                                className="w-full p-2.5 mt-1 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pr-10"
                            />
                            <button
                                type="button"
                                className="absolute top-9 right-3 text-gray-400"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {showOldPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
                            </button>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium">New Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your new password"
                                value={newPassword}
                                onChange={passwordValidator}
                                required
                                className="w-full p-2.5 mt-1 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pr-10"
                            />
                            {passValidator && <p className='text-red-500 text-sm mt-0.5'>{passValidator}</p>}
                            <button
                                type="button"
                                className="absolute top-9 right-3 text-gray-400"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
                            </button>
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium">Confirm New Password</label>
                            <input
                                type={showComPassword ? "text" : "password"}
                                placeholder="confirm new password"
                                value={comNewPassword}
                                onChange={passwordMatch}
                                required
                                className="w-full p-2.5 mt-1 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white pr-10"
                            />
                            {passMatch && <p className={`mt-0.5 text-sm ${newPassword === comNewPassword ? "text-green-500" : "text-red-500"}`}>{passMatch}</p>}

                            <button
                                type="button"
                                className="absolute top-9 right-3 text-gray-400"
                                onClick={() => setShowComPassword(!showComPassword)}
                            >
                                {showComPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`py-3 text-white font-semibold rounded-md transition duration-200 ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : "bg-gray-500 cursor-not-allowed"}`}
                        >
                            Change Password
                        </button>
                    </form>

                </div>
            </div>
        </div>

    )
}

export default ChangePassword;