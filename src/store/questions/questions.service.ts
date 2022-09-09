import { QuestionsServer } from '../../backend/questions.server'
import { AuthService } from '../auth/auth.service'

export class QuestionsService {
    static fetchAllQuestions() {
        return QuestionsServer.getAllQuestions(AuthService.token)
    }
}
