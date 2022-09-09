import { createAsyncThunk } from '@reduxjs/toolkit'

import { AuthServer } from '../../backend/auth.server'
import { LoginParams } from '../../models/LoginParams'
import { RegisterParams } from '../../models/RegisterParams'

const LOCAL_STORATE_KEY_JWT_TOKEN = 'auth-token'

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }: LoginParams, { rejectWithValue }) => {
        try {
            const authToken = await AuthServer.login(username, password)
            localStorage.setItem(LOCAL_STORATE_KEY_JWT_TOKEN, authToken)
        } catch (error) {
            rejectWithValue(error)
        }
    },
)

export const verifyToken = createAsyncThunk('auth/verifyToken', async (undefined, { rejectWithValue }) => {
    try {
        await AuthServer.verifyToken(localStorage.getItem(LOCAL_STORATE_KEY_JWT_TOKEN) || '')
    } catch (error) {
        rejectWithValue(error)
    }
})

export const register = createAsyncThunk(
    'auth/register',
    async ({ username, password, fullName }: RegisterParams, { rejectWithValue }) => {
        try {
            await AuthServer.register(username, password, fullName)
        } catch (error) {
            rejectWithValue(error)
        }
    },
)
