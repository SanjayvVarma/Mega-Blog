import axios from 'axios';
import { Camera } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import LoaderSpin from '../components/LoaderSpin';
import defaultAvatar from '../assets/defaultAvatar.avif';
import { FaCheckCircle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { checkPasswordMatch, validatePassword } from '../utils/passwordValidation';

const Register = () => {

  const educationOptions = ["BELOW SSC", "SSC", "INTERMEDIATE", "DIPLOMA", "GRADUATION", "POST GRADUATION", "PhD", "OTHER"];
  const titles = ["Mr.", "Mrs.", "Ms.", "Mx."];

  const [showPass, setShowPass] = useState(false);
  const [showComPass, setShowComPass] = useState(false);
  const [passMessage, setPassMessage] = useState('');
  const [passValidator, setPassValidator] = useState('');
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [about, setAbout] = useState('');
  const [answer, setAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [comPassword, setComPassword] = useState('');
  const [education, setEducation] = useState('');
  const [role, setRole] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [otp, setOtp] = useState('')
  const [preview, setPreview] = useState(defaultAvatar);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [otpInputBox, setOtpInputBox] = useState(false);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [termCheck, setTermCheck] = useState(false);

  const loadingBar = useRef(null);
  const navigate = useNavigate();

  const isFormValid = fullName && email && phone && answer && password && comPassword && education && role && isVerified && termCheck && password === comPassword;

  const passwordValidator = (e) => {
    const password = e.target.value;
    setPassword(password);

    const validationResult = validatePassword(password);
    setPassValidator(validationResult);
  };

  const passwordMatch = (e) => {
    const confirmPassword = e.target.value;
    setComPassword(confirmPassword)

    const matchResult = checkPasswordMatch(password, confirmPassword)
    setPassMessage(matchResult)
  };

  const handleAvatarChange = (e) => {

    const file = e.target.files[0]

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        setAvatar(file)
      }
      reader.readAsDataURL(file)
    }
  };

  const startResendTimer = () => {
    setResendAvailable(true);
    setResendTimer(60);

    let timeLeft = 60;
    const interval = setInterval(() => {
      timeLeft -= 1;
      setResendTimer(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(interval);
        setResendAvailable(false);
      }
    }, 1000);
  };

  const sendOtp = async () => {
    setIsLoading(true)

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/otp/send-otp-register`,
        { email },
        { withCredentials: true }
      )

      setIsLoading(false)

      if (res.data.success) {
        toast.success(res.data.message || "Otp Send Successfully")
        setOtpInputBox(true)
        startResendTimer()
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
      setIsLoading(false)
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true)

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/otp/verify-otp`,
        { email, otp },
        { withCredentials: true }
      )

      setIsLoading(false)

      if (res.data.success) {
        toast.success(res.data.message || "otp verified successfully")
        setOtpInputBox(false)
        setIsVerified(true)
      }

    } catch (error) {
      toast.error(error.response?.data?.message || "something went wrong");
      setIsLoading(false)
      setIsVerified(false)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    loadingBar.current.continuousStart();
    setIsLoading(true)

    const formData = new FormData();

    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("answer", answer);
    formData.append("password", password);
    formData.append("education", education);
    formData.append("role", role);
    formData.append("about", about);

    if (!avatar) {
      const response = await fetch(defaultAvatar);
      const blob = await response.blob();
      formData.append("avatar", new File([blob], "defaultAvatar.png", { type: "image/png" }));
    } else {
      formData.append("avatar", avatar);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      )

      loadingBar.current.complete();
      setIsLoading(false)

      if (!response.data.success) {
        toast.error(response.data.message || 'User Register Failed')
      }

      toast.success(response.data.message)
      navigate('/login')

      setFullName('')
      setEmail('')
      setPhone('')
      setAnswer('')
      setPassword('')
      setComPassword('')
      setEducation('')
      setRole('')
      setAbout('')
      setAvatar(null)
      setPreview(defaultAvatar)

    } catch (error) {
      loadingBar.current.complete();
      setIsLoading(false)
      toast.error(error.response?.data?.message || "User Register Failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#5c2a87] via-[#0f0f1c] to-[#860c9c]">
      <LoadingBar color="#3b82f6" ref={loadingBar} height={4} />

      {isLoading && <LoaderSpin text='Verifying' message='Please wait while we complete your registration...' />}

      <div className="bg-gray-900 shadow-lg rounded-lg flex flex-col w-full max-w-4xl overflow-hidden py-8 px-6 m-5">

        <h1 className="text-2xl font-bold text-center mb-6 text-blue-400">USER REGISTRATION</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center text-white">

            <div className="w-24 h-24 relative mb-6">
              <img
                src={preview}
                alt="Avatar Preview"
                className="w-full h-full rounded-full border-2 border-blue-500 shadow-md"
              />
              <label className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-700 transition">
                <Camera size={18} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </label>
            </div>

            <div className="w-full">

              {otpInputBox ? (
                <div>
                  <div className='flex justify-between'>
                    <label className="block text-sm font-medium mb-1">OTP Verification</label>
                    {resendAvailable ? (
                      <p className="text-sm text-gray-400 pr-17 md:pr-32">
                        Didn’t get it?
                        <span className='text-green-500 pr-2'> Resend in {resendTimer}s</span>
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400 pr-17 md:pr-32">
                        Didn’t get it?
                        <button
                          type="button"
                          onClick={sendOtp}
                          className="ml-1 text-blue-400 hover:underline"
                        >
                          Resend OTP
                        </button>
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                      required
                      className="flex-1 p-3 border border-gray-600 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    />
                    <button
                      type="button"
                      onClick={verifyOtp}
                      className="p-3 md:px-10 bg-green-600 hover:bg-green-700 text-white rounded-md"
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        required
                        className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setIsVerified(false);
                        }}
                      />
                      {isVerified && (
                        <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-xl" />
                      )}
                    </div>
                    {!isVerified && (
                      <button
                        type="button"
                        onClick={sendOtp}
                        className="p-3 md:px-10 mt-1 bg-blue-600 hover:bg-blue-800 text-white rounded-md transition-all duration-200"
                      >
                        Send OTP
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">

                <div>
                  <label className="block text-sm font-medium">Select title</label>
                  <select
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="" disabled>Select Title</option>
                    {titles.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    maxLength={10}
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Security Answer</label>
                  <input
                    type="text"
                    placeholder="Enter your Security Answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    required
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Select Education</label>
                  <select
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="" disabled>Select Education</option>
                    {educationOptions.map((edu, index) => (
                      <option key={index} value={edu}>
                        {edu}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Select Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="Author">Author</option>
                    <option value="Reader">Reader</option>
                  </select>
                </div>

                <div className='relative'>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={passwordValidator}
                    required
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                  {passValidator && <p className='text-red-500 text-sm mt-0.5'>{passValidator}</p>}
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute top-9 right-3 text-gray-400"
                  >
                    {showPass ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>

                <div className='relative'>
                  <label className="block text-sm font-medium">Confirm Password</label>
                  <input
                    type={showComPass ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={comPassword}
                    onChange={passwordMatch}
                    required
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                  {passMessage && <p className={`mt-0.5 text-sm ${password === comPassword ? "text-green-500" : "text-red-500"}`}>{passMessage}</p>}
                  <button
                    type="button"
                    className="absolute top-9 right-3 text-gray-400"
                    onClick={() => setShowComPass(!showComPass)}
                  >
                    {showComPass ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>

              </div>

              <div className="">
                <label className="block text-sm font-medium text-white m-2">About Me</label>
                <textarea
                  placeholder="Tell us about yourself"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows={4}
                  maxLength={70}
                  className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-gray-400"
                />
                <small className="text-gray-300">{about.length}/70</small>
              </div>

              <div className="mt-4 flex items-start gap-2">
                <input
                  type="checkbox"
                  value={termCheck}
                  onChange={() => setTermCheck(!termCheck)}
                  className="mt-1 accent-blue-600 w-4 h-4"
                />
                <label className="text-xm text-gray-300 cursor-pointer">
                  I accept the <Link to="/term" className="text-blue-400 hover:underline">Terms and Conditions</Link>.
                </label>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-1/2 py-3 text-white font-semibold rounded-md transition duration-200 ${isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-500 cursor-not-allowed"
                    }`}
                >
                  Register
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;