/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BASE_API_URL: string
    readonly VITE_BASE_API_URL_STAGE: string
    readonly VITE_BASE_API_URL_DEV: string
    readonly VITE_STRIPE_KEY_DEV: string
    readonly VITE_STRIPE_KEY_MAIN: string
    readonly VITE_UNSTOPPABLE_CLIENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
