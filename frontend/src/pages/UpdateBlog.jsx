import axios from 'axios';
import { HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import LoadingBar from 'react-top-loading-bar';
import { updateBlog } from '../features/blogSlice';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBlog = () => {

    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [mainImage, setMainImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingBar = useRef(null);
    const categories = ["Technology", "Health", "Lifestyle", "Education", "Business", "Sports", "Others"];


    useEffect(() => {

        const fetchBlog = async () => {

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/single-blog/${id}`,
                    { withCredentials: true }
                );

                if (res.data.success) {
                    setBlog(res.data.data);
                }

            } catch (error) {
                toast.error(error?.response?.data.message || 'Failed to fetch blog');
            }
        };

        fetchBlog();

    }, [id]);

    const handleChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value });
    };

    const removeSection = (index) => {
        const updatedSections = [...blog.sections];
        updatedSections.splice(index, 1);
        setBlog({ ...blog, sections: updatedSections });
    };

    const handleSectionChange = (index, field, value) => {
        const updatedSections = [...blog.sections];
        updatedSections[index][field] = value;
        setBlog({ ...blog, sections: updatedSections });
    };

    const handleSectionImageChange = (index, e) => {
        const file = e.target.files[0];
        const updatedSections = [...blog.sections];
        updatedSections[index].imageFile = file;
        setBlog({ ...blog, sections: updatedSections });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        loadingBar.current.continuousStart();

        const formData = new FormData();
        formData.append('title', blog.title);
        formData.append('intro', blog.intro);
        formData.append('category', blog.category);
        formData.append('published', blog.published);

        if (mainImage) {
            formData.append('mainImage', mainImage);
        }

        const sectionData = blog.sections.map(({ title, description }) => ({ title, description }));

        formData.append('sections', JSON.stringify(sectionData));

        blog.sections.forEach((section, index) => {
            if (section.imageFile) {
                formData.append(`sectionImages_${index}`, section.imageFile);
            }
        });

        try {
            const res = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/blog/update-blog/${id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                }
            );

            setIsLoading(false);
            loadingBar.current.complete();

            if (res.data.success) {
                toast.success(res?.data.message || 'Blog updated successfully!');
                if (res.data.data) {
                    dispatch(updateBlog(res.data.data))
                }
                navigate('/blogs')
            }

        } catch (err) {
            toast.error(err?.response?.data?.message || 'Failed to update the blog');
            setIsLoading(false);
            loadingBar.current.complete();
        }
    };

    return (
        <div>
            {blog ? (
                <div
                    className="min-h-screen bg-cover bg-center flex justify-center items-center relative"
                    style={{ backgroundImage: `url(${blog.mainImage})` }}
                >
                    <LoadingBar color="#3b82f6" ref={loadingBar} height={4} />

                    {isLoading && (
                        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col gap-4 items-center justify-center z-50 text-white">
                            <div className="w-12 h-12 border-4 border-white border-t-blue-500 rounded-full animate-spin"></div>
                            <div className="flex gap-1 text-lg font-semibold">
                                <span>Updating blog</span>
                                <span className="animate-pulse">.</span>
                                <span className="animate-pulse animation-delay-200">.</span>
                                <span className="animate-pulse animation-delay-400">.</span>
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/70 backdrop-blur-lg z-0"></div>

                    <div className="relative border border-white my-3 z-10 w-full max-w-4xl mx-auto p-6 backdrop-blur-lg text-white rounded-xl shadow-lg">
                        <h1 className="text-3xl font-bold mb-6 text-center text-blue-400">Update Blog</h1>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block mb-2 text-lg">Category</label>
                                <select
                                    className="w-full p-3 mt-1 border border-gray-400 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    name="category"
                                    value={blog.category}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Blog Category</option>
                                    {categories.map((cat, idx) => (
                                        <option className='bg-gray-800' key={idx} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 text-lg">Blog Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Blog title is required"
                                    className="w-full p-2.5 mt-1 border border-gray-400 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    value={blog.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-lg">Blog Intro</label>
                                <textarea
                                    name="intro"
                                    rows="4"
                                    placeholder="Start your blog with an engaging introduction... (min 50 characters)"
                                    className="w-full p-2.5 mt-1 border border-gray-400 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                    value={blog.intro}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block mb-2 text-lg text-white">Blog Main Image</label>
                                <div className="flex items-center justify-between flex-wrap gap-8 px-6 py-5 rounded-xl">
                                    <label className="w-40 h-40 flex items-center justify-center border-2 border-dashed border-gray-500 text-gray-400 cursor-pointer rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-300">
                                        {mainImage ? (
                                            <img
                                                src={URL.createObjectURL(mainImage)}
                                                alt="Main Image"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <img
                                                src={blog.mainImage}
                                                alt="Main Image"
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setMainImage(e.target.files[0])}
                                            className="hidden"
                                        />
                                    </label>
                                    <div className="border border-gray-400 rounded-lg p-5 max-w-md">
                                        <p className="text-gray-200 text-sm leading-relaxed">
                                            Upload a high-quality main image that captures the essence of your blog post.
                                            <br /><br />
                                            Tip : Clear, attractive images can make your blog more engaging!
                                            <br />
                                            Click on the box to select an image file.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <hr />

                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold my-4 text-center">Sections</h2>
                                {blog.sections.map((section, index) => (
                                    <div key={index} className="border rounded-lg p-4 space-y-4 relative bg-transparent">
                                        <button
                                            type="button"
                                            className="absolute top-2 right-3 cursor-pointer bg-red-500 p-1 rounded-full hover:bg-red-600"
                                            onClick={() => removeSection(index)}
                                        >
                                            <HiX size={20} />
                                        </button>
                                        <div>
                                            <label className="text-lg block mb-2">Sub Title {index + 1}</label>
                                            <input
                                                type="text"
                                                placeholder="Make your blog shine with a great sub-title"
                                                className="w-full p-2.5 mt-1 border border-gray-400 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                                value={section.title}
                                                onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-lg">Description</label>
                                            <textarea
                                                rows="4"
                                                placeholder="Write a detailed description for your blog"
                                                className="w-full p-2.5 mt-1 border border-gray-400 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                                                value={section.description}
                                                onChange={(e) => handleSectionChange(index, 'description', e.target.value)}
                                            ></textarea>
                                        </div>
                                        <div className="flex flex-col justify-center items-center">
                                            <label className="block mb-2 text-lg">Section Image</label>
                                            <label className="w-32 h-32 flex items-center justify-center border-2 border-dashed border-gray-400 text-gray-500 cursor-pointer rounded-md overflow-hidden">
                                                {section.imageFile ? (
                                                    <img
                                                        src={URL.createObjectURL(section.imageFile)}
                                                        alt="Section"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : section.image ? (
                                                    <img
                                                        src={section.image}
                                                        alt="Section"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-5xl text-white bg-green-900 p-16">+</span>
                                                )}

                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleSectionImageChange(index, e)}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setBlog({ ...blog, sections: [...blog.sections, { title: '', description: '', image: null }] })}
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md"
                                >
                                    + Add Section
                                </button>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    checked={blog.published}
                                    onChange={() => setBlog({ ...blog, published: !blog.published })}
                                />
                                <label htmlFor="published" className="text-lg">Publish Blog</label>
                            </div>

                            <div className="flex justify-center gap-8">
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Update Blog'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-black text-white">
                    <span>Loading blog details</span>
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse animation-delay-200">.</span>
                    <span className="animate-pulse animation-delay-400">.</span>
                </div>
            )}
        </div>
    );
};

export default UpdateBlog;