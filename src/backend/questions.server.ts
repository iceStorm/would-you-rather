import { AnswerOptionKey, Question, QuestionRecords } from '../models/Question'
import { User } from '../models/User'
import { AuthServer } from './auth.server'
import { UsersServer } from './users.server'
import { ServerUtils } from './utils.server'
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

    private static addQuestion(question: Question) {
        this.questions = this.questions.concat(question)
    }

    static async getAllQuestions(token: string) {
        await AuthServer.verifyToken(token)
        return this.questions
    }

    private static formatNewQuestion(author: User['id'], optionOneText: string, optionTwoText: string): Question {
        return {
            id: ServerUtils.generateUID(),
            timestamp: Date.now(),
            author,
            optionOne: {
                votes: [],
                text: optionOneText,
            },
            optionTwo: {
                votes: [],
                text: optionTwoText,
            },
        }
    }
    static async submitQuestion(token: string, questionOptions: { [key in AnswerOptionKey]: string }) {
        const author = await AuthServer.verifyToken(token)
        const formattedQuestion = this.formatNewQuestion(
            author.id,
            questionOptions.optionOne,
            questionOptions.optionTwo,
        )

        this.addQuestion(formattedQuestion)
        UsersServer.addQuestion(author.id, formattedQuestion.id)

        return formattedQuestion
    }

    static async getQuestionById(token: string, questionId: string) {
        await AuthServer.verifyToken(token)

        const foundQuestion = this.questions.find((question) => question.id === questionId)
        if (!foundQuestion) {
            throw new Error(`Could not find a question with id ${questionId}`)
        }

        return foundQuestion
    }

    static async submitAnswer(token: string, questionId: string, optionKey: AnswerOptionKey) {
        const submitter = await AuthServer.verifyToken(token)

        const questions = this.questionsWithKey
        questions[questionId][optionKey].votes.push(submitter.id)
        this.questionsWithKey = questions

        UsersServer.addAnswer(submitter.id, questionId, optionKey)
    }
}
