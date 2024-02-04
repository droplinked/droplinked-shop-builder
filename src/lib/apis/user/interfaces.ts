export interface IsignupService {
    email: string
    password: string
    shopName: string

}
export interface IforgetPasswordService {
    email: string
}

export interface IresendEmailService {
    email: string
}

export interface IchangePasswordService {
    newPassword: string
    accountRecoveryToken: string
}

export interface IemailVerifyService {
    token: string
}