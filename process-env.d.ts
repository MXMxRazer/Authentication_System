declare global {
    namespace NextJS {
        interface ProcessEnv {
            [key: string]: string | undefined
            PORT: string
            DATABASE_URL: string
            // add more environment variables and their types here
        }
    }
}
