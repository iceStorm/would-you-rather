import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '.'
import { useNavigate } from 'react-router-dom'
import { login, verifyToken } from './auth/auth.thunks'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const guardDispatch = async (thunkAction: any) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    try {
        await dispatch(verifyToken())
        return dispatch
    } catch (error: any) {
        navigate('/login', { state: error })
        throw error
    }
}
