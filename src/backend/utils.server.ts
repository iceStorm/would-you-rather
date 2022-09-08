export class ServerUtils {
    /**
     * Delaying exactly by a given number of seconds.
     */
    static sleep(seconds: number): Promise<void> {
        return new Promise(resolve => {
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
        maximum = 1000,
    }: {
        minimum?: number
        maximum?: number
    }): Promise<void> {
        // getting a random number from minimum to maximum
        const ramdomNumber = minimum + Math.random() * (maximum - minimum)

        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ramdomNumber)
        })
    }
}
