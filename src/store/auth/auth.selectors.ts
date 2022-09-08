import { useAppSelector } from '../hooks'

export const selectCurrentUser = () =>
    useAppSelector(state => state.auth.currentUser)
