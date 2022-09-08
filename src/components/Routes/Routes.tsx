import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import { App } from '../App'
import { HomePage } from '../../pages/Home'
import { NotFoundPage } from '../../pages/NotFound'
import { ProfilePage } from '../../pages/Profile'
import { PrivateRoute } from './PrivateRoute'
import { LoginPage } from '../../pages/AuthLogin'
import { RegisterPage } from '../../pages/AuthSignup'
import { LeaderBoardPage } from '../../pages/LeaderBoard'
import { QuestionAddPage } from '../../pages/QuestionAdd'
import { QuestionDetailPage } from '../../pages/QuestionDetail'

export function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    {/* Home */}
                    <Route path="" element={<PrivateRoute element={<HomePage />} />}></Route>

                    {/* Profile */}
                    <Route path="profile" element={<PrivateRoute element={<ProfilePage />} />}></Route>

                    {/* Auth */}
                    <Route path="login" element={<LoginPage />}></Route>
                    <Route path="register" element={<RegisterPage />}></Route>

                    {/* Question */}
                    <Route path="questions" element={<PrivateRoute element={<Navigate to="/questions/add" />} />}>
                        <Route path="add" element={<PrivateRoute element={<QuestionAddPage />} />}></Route>
                        <Route path=":question_id" element={<PrivateRoute element={<QuestionDetailPage />} />}></Route>
                    </Route>

                    {/* Leader Board */}
                    <Route path="leaderboard" element={<PrivateRoute element={<LeaderBoardPage />} />}></Route>

                    {/* Fallback */}
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
