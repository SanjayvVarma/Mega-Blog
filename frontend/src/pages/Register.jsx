import axios from 'axios';
import { Camera } from 'lucide-react';
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import { useRef } from 'react';
import defaultAvatar from '../assets/defaultAvatar.avif'

const Register = () => {


  const educationOptions = ["SSC", "INTERMEDIATE", "GRADUATION", "POST GRADUATION", "PhD", "OTHER"];

  const [showPass, setShowPass] = useState(false)
  const [showComPass, setShowComPass] = useState(false)
  const [passMess, setPassMess] = useState('')
  const [passValidateErr, setpassValidateErr] = useState('')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [answer, setAnswer] = useState('')
  const [password, setPassword] = useState('')
  const [comPassword, setComPassword] = useState('')
  const [education, setEducation] = useState('')
  const [role, setRole] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [preview, setPreview] = useState(defaultAvatar);

  const loadingBar = useRef(null);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const isFormValid = fullName && email && phone && answer && password && comPassword && education && role && password === comPassword

  const handlePasswordValidateErr = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword)

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

    if (!passwordRegex.test(newPassword)) {
      setpassValidateErr("Must include A-Z, a-z, 0-9 & special char");
    } else {
      setpassValidateErr('')
    }

    if (newPassword.length < 6) {
      setpassValidateErr("❌ Password must be at least 6 characters long");
      return;
    }

  }

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

  }

  const handlePassMatch = (e) => {
    const comfirmPassword = e.target.value
    setComPassword(comfirmPassword)

    if (password && comfirmPassword) {
      if (password === comfirmPassword) {
        setPassMess("✅ Passwords match!");
      } else {
        setPassMess("❌ Passwords do not match!");
      }

    } else {
      setComPassword('')
    }
  }

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


    if (!avatar) {
      const response = await fetch(defaultAvatar);
      const blob = await response.blob();
      formData.append("avatar", new File([blob], "defaultAvatar.png", { type: "image/png" }));
    } else {
      formData.append("avatar", avatar);
    }


    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/register`,
        formData,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
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
      setAvatar(null)
      setPreview(defaultAvatar)

    } catch (error) {
      loadingBar.current.complete();
      setIsLoading(false)
      toast.error(error.response?.data?.message || "User Register Failed");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <LoadingBar color="#3b82f6" ref={loadingBar} height={4} />

      {isLoading && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/10 z-40 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="bg-gray-900 shadow-lg rounded-lg flex flex-col w-full max-w-4xl overflow-hidden py-8 px-6 m-5">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-400">USER REGISTRATION</h1>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center text-white">

            {/* Avatar Upload */}
            <div className="w-24 h-24 relative mb-6">
              <img
                src={preview}
                alt="Avatar Preview"
                className="w-full h-full rounded-full border-2 border-blue-500 shadow-md"
              />
              <label className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-700 transition">
                <Camera size={18} />
                <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </label>
            </div>

            {/* Input Fields */}
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
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

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type='email'
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>

                {/* Phone */}
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

                {/* Security Answer */}
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

                {/* Education */}
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

                {/* Select Role */}
                <div>
                  <label className="block text-sm font-medium">Select Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option value="" disabled>Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Reader">Reader</option>
                  </select>
                </div>

                {/* Password */}
                <div className='relative'>
                  <label className="block text-sm font-medium">Password</label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordValidateErr}
                    required
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                  {passValidateErr && <p className='text-red-500 text-sm mt-0.5'>{passValidateErr}</p>}
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute top-9 right-3 text-gray-400"
                  >
                    {showPass ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className='relative'>
                  <label className="block text-sm font-medium">Confirm Password</label>
                  <input
                    type={showComPass ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={comPassword}
                    onChange={handlePassMatch}
                    required
                    className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  />
                  {passMess && <p className={`mt-0.5 text-sm ${password === comPassword ? "text-green-500" : "text-red-500"}`}>{passMess}</p>}
                  <button
                    type="button"
                    className="absolute top-9 right-3 text-gray-400"
                    onClick={() => setShowComPass(!showComPass)}
                  >
                    {showComPass ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </button>
                </div>

              </div>

              {/* Submit Button */}
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
