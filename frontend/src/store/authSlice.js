import { createSlice } from '@reduxjs/toolkit'



const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: localStorage.getItem('accessToken') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        user: null,
    },
    reducers: {
        setAuth(state, action) {
            state.token = action.payload.token
            state.refreshToken = action.payload.refreshToken
            state.user = action.payload.user
            state.role = action.payload.role
        },
        logout(state) {
            state.token = null
            state.refreshToken = null
            state.user = null
            state.role = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },
    },
});

export const { setAuth, logout } = authSlice.actions
export default authSlice.reducer