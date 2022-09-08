import { Navigate } from 'react-router-dom'

import { BaseComponentProps } from '../../models/BaseComponentProps'
import { selectCurrentUser } from '../../store/auth/auth.selectors'

type PrivateRouteProps = BaseComponentProps & {
    element: JSX.Element
}

export function PrivateRoute({ element }: PrivateRouteProps) {
    const currentUser = selectCurrentUser()

    if (!currentUser) {
        return <Navigate to="/login" />
    }

    return element
}
