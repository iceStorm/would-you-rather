import { Question, QuestionRecords } from '../models/Question'
import { getQuestionsFromLocalStorage, saveQuestionsToLocalStorage } from './_DATA'

export class QuestionsServer {
    /**
     * Array of all questions in local storage.
     */
    static get questions(): Question[] {
        return Object.values(getQuestionsFromLocalStorage())
    }
    static set questions(questions: Question[]) {
        saveQuestionsToLocalStorage(Object.fromEntries(questions.map((question) => [question.id, question])))
    }
    /**
     * Dictionary of all questions in local storage, each item has its own unique key.
     */
    static get questionsWithKey(): QuestionRecords {
        return getQuestionsFromLocalStorage()
    }
    static set questionsWithKey(records: QuestionRecords) {
        saveQuestionsToLocalStorage(records)
    }
}
