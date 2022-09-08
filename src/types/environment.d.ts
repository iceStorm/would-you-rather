export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_NAME: string
            REACT_APP_PRIVATE_KEY: string
            REACT_APP_TOKEN_EXPIRATION: string
        }
    }
}
