import { AuthServer } from '../../backend/auth.server'
import { LoginParams } from '../../models/LoginParams'
import { RegisterParams } from '../../models/RegisterParams'

export const LOCAL_STORATE_KEY_JWT_TOKEN = 'auth-token'

export class AuthService {
    static get token() {
        return localStorage.getItem(LOCAL_STORATE_KEY_JWT_TOKEN) || ''
    }

    static set token(token: string) {
        // remove key in local storage if the token if empty
        if (!token || !token.trim()) {
            localStorage.removeItem(LOCAL_STORATE_KEY_JWT_TOKEN)
        } else {
            localStorage.setItem(LOCAL_STORATE_KEY_JWT_TOKEN, token)
        }
    }

    static async login({ username, password }: LoginParams) {
        const authToken = await AuthServer.login(username, password)
        this.token = authToken
    }

    static async verifyToken() {
        return await AuthServer.verifyToken(this.token)
    }

    static async register({ username, password, fullName }: RegisterParams) {
        await AuthServer.register(username, password, fullName)
    }

    static updateAvatar(avatarBase64: string) {
        return AuthServer.updateAvatar(this.token, avatarBase64)
    }
}
