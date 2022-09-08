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
        saveUsersToLocalStorage(Object.fromEntries(users.map(user => [user.id, user])))
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
        await JwtService.verify(token)
        await ServerUtils.sleepRandom({})
    }

    static async login(username: string, password: string) {
        const foundUser = this.users.find(user => user.id === username && user.password === password)

        if (!foundUser) {
            throw new Error('Credentials not match')
        }

        const authToken = await JwtService.sign({ userId: foundUser.id })
        ServerUtils.sleepRandom({ maximum: 750 })
        return authToken
    }
}
