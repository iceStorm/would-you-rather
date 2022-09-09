import { Spinner, SpinnerSize } from '@fluentui/react'
import { useEffect, useState } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { BaseComponentProps } from '../../models/BaseComponentProps'
import { selectAuthState, selectCurrentUser } from '../../store/auth/auth.selectors'
import { AuthService } from '../../store/auth/auth.service'
import { setCurrentUser } from '../../store/auth/auth.slice'
import { verifyToken } from '../../store/auth/auth.thunks'
import { useAppDispatch } from '../../store/hooks'
import { AppProgressBar } from '../AppProgressBar'

type PrivateRouteProps = BaseComponentProps & {
    element: JSX.Element
}

export function PrivateRoute({ element }: PrivateRouteProps) {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { currentUser } = selectAuthState()
    const [isTokenVerified, setTokenVerified] = useState(false)
    const authToken = AuthService.token

    console.log('private route calling...')

    if (!currentUser && !authToken) {
        return <Navigate to="/login" replace state={{ from: `${location.pathname}${location.search}` }} />
    }

    useEffect(() => {
        dispatch(verifyToken())
            .unwrap()
            .then(() => {
                // token is still valid (not expired)
                // -> allow to view the private route
                setTokenVerified(true)
            })
            .catch((error) => {
                // clear token in local storage
                AuthService.token = ''
                // setVerifyTokenError(error)
                navigate('/login', { state: { error: error } })
            })
    }, [])

    return <>{isTokenVerified ? element : <AppProgressBar key={location.pathname} />}</>
}
