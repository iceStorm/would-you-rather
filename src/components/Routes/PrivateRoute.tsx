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
    const navigate = useNavigate()
    const { currentUser } = selectAuthState()

    useEffect(() => {
        const fromRoute = `${location.pathname}${location.search}`

        if (!currentUser) {
            return navigate('/login', { state: { from: fromRoute } })
        }
    }, [location.key])

    return <>{currentUser ? element : <AppProgressBar key={location.key} />}</>
}
