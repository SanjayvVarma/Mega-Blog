import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    token: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.token = action.payload;
        },

        logout: (state, action) => {
            state.isAuth = false;
            state.token = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;