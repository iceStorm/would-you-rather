import { useEffect } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'

export function QuestionList() {
    const navigate = useNavigate()
    const { question_id } = useParams()

    useEffect(() => {
        console.log(question_id)
        navigate('/questions/add')
    }, [])

    return <Outlet />
}
