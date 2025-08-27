export interface IauthLoginService {
    userType: "PRODUCER";
    email: string;
    password: string;
}

export interface IAuthSupportedWalletsService {
    name: string;
    isActivated: boolean;
    type: "SOCIAL" | "WALLET";
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
    d3UserId?: string
    udUserId?: string
    baseUserId?: string
    subscriptionId?: string
}

export interface IResetPasswordCodeVerify {
    email: string;
    code: string;
}

export interface IResetPassword {
    token: string;
    newPassword: string;
}