import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { checkPasswordMatch, validatePassword } from '../../utils/passwordValidation';

const SecurityAnswer = () => {

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
        setNewPassword(password);

        const validationResult = validatePassword(password);
        setPassValidator(validationResult);
    };

    const passwordMatch = (e) => {
        const confirmPassword = e.target.value;
        setComNewPassword(confirmPassword);

        const matchResult = checkPasswordMatch(newPassword, confirmPassword);
        setPassMatch(matchResult);
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
        <div>
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
        </div>
    )
}

export default SecurityAnswer;