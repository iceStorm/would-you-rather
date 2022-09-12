import {
    PASSWORD_DOES_NOT_MATCH,
    TOKEN_EXPIRED,
    TOKEN_TAMPERED,
    USERNAME_ALREADY_EXISTS,
    USER_NOT_FOUND,
    USER_NO_LONGER_EXISTS,
} from '../constants/errors/auth.errors'
import { JwtService } from './jwt.service'
import { UsersServer } from './users.server'
import { ServerUtils } from './utils.server'

export class AuthServer {
    static async verifyToken(token: string) {
        try {
            const { userId } = await (await JwtService.verify(token)).payload
            const foundUser = UsersServer.users.find((user) => user.id === userId)

            if (!foundUser) {
                throw USER_NO_LONGER_EXISTS(userId as string)
            }

            await ServerUtils.sleepRandom({ maximum: 750 })
            return foundUser
        } catch (error: any) {
            if (error.message === '"exp" claim timestamp check failed') {
                throw TOKEN_EXPIRED()
            }

            if (error.message === 'JWS Protected Header is invalid') {
                throw TOKEN_TAMPERED()
            }

            throw error
        }
    }

    static async login(username: string, password: string) {
        const foundUserById = UsersServer.users.find((user) => user.id === username)
        if (!foundUserById) {
            throw USER_NOT_FOUND()
        }

        // check password
        if (!(await ServerUtils.checkPassword(password, foundUserById.password))) {
            throw PASSWORD_DOES_NOT_MATCH()
        }

        const authToken = await JwtService.sign({ userId: foundUserById.id })
        return authToken
    }

    static async register(username: string, password: string, fullName: string) {
        // check username duplication
        const foundUser = UsersServer.users.find((user) => user.id === username)
        if (foundUser) {
            throw USERNAME_ALREADY_EXISTS()
        }

        // save the new user to DB
        UsersServer.addUser({
            id: username,
            name: fullName,
            password: await ServerUtils.hashPassword(password),
            answers: {},
            questions: [],
            avatarURL: '',
        })

        await ServerUtils.sleepRandom({ minimum: 500, maximum: 1275 })
    }
}
