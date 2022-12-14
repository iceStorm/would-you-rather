import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { authSlice } from './auth/auth.slice'
import { questionsSlice } from './questions/questions.slice'
import { userSlice } from './users/users.slice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        questions: questionsSlice.reducer,
        users: userSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
