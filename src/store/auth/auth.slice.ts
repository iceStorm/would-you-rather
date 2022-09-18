import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models/User'
import { AuthService } from './auth.service'
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
        setCurrentUser(state, action: PayloadAction<User | undefined>) {
            console.log('setCurrentUser', action.payload);
            state.currentUser = action.payload
        },
        logOut(state) {
            state.currentUser = undefined
            AuthService.token = ''
        },
    },
    extraReducers: {
        // login
        [login.pending.type]: (state) => {
            state.isSigningIn = true
        },
        [login.fulfilled.type]: (state, action: PayloadAction<User>) => {
            state.isSigningIn = false
            state.currentUser = action.payload
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
            state.currentUser = undefined
            state.isVerifyingToken = false
        },
    },
})

export const { setCurrentUser, logOut } = authSlice.actions
