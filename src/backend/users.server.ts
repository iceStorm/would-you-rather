import { AnswerOptionKey } from '../models/Question'
import { User, UserRecords } from '../models/User'
import { AuthServer } from './auth.server'
import { getUsersFromLocalStorage, saveUsersToLocalStorage } from './_DATA'

export class UsersServer {
    /**
     * Array of all users in local storage.
     */
    static get users(): User[] {
        return Object.values(getUsersFromLocalStorage())
    }
    static set users(users: User[]) {
        saveUsersToLocalStorage(Object.fromEntries(users.map((user) => [user.id, user])))
    }
    /**
     * Dictionary of all users in local storage, each item has its own unique key.
     */
    static get usersWithKey(): UserRecords {
        return getUsersFromLocalStorage()
    }
    static set usersWithKey(records: UserRecords) {
        saveUsersToLocalStorage(records)
    }

    static addUser(user: User) {
        this.users = this.users.concat(user)
    }

    static async getAllUsers(token: string) {
        await AuthServer.verifyToken(token)
        return this.users
    }

    static async getUseById(token: string, userId: string) {
        await AuthServer.verifyToken(token)

        const foundUser = this.users.find((user) => user.id === userId)
        if (!foundUser) {
            throw new Error(`User ${userId} does not exist`)
        }

        return foundUser
    }

    static addQuestion(userId: string, questionId: string) {
        const users = this.usersWithKey
        users[userId].questions.push(questionId)
        this.usersWithKey = users
    }

    static addAnswer(userId: string, questionId: string, optionKey: AnswerOptionKey) {
        const users = this.usersWithKey
        users[userId].answers[questionId] = optionKey
        this.usersWithKey = users
    }
}
