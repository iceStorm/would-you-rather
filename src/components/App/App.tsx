import { Outlet, useLocation } from 'react-router-dom'

import { AppHeader } from '../AppHeader'
import './App.css'
import { AppProgressBar } from '../AppProgressBar/AppProgressBar'

export function App() {
    const location = useLocation()

    return (
        <div className="app min-h-screen flex flex-col">
            <AppProgressBar key={location.key} />
            <AppHeader className="sticky top-0 border-b border-gray-200" />

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}
