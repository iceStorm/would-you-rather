import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Question } from '../../models/Question'
import { fetchAllQuestions } from './questions.thunks'

type QuestionsState = {
    allQuestions: Question[]
    fetchingQuestions: boolean
}

export const questionsSlice = createSlice({
    name: 'questions',
    initialState: {
        allQuestions: [],
        fetchingQuestions: false,
    } as QuestionsState,
    reducers: {
        setQuestions(state, action: PayloadAction<Question[]>) {
            state.allQuestions = action.payload
        },
    },
    extraReducers: {
        [fetchAllQuestions.pending.type]: (state) => {
            state.fetchingQuestions = true
        },
        [fetchAllQuestions.fulfilled.type]: (state, action: PayloadAction<Question[]>) => {
            state.allQuestions = action.payload
            state.fetchingQuestions = false
        },
        [fetchAllQuestions.rejected.type]: (state) => {
            state.fetchingQuestions = false
        },
    },
})
