import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const UpdateProfile = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [about, setAbout] = useState('');
    const [answer, setAnswer] = useState('');
    const [education, setEducation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const educationOptions = ["SSC", "INTERMEDIATE", "GRADUATION", "POST GRADUATION", "PhD", "OTHER"];

    useEffect(() => {
        if (user) {
            setFullName(user.fullName || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setAbout(user.about || '');
            setAnswer(user.answer || '');
            setEducation(user.education || '');
        }
    }, [user]);

    const updateProfileHandler = async () => {
        setIsLoading(true);

        if (!answer) {
            toast.error("Security Answer is required");
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/update-details`,
                { fullName, email, phone, about, answer, education, },
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message || "Profile updated successfully");
                dispatch(setUser(res.data.data));
                navigate('/dashboard')
            }

        } catch (error) {
            toast.error(error?.response?.data.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
            style={{ backgroundImage: `url(${user.avatar})` }}
        >
            {isLoading && (
                <div className='fixed inset-0 backdrop-blur-sm bg-black/10 z-40 flex justify-center items-center'>
                    <div className='w-14 h-14 border-4 border-white border-t-pink-600 rounded-full animate-spin'></div>
                </div>
            )}

            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

            <div className="relative z-10 bg-white/10 backdrop-blur-lg p-8 md:p-10 max-w-3xl w-full rounded-2xl shadow-2xl m-4 text-white flex flex-col gap-6">

                <h2 className="text-2xl font-bold text-center text-pink-400">🔧 Update Details</h2>

                <div className="w-full max-w-lg mx-auto flex flex-col gap-4 text-white">

                    <div>
                        <label className="text-sm">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-transparent border border-white/20 text-white"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 rounded bg-transparent border border-white/20 text-white"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Phone</label>
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            maxLength={10}
                            className="w-full px-3 py-2 rounded bg-transparent border border-white/20 text-white"
                        />
                    </div>

                    <div>
                        <label className="text-sm">Security Answer</label>
                        <input
                            type="text"
                            placeholder="Enter your Security Answer"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            maxLength={10}
                            className="w-full px-3 py-2 rounded bg-transparent border border-white/20 text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Select Education</label>
                        <select
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            className="w-full p-3 mt-1 border border-gray-600 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {educationOptions.map((edu, index) => (
                                <option className='bg-gray-800' key={index} value={edu}>
                                    {edu}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm">About (max 60 chars)</label>
                        <textarea
                            placeholder="Tell us about yourself"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            rows={2}
                            maxLength={70}
                            className="w-full p-3 bg-transparent text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none placeholder:text-gray-400"
                        />
                        <small className="text-gray-300">{about.length}/70</small>
                    </div>

                    <button
                        onClick={updateProfileHandler}
                        className="mt-4 w-full bg-pink-600 hover:bg-pink-700 transition-colors py-2 px-4 rounded text-white font-semibold"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfile;