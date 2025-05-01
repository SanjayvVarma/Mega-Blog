import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    status: "idle",
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.status = "succeeded";
        },

        clearUser: (state, action) => {
            state.user = {};
            state.status = "idle";
        },

        setLoading: (state) => {
            state.status = "loading";
        },

        setError: (state, action) => {
            state.error = action.payload;
            state.status = "failed";
        }
    }
});

export const { setUser, setError, setLoading, clearUser } = userSlice.actions;
export default userSlice.reducer;