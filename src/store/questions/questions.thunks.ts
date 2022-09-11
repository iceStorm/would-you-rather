import { createAsyncThunk } from '@reduxjs/toolkit'

import { AnswerOptionKey, Question } from '../../models/Question'
import { User } from '../../models/User'
import { QuestionsService } from './questions.service'

export type SubmitAnswerParams = {
    questionId: Question['id']
    answer: AnswerOptionKey
}

export const fetchAllQuestions = createAsyncThunk('quetions/fetchAll', async (undefined, { rejectWithValue }) => {
    try {
        const questions = await QuestionsService.fetchAllQuestions()
        return questions
    } catch (error: any) {
        return rejectWithValue(error.message)
    }
})

export const submitQuestion = createAsyncThunk(
    'questions/submitQuestion',
    async (options: { [key in AnswerOptionKey]: string }, { rejectWithValue }) => {
        try {
            const question = await QuestionsService.submitQuestion(options)
            return question
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    },
)

export const getQuestionById = createAsyncThunk(
    'questions/getQuestionById',
    async (questionId: string, { rejectWithValue }) => {
        try {
            const question = await QuestionsService.getQuestionById(questionId)
            return question
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    },
)

export const submitAnswer = createAsyncThunk(
    'questions/submitAnswer',
    async (params: SubmitAnswerParams, { rejectWithValue }) => {
        try {
            await QuestionsService.submitAnswer(params)
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    },
)
