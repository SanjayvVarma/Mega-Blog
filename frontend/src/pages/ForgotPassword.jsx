import { useState } from 'react';
import { Link } from 'react-router-dom';
import forgotPasswordImg from '../assets/SanjayImgFP.png';
import ViaEmailOtp from '../components/forgotPassword/ViaEmailOtp';
import SecurityAnswer from '../components/forgotPassword/SecurityAnswer';

const ForgotPassword = () => {

    const [resetMethod, setResetMethod] = useState('securityAnswer');

    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-[#5c2a87] via-[#0f0f1c] to-[#860c9c]">
            <div className="bg-gray-900 shadow-lg rounded-lg flex w-full max-w-4xl overflow-hidden m-5">

                <div className="hidden md:block w-1/2">
                    <img
                        src={forgotPasswordImg}
                        alt="Forgot Password"
                        className="h-full w-full object-cover"
                    />
                </div>

                <div className="relative w-full md:w-1/2 p-6 text-white overflow-hidden bg-[#04152D]">

                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-15 md:hidden"
                        style={{ backgroundImage: `url(${forgotPasswordImg})` }}
                    ></div>

                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-center mb-5 text-blue-400">Forgot Password</h2>

                        <div className='flex flex-wrap gap-4 md:gap-10 mb-3'>
                            <div className='flex justify-center items-center'>
                                <input
                                    type="radio"
                                    id="securityAnswer"
                                    value="securityAnswer"
                                    checked={resetMethod === 'securityAnswer'}
                                    onChange={() => setResetMethod('securityAnswer')}
                                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                                />
                                <label htmlFor="securityAnswer" className="ml-2 cursor-pointer">With Security Answer</label>
                            </div>
                            <div className='flex justify-center items-center'>
                                <input
                                    type="radio"
                                    id="emailOtp"
                                    value="emailOtp"
                                    checked={resetMethod === 'emailOtp'}
                                    onChange={() => setResetMethod('emailOtp')}
                                    className="w-4 h-4 accent-blue-500 cursor-pointer"
                                />
                                <label htmlFor="emailOtp" className="ml-2 cursor-pointer">With Email OTP</label>
                            </div>
                        </div>

                        {resetMethod === 'securityAnswer' && <SecurityAnswer />}
                        {resetMethod === 'emailOtp' && <ViaEmailOtp />}

                        <div className="mt-4 text-center">
                            <Link to="/login" className="text-blue-400 text-sm hover:underline">
                                Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ForgotPassword;