import { Outlet } from 'react-router-dom'

import { AppHeader } from '../AppHeader'
import './App.css'

export function App() {
    return (
        <div className="app min-h-screen flex flex-col">
            <AppHeader className="sticky top-0 border-b border-gray-200" />

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}
