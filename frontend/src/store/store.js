import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import blogReducer from "../features/blogSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        blogs: blogReducer
    }
});

export default store;
