import { useAppSelector } from '../hooks'

export const selectUsersState = () => useAppSelector((state) => state.users)
