import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import LoaderSpin from "../LoaderSpin";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";

const ViaEmailOtp = () => {

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [conNewPassword, setConNewPassword] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConPassword, setShowNewConPassword] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const isFormValid = email && newPassword && conNewPassword && newPassword === conNewPassword


  const sendOtp = async () => {
    setIsLoading(true)

    try {

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/otp/send-otp-reset`,
        { email },
        { withCredentials: true }
      );

      setIsLoading(false)

      if (res.data.success) {
        toast.success(res.data.message || "OTP Send Successfully");
        setIsOtpSent(true)
      }

    } catch (error) {
      toast.error(error?.response?.data.message || "Something went wrong !");
      setIsLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    setIsLoading(true)

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/otp/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );

      setIsLoading(false)

      if (res.data.success) {
        toast.success(res.data.message || "OTP Verified")
        setIsOtpSent(false)
        setShowPasswordInput(true)
        setIsVerified(true)
        setOtp('')
      }

    } catch (error) {
      toast.error(error?.response?.data.message || "Something went wrong !");
      setIsLoading(false)
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setShowPasswordInput(false)
    setIsOtpSent(false)
    setIsVerified(false)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/reset-password`,
        { email, newPassword },
        { withCredentials: true }
      );

      setIsLoading(false)

      if (res.data.success) {
        toast.success(res.data.message || "Password Reset Successfully!")
        navigate("/login")
        setEmail('')
        setNewPassword('')
        setConNewPassword('')

      }

    } catch (error) {
      toast.error(error?.response?.data.message || "Something went wrong !");
      setIsLoading(false)
    }
  };

  return (
    <div>
      {isLoading &&
        <LoaderSpin text="Just a moment..." message="Processing your request securely..." />
      }

      <form onSubmit={handleSubmit}>

        <div className="mb-3 relative">
          <label className="block text-sm font-medium">Registered Email</label>
          <input
            type="email"
            placeholder="Enter your Registered Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full mt-1 p-2.5 border border-gray-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          {isVerified && <FaCheckCircle className="absolute right-3 top-9 text-green-500 text-xl" />}
        </div>

        {showPasswordInput ? (
          <div>
            <div className="mb-3 relative">
              <label className="block text-sm font-medium">New Password</label>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2.5 mt-1 border border-gray-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-9 right-3 text-gray-400"
              >
                {showNewPassword ? <FaEye size={24} /> : <FaEyeSlash size={24} />}
              </button>
            </div>

            <div className="mb-3 relative">
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                type={showNewConPassword ? "text" : "password"}
                placeholder="Enter your new confirm password"
                value={conNewPassword}
                onChange={(e) => setConNewPassword(e.target.value)}
                className="w-full p-2.5 mt-1 border border-gray-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              />
              <button
                type="button"
                onClick={() => setShowNewConPassword(!showNewConPassword)}
                className="absolute top-9 right-3 text-gray-400"
              >
                {showNewConPassword ? (<FaEye size={24} />) : (<FaEyeSlash size={24} />)}
              </button>

            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 font-semibold rounded-md transition duration-200 ${isFormValid ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-500 cursor-not-allowed"}`}
            >
              Reset Password
            </button>

          </div>
        ) : (
          isOtpSent ? (
            <div>
              <div className="mb-3">
                <label className="block text-sm font-medium">OTP</label>
                <input
                  type="text"
                  placeholder="Enter Email OTP (6 digits)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full p-2.5 mt-1 border border-gray-500 bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div className="text-center">
                <button
                  type="button"
                  onClick={verifyOtp}
                  className="px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  Verify OTP
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <button
                type="button"
                onClick={sendOtp}
                className="px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
              >
                Send OTP
              </button>
            </div>
          )
        )}

      </form>
    </div >
  )
}

export default ViaEmailOtp;