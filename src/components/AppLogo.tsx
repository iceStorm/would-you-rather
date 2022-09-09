import React from 'react'
import logo from '../assets/logo.png'

type AppLogoProps = React.HTMLAttributes<HTMLImageElement> & {
    width?: number | string
    height?: number | string
}

export function AppLogo(props: AppLogoProps) {
    return <img {...props} src={logo} alt="app-logo" />
}
