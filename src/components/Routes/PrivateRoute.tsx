import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { BaseComponentProps } from '../../models/BaseComponentProps'
import { selectAuthState } from '../../store/auth/auth.selectors'
import { AuthService } from '../../store/auth/auth.service'
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

    useEffect(() => {
        const fromRoute = `${location.pathname}${location.search}`

        if (!currentUser && !authToken) {
            return navigate('/login', { state: { from: fromRoute } })
        }

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
                navigate('/login', { state: { error: error, from: fromRoute } })
            })
    }, [location.key])

    return <>{isTokenVerified ? element : <AppProgressBar key={location.key} />}</>
}
