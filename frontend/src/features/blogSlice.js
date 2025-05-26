import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogData: [],
    status: "idle",
    pages: 1,
    refreshBlogs: false,
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

        deleteBlogs: (state, action) => {
            state.blogData = state.blogData.filter((blog) => (
                blog._id !== action.payload
            ))
        },

        triggerRefreshBlogs(state) {
            state.refreshBlogs = !state.refreshBlogs;
        },

    }
});

export const { setPages, setBlogs, addBlog, updateBlog, deleteBlogs, triggerRefreshBlogs } = blogSlice.actions;

export default blogSlice.reducer;