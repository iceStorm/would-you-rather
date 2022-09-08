import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export function QuestionList() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/questions/add')
    }, [])

    return <Outlet />
}
