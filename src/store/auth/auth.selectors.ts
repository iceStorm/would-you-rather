import { useAppSelector } from '../hooks'

export const selectAuthState = () => useAppSelector((state) => state.auth)
export const selectCurrentUser = () => useAppSelector((state) => state.auth.currentUser)
