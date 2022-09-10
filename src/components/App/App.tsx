import { Outlet } from 'react-router-dom'

import { AppHeader } from '../AppHeader'
import './App.css'

export function App() {
    return (
        <div className="app min-h-screen flex flex-col bg-light dark:bg-dark text-light-text dark:text-dark-text">
            <AppHeader className="sticky top-0 border-b border-gray-200 dark:border-opacity-20 bg-white dark:bg-slate-800 bg-opacity-80 dark:bg-opacity-50 backdrop-blur-md z-10" />

            <main className="flex-1 pt-5 pb-10">
                <Outlet />
            </main>
        </div>
    )
}
