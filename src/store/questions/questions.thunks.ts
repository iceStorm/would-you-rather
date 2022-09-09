import { createAsyncThunk } from '@reduxjs/toolkit'
import { QuestionsService } from './questions.service'

export const fetchAllQuestions = createAsyncThunk('quetions/fetchAll', async (undefined, { rejectWithValue }) => {
    try {
        const questions = await QuestionsService.fetchAllQuestions()
        return questions
    } catch (error: any) {
        rejectWithValue(error.message)
    }
})
