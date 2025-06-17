import Blogs from "../../pages/Blogs"

const AllBlogs = () => {
    return (
        <div className="overflow-y-auto md:max-h-[calc(100vh-100px)] max-h-[calc(100vh-250px)] scrollbar-hide">
            <Blogs />
        </div>
    )
}

export default AllBlogs;