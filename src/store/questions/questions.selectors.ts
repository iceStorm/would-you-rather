import { useAppSelector } from '../hooks'

export const selectQuestionsState = useAppSelector((state) => state.questions)
