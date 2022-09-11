import { User } from './User'

export type AnswerOptionKey = 'optionOne' | 'optionTwo'
export type AnswerOptionValue = {
    votes: User['id'][]
    text: string
}

export type AnswerOption = {
    [key in AnswerOptionKey]: AnswerOptionValue
}

export type Question = AnswerOption & {
    id: string
    author: User['id']
    timestamp: number
}

export type QuestionRecords = Record<Question['id'], Question>
