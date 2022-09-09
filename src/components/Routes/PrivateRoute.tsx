import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { BaseComponentProps } from '../../models/BaseComponentProps'
import { selectCurrentUser } from '../../store/auth/auth.selectors'
import { clearAuthToken, getAuthToken, verifyToken } from '../../store/auth/auth.thunks'
import { useAppDispatch } from '../../store/hooks'

type PrivateRouteProps = BaseComponentProps & {
    element: JSX.Element
}

export function PrivateRoute({ element }: PrivateRouteProps) {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const currentUser = selectCurrentUser()
    const [isTokenVerified, setTokenVerified] = useState(false)
    const authToken = getAuthToken()

    if (!currentUser && !authToken) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }

    // currentUser is existing but we need to re-verify the auth-token each time user navigate to a private route
    dispatch(verifyToken())
        .unwrap()
        .then(() => {
            // token is still valid (not expired) -> allow to view the private route
            setTokenVerified(true)
            return element
        })
        .catch((error) => {
            // token verifying error -> need to login again
            clearAuthToken()
            return <Navigate to="/login" replace state={{ error }} />
        })

    return isTokenVerified ? element : <></>
}
