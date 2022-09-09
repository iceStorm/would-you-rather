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
}
