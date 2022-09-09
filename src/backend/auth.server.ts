import { User, UserRecords } from '../models/User'
import { JwtService } from './jwt.service'
import { ServerUtils } from './utils.server'
import { getUsersFromLocalStorage, saveUsersToLocalStorage } from './_DATA'

export class AuthServer {
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

    static async verifyToken(token: string) {
        try {
            await JwtService.verify(token)
        } catch (error: any) {
            if (error.message === '"exp" claim timestamp check failed') {
                throw new Error('Authentication token expired. Please log in again')
            }

            if (error.message === 'JWS Protected Header is invalid') {
                throw new Error('Authentication token was tampered. Please log in again')
            }

            throw error
        }

        await ServerUtils.sleepRandom({})
    }

    static async login(username: string, password: string) {
        await ServerUtils.sleepRandom({ minimum: 1750 })

        const foundUserById = this.users.find((user) => user.id === username)
        if (!foundUserById) {
            throw new Error('Username not found')
        }

        // check password
        if (!(await ServerUtils.checkPassword(password, foundUserById.password))) {
            throw new Error('Password does not match')
        }

        const authToken = await JwtService.sign({ userId: foundUserById.id })
        await ServerUtils.sleepRandom({ maximum: 750 })
        return authToken
    }

    static async register(username: string, password: string, fullName: string) {
        // check username duplication
        const foundUser = this.users.find((user) => user.id === username)
        if (foundUser) {
            throw new Error('Username already exists')
        }

        // save the new user to DB
        this.users = this.users.concat({
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
