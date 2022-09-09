import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models/User'
import { fetchAllUsers } from './users.thunks'

type UsersState = {
    allUsers: User[]
    fetchingUsers: boolean
}

export const userSlice = createSlice({
    name: 'users',
    initialState: {
        allUsers: [],
        fetchingUsers: false,
    } as UsersState,
    reducers: {},
    extraReducers: {
        [fetchAllUsers.pending.type]: (state) => {
            state.fetchingUsers = true
        },
        [fetchAllUsers.fulfilled.type]: (state, action: PayloadAction<User[]>) => {
            state.allUsers = action.payload
            state.fetchingUsers = false
        },
        [fetchAllUsers.rejected.type]: (state) => {
            state.fetchingUsers = false
        },
    },
})
