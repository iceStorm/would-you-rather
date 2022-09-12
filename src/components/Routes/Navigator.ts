import { NavigateFunction, useLocation, useNavigate, Location } from 'react-router-dom'

export const AppNavigator = {
    location: <Location>{},
    navigate: <NavigateFunction>{},
}

export const AppNavigatorSetter = () => {
    AppNavigator.navigate = useNavigate()
    AppNavigator.location = useLocation()
    return null
}
