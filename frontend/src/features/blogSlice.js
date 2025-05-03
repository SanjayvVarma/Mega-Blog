import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogData: [],
    status: "idle",
    error: null,
    pages: 1
}

const blogSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {

        setPages: (state, action) => {
            state.pages = action.payload
        },

        setBlogs: (state, action) => {
            state.blogData = action.payload;
            state.status = "succeeded";
        },

        addBlog: (state, action) => {
            state.blogData.push(action.payload)
        },

        updateBlog: (state, action) => {
            state.blogData = state.blogData.map((blog) => (

                blog._id === action.payload._id ? action.payload : blog

            ))
        },

        deleteBlog: (state, action) => {
            state.blogData = state.blogData.filter((blog) => (

                blog._id !== action.payload

            ))
        },

        setLoading: (state, action) => {
            state.status = "loading";
        },

        setError: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
    }
});

export const { setPages, setBlogs, addBlog, updateBlog, deleteBlog, setLoading, setError } = blogSlice.actions;

export default blogSlice.reducer;