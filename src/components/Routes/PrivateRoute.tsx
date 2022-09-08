import { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { BaseComponentProps } from '../../models/BaseComponentProps'
import { selectCurrentUser } from '../../store/auth/auth.selectors'
import { verifyToken } from '../../store/auth/auth.thunks'
import { useAppDispatch } from '../../store/hooks'

type PrivateRouteProps = BaseComponentProps & {
    element: JSX.Element
}

export function PrivateRoute({ element }: PrivateRouteProps) {
    const dispatch = useAppDispatch()
    const currentUser = selectCurrentUser()
    const [isTokenVerified, setTokenVerified] = useState(false)

    if (!currentUser) {
        return <Navigate to="/login" replace />
    }

    dispatch(verifyToken())
        .unwrap()
        .then(() => {
            setTokenVerified(true)
        })
        .catch((error) => {
            console.error('Verify token error:', error)
        })

    return isTokenVerified ? element : <Outlet />
}
