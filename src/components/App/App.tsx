import { Outlet } from 'react-router-dom'
import { AppHeader } from '../AppHeader'
import './App.css'

export function App() {
    return (
        <div className="App">
            <AppHeader className="sticky top-0" />

            <main>
                <Outlet />
            </main>
        </div>
    )
}
