import { UsersServer } from '../../backend/users.server'
import { AuthService } from '../auth/auth.service'

export class UsersService {
    static fetchAllUsers() {
        return UsersServer.getAllUsers(AuthService.token)
    }
}
