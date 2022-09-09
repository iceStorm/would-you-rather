import { createAsyncThunk } from '@reduxjs/toolkit'
import { UsersService } from './users.service'

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async (undefined, { rejectWithValue }) => {
    try {
        const users = await UsersService.fetchAllUsers()
        return users
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})
