import axios from "axios";
import LoaderSpin from "../LoaderSpin";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import welcomeVerifyImg from "../../assets/welcomeVerify.webp";

const VerifySubscribe = () => {

    const [message, setMessage] = useState("Verifying your email...");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const verifyEmail = async () => {
        setIsLoading(true)
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/subscribe/verify?token=${token}`);

            setIsLoading(false)
            if (res.data.success) {
                setName(res.data.data.fullName)
                toast.success(res.data.message || "Subscription verified!");
                setMessage("✅ Email verified successfully!");
            }

        } catch (error) {
            setMessage("❌ Something went wrong during verification.");
            toast.error(error?.response?.data?.message || "Verification failed.");
            setIsLoading(false)
        }
    };

    useEffect(() => {

        if (token) {
            verifyEmail();
        } else {
            setMessage("❌ No token found in the URL.");
        }
    }, [token]);

    return (
        <div className="bg-gradient-to-br from-[#2b2b7f] via-[#1b1b32] to-[#591091] min-h-screen flex flex-col items-center px-4">

            <div className="text-white shadow-md py-2 px-10 flex justify-center gap-10 z-10 relative border-b border-blue-600">
                <p className="relative flex items-center h-11 rounded-full text-lg font-extrabold bg-gradient-to-r from-blue-900 via-cyan-600 to-blue-900 borderAnimation border-2 font-semibold tracking-wide font-serif">
                    <span className="relative z-10 left-7 bottom-3 text-cyan-300 drop-shadow-md">SK</span>
                    <span className="absolute left-1/2 transform -translate-x-1/2 text-4xl heart-animate">💞</span>
                    <span className="relative z-10 text-blue-200 right-3 top-2 drop-shadow-md" >BLOG</span>
                </p>
                <div className="relative flex items-center h-11 rounded-xl p-1 font-extrabold bg-gradient-to-r from-blue-900 via-cyan-600 to-blue-900 borderAnimation border-2 tracking-wide font-serif">
                    <h1 className="text-[16px] p-3 md:text-xl font-semibold text-white md:animate-bounce">WELCOME TO MEGA SKBLOG</h1>
                </div>
            </div>

            <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 text-white p-8 mt-30 rounded-2xl shadow-lg max-w-xl w-full space-y-4">
                <h2 className="text-2xl font-bold tracking-wide">
                    {name && `Welcome, ${name}!`}
                </h2>
                <p className="text-lg font-medium">{message}</p>

            </div>
            <img
                src={`${welcomeVerifyImg}`}
                alt="Welcome"
                className="p-5"
            />
            {isLoading && (
                <div className="pt-4">
                    <LoaderSpin text="Verifying your email" message="Please Wait While Verifying your email..." />
                </div>
            )}
        </div>
    );
};

export default VerifySubscribe;