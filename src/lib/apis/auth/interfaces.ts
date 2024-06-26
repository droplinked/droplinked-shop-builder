export interface IauthLoginService {
    userType: "PRODUCER";
    email: string;
    password: string;
}

export interface IAuthSupportedWalletsService {
    name: string;
    wallets: {
        name: string;
        isActivated: boolean;
    }[];
}

export interface ICompleteGoogleSignupService {
    username: string;
    access_token: string;
    referralCode?: string;
}

export interface IsignupService {
    email: string
    password: string
    referralCode?: string
    hasProducerAccount: boolean
}