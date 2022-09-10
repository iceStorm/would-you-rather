import { User, UserRecords } from '../models/User'
import { JwtService } from './jwt.service'
import { UsersServer } from './users.server'
import { ServerUtils } from './utils.server'
import { getUsersFromLocalStorage, saveUsersToLocalStorage } from './_DATA'

export class AuthServer {
    static async verifyToken(token: string) {
        try {
            const { userId } = (await JwtService.verify(token)).payload
            const foundUser = UsersServer.users.find((user) => user.id === userId)

            if (!foundUser) {
                throw new Error(`User ${userId} no longer exist`)
            }

            await ServerUtils.sleepRandom({})
            return foundUser
        } catch (error: any) {
            if (error.message === '"exp" claim timestamp check failed') {
                throw new Error('Your login session has expired. Please log in again')
            }

            if (error.message === 'JWS Protected Header is invalid') {
                throw new Error('Authentication token was tampered. Please log in again')
            }

            throw error
        }
    }

    static async login(username: string, password: string) {
        await ServerUtils.sleepRandom({ minimum: 750 })

        const foundUserById = UsersServer.users.find((user) => user.id === username)
        if (!foundUserById) {
            throw new Error('Username not found')
        }

        // check password
        if (!(await ServerUtils.checkPassword(password, foundUserById.password))) {
            throw new Error('Password does not match')
        }

        const authToken = await JwtService.sign({ userId: foundUserById.id })
        await ServerUtils.sleepRandom({ minimum: 750 })
        return authToken
    }

    static async register(username: string, password: string, fullName: string) {
        // check username duplication
        const foundUser = UsersServer.users.find((user) => user.id === username)
        if (foundUser) {
            throw new Error('Username already exists')
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
