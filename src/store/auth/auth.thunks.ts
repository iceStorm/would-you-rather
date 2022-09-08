import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthServer } from '../../backend/auth.server'

export const login = createAsyncThunk('auth/login', async () => {
    try {
        // await AuthServer.login()
    } catch (error) {}
})
