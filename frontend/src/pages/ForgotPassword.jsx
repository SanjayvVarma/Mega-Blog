import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showComPassword, setShowComPassword] = useState(false);
    const [passValidator, setPassValidator] = useState('');
    const [passMatch, setPassMatch] = useState('');
    const [username, setUsername] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [comNewPassword, setComNewPassword] = useState('');

    const navigate = useNavigate();
    const isFormValid = username && answer && newPassword && comNewPassword && newPassword === comNewPassword

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

    const handleForgotPassword = async (e) => {
        e.preventDefault()

        const formData = { answer, newPassword }

        if (username.includes('@')) {
            formData.email = username
        } else {
            formData.phone = username
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/forgot-password`,
                formData,
                {
                    headers: { "Content-Type": "application/json", },
                    withCredentials: true,
                }
            )

            if (response.data.success) {
                toast.success(response.data.message || "Password reset successful!");
                navigate('/login')
                setUsername('');
                setAnswer('');
                setNewPassword('');
                setComNewPassword('');
            }

        } catch (error) {
            toast.error(error?.response?.data.message || "Something went wrong !");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-[#5c2a87] via-[#0f0f1c] to-[#860c9c]">
            <div className="bg-gray-900 shadow-lg rounded-lg flex w-full max-w-4xl overflow-hidden m-5">

                <div className="hidden md:block w-1/2">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDuV_oZ2ZEdQGDzDbc2WcBAODVOP_xNFnz7A&s"
                        alt="Forgot Password"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="w-full md:w-1/2 p-6 bg-[#04152D] text-white">
                    <h2 className="text-2xl font-bold text-center mb-5 text-blue-400">Forgot Password</h2>

                    <form onSubmit={handleForgotPassword}>

                        <div className="mb-3">
                            <label className="block text-sm font-medium">Email or Phone</label>
                            <input
                                type="text"
                                placeholder="Enter your email or phone"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full p-2.5 mt-1 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-sm font-medium">Security Answer</label>
                            <input
                                type="text"
                                placeholder="Enter your security answer (e.g., your pet’s name)"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                required
                                className="w-full p-2.5 mt-1 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        </div>

                        <div className="mb-3 relative">
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

                        <div className="mb-3 relative">
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
                            className={`w-full py-3 text-white font-semibold rounded-md transition duration-200 ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : "bg-gray-500 cursor-not-allowed"}`}
                        >
                            Reset Password
                        </button>

                    </form>

                    <div className="mt-4 text-center">
                        <Link to="/login" className="text-blue-400 text-sm hover:underline">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;