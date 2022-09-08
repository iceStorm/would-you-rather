import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { NotFoundPage } from '../../pages/NotFound'
import { App } from '../App'

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    {/* Home */}
                    <Route path="" element={<App />}></Route>

                    {/* Auth */}
                    <Route path="/login" element={<App />}></Route>
                    <Route path="/register" element={<App />}></Route>

                    <Route path="/question" element={<App />}>
                        <Route path=":question_id" element={<App />}></Route>
                    </Route>

                    <Route path="/leaderboard" element={<App />}></Route>

                    {/* Fallback */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
