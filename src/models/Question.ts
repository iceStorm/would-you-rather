import { User } from './User'

export type AnswerOptionKey = 'optionOne' | 'optionTwo'

export type AnswerOption = {
    [key in AnswerOptionKey]: {
        votes: User['id'][]
        text: string
    }
}

export type Question = AnswerOption & {
    id: string
    author: User['id']
    timestamp: number
}

export type QuestionRecords = Record<Question['id'], Question>
