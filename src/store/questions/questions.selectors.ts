import { useAppSelector } from '../hooks'

export const selectAllQuestions = () => useAppSelector((state) => state.questions.allQuestions)
