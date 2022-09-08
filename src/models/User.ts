import { AnswerOptionKey, Question } from './Question'

export interface User {
    id: string
    name: string
    password: string
    avatarURL: string
    answers: Record<Question['id'], AnswerOptionKey>
    questions: Question['id'][]
}

export type UserRecords = Record<User['id'], User>
