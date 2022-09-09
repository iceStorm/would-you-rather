import { hash, compare, genSalt } from 'bcryptjs'

export class ServerUtils {
    /**
     * Delaying exactly by a given number of seconds.
     */
    static sleep(seconds: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, seconds * 1000)
        })
    }

    /**
     * Delaying randomly between two threadholds.
     * @param minimum minimum number of miliseconds to sleep. Default to 0.
     * @param maximum maximum number of miliseconds to sleep. Default to 1000.
     * @returns
     */
    static sleepRandom({
        minimum = 0,
        maximum = minimum + 1000,
    }: {
        minimum?: number
        maximum?: number
    }): Promise<void> {
        // getting a random number from minimum to maximum
        const ramdomNumber = minimum + Math.random() * (maximum - minimum)

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, ramdomNumber)
        })
    }

    /**
     * Generates a random UUID string.
     * @returns a unique UUID string
     */
    static generateUID() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    }

    /**
     * Hashing a raw password using BCrypt.
     * @param rawPassword a raw password from user to be hashed
     */
    static async hashPassword(rawPassword: string) {
        const salt = await genSalt(11)
        return hash(rawPassword, salt)
    }

    /**
     * Checking whether a raw password is match any hashed passwords in the server.
     * @param rawPassword a raw password from user
     * * @param hashedPassword a hashed password from database to compare
     */
    static async checkPassword(rawPassword: string, hashedPassword: string) {
        return compare(rawPassword, hashedPassword)
    }
}
