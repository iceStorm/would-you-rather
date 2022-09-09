import { Outlet, useLocation } from 'react-router-dom'

import './App.css'
import { AppHeader } from '../AppHeader'
import { AppProgressBar } from '../AppProgressBar'

export function App() {
    const location = useLocation()

    return (
        <div className="app min-h-screen flex flex-col">
            {/* <AppProgressBar key={location.key} /> */}
            <AppHeader className="sticky top-0 border-b border-gray-200 bg-white bg-opacity-80 backdrop-blur-md z-10" />

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}
