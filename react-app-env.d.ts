/// <reference types="react-scripts" />

interface ProcessEnv {
    readonly REACT_APP_API_URL: string;
    // Outras variáveis de ambiente que você pode adicionar
}

declare namespace NodeJS {
    interface Process {
        env: ProcessEnv;
    }
}
