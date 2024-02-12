export interface IauthLoginService {
    email: string
    password: string
}

export interface IAuthSupportedWalletsService {
    name: string,
    wallets: {
        name: string,
        isActivated: boolean
    }[]
}