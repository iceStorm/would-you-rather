import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthService } from './auth.service'
import { LoginParams } from '../../models/LoginParams'
import { RegisterParams } from '../../models/RegisterParams'
import { authSlice, setCurrentUser } from './auth.slice'

// delegating main login to AuthService (frontend), these thunks should only handle end results
export const login = createAsyncThunk('auth/login', async (credentials: LoginParams, { rejectWithValue }) => {
    try {
        await AuthService.login(credentials)
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const verifyToken = createAsyncThunk('auth/verifyToken', async (undefined, { rejectWithValue }) => {
    try {
        const user = await AuthService.verifyToken()
        return user
    } catch (error: any) {
        console.error('verifyToken error:', error)
        return rejectWithValue(error.message)
    }
})

export const register = createAsyncThunk('auth/register', async (credentials: RegisterParams, { rejectWithValue }) => {
    try {
        await AuthService.register(credentials)
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})
