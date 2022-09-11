import { QuestionsServer } from '../../backend/questions.server'
import { AnswerOptionKey, Question } from '../../models/Question'
import { AuthService } from '../auth/auth.service'
import { SubmitAnswerParams } from './questions.thunks'

export class QuestionsService {
    static fetchAllQuestions() {
        return QuestionsServer.getAllQuestions(AuthService.token)
    }

    static submitQuestion(questionOptions: { [key in AnswerOptionKey]: string }) {
        return QuestionsServer.submitQuestion(AuthService.token, questionOptions)
    }

    static getQuestionById(questionId: string) {
        return QuestionsServer.getQuestionById(AuthService.token, questionId)
    }

    static submitAnswer({ questionId, answer }: SubmitAnswerParams) {
        return QuestionsServer.submitAnswer(AuthService.token, questionId, answer)
    }
}
