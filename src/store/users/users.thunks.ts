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

export const getUserById = createAsyncThunk('users/getUseById', async (userId: string, { rejectWithValue }) => {
    try {
        const user = await UsersService.getUseById(userId)
        return user
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})
