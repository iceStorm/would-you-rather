import { AppNavigator } from '../components/Routes/Navigator'
import { TOKEN_EXPIRED, TOKEN_TAMPERED } from '../constants/errors/auth.errors'

export function useAuthErrorHandler(error: Error | any) {
    const fromRoute = `${AppNavigator.location.pathname}${AppNavigator.location.search}`

    switch (error) {
        case TOKEN_EXPIRED().message:
            AppNavigator.navigate('/login', { state: { from: fromRoute, error } })
            break

        case TOKEN_TAMPERED().message:
            AppNavigator.navigate('/login', { state: { from: fromRoute, error } })
            break

        default:
            console.error('useAuthErrorHandler uncaught error:', error)
            break
    }
}
