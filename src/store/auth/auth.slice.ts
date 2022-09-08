import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../models/User'
import { login } from './auth.thunks'

export type AuthState = {
    currentUser?: User
    isSigningIn: boolean
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: <AuthState>{
        isSigningIn: false,
    },
    reducers: {
        [login.pending.type]: state => {
            state.isSigningIn = true
        },
        [login.fulfilled.type]: state => {
            state.isSigningIn = false
        },
        [login.rejected.type]: state => {
            state.isSigningIn = false
        },
    },
})
