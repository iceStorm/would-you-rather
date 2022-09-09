import { Spinner, SpinnerSize } from '@fluentui/react'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { BaseComponentProps } from '../../models/BaseComponentProps'
import { selectCurrentUser } from '../../store/auth/auth.selectors'
import { AuthService } from '../../store/auth/auth.service'
import { verifyToken } from '../../store/auth/auth.thunks'
import { useAppDispatch } from '../../store/hooks'

type PrivateRouteProps = BaseComponentProps & {
    element: JSX.Element
}

export function PrivateRoute({ element }: PrivateRouteProps) {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const currentUser = selectCurrentUser()
    const authToken = AuthService.token

    const [isTokenVerified, setTokenVerified] = useState(false)
    const [verifyTokenError, setVerifyTokenError] = useState('')

    if (!currentUser && !authToken) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />
    }

    console.log('private route calling...')

    useEffect(() => {
        if (verifyTokenError) {
            // token verifying error -> need to login again
            navigate('/login', { state: { error: verifyTokenError } })
        }
    }, [verifyTokenError])

    // currentUser is existing but we need to re-verify
    // the auth-token each time user navigate to a private route
    dispatch(verifyToken())
        .unwrap()
        .then(() => {
            // token is still valid (not expired) -> allow to view the private route
            setTokenVerified(true)
        })
        .catch((error) => {
            // clear token in local storage
            AuthService.token = ''
            setVerifyTokenError(error)
        })

    return isTokenVerified ? element : <Spinner size={SpinnerSize.medium} className="mt-5" />
}
