import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthServer } from '../../backend/auth.server'

const LOCAL_STORATE_KEY_JWT_TOKEN = 'auth-token'

export const login = createAsyncThunk('auth/login', async (undefined, { rejectWithValue }) => {
    try {
        const authToken = await AuthServer.login('', '')
        localStorage.setItem(LOCAL_STORATE_KEY_JWT_TOKEN, authToken)
    } catch (error) {
        rejectWithValue(error)
    }
})

export const verifyToken = createAsyncThunk('auth/verifyToken', async (undefined, { rejectWithValue }) => {
    try {
        await AuthServer.verifyToken(localStorage.getItem(LOCAL_STORATE_KEY_JWT_TOKEN) || '')
    } catch (error) {
        rejectWithValue(error)
    }
})
