import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../../models/User'
import { login } from './auth.thunks'

export type AuthState = {
    currentUser?: User
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        // currentUser: {
        //     name: 'Anh Tuan',
        // },
    } as AuthState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<Partial<User>>) {
            state.currentUser = action.payload as User
        },
        [login.pending.type]: (state) => {},
        [login.fulfilled.type]: (state) => {},
        [login.rejected.type]: (state) => {},
    },
})
