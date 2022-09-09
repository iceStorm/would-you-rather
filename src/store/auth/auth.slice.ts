import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models/User'
import { login, verifyToken } from './auth.thunks'

export type AuthState = {
    currentUser?: User
    isVerifyingToken: boolean
    isSigningIn: boolean
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isSigningIn: false,
        isVerifyingToken: false,
    } as AuthState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User>) {
            state.currentUser = action.payload
        },
    },
    extraReducers: {
        // login
        [login.pending.type]: (state) => {
            state.isSigningIn = true
        },
        [login.fulfilled.type]: (state) => {
            state.isSigningIn = false
        },
        [login.rejected.type]: (state) => {
            state.isSigningIn = false
        },

        // verify token
        [verifyToken.pending.type]: (state) => {
            state.isVerifyingToken = true
        },
        [verifyToken.fulfilled.type]: (state, action: PayloadAction<User>) => {
            state.currentUser = action.payload
            state.isVerifyingToken = false
        },
        [verifyToken.rejected.type]: (state) => {
            state.isVerifyingToken = false
        },
    },
})

export const { setCurrentUser } = authSlice.actions
