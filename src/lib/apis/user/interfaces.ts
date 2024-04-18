import { IUserWalletsProps } from "lib/stores/app/appStore"

export interface IsignupService {
    email: string
    password: string
    shopName: string
    referralCode?: string

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

export interface IuserUpdateService {
    firstname?: string,
    customerShop?: string,
    lastname?: string,
    avatar?: string,
    email?: string,
    phone?: string,
    casperAddress?: string,
    stacksAddress?: string,
    ETHAddress?: string,
    skaleAddress?: string,
    unstoppableDomainAddress?: string,
    hederaAddress?: string,
    unisatAddress?: string,
    polygonAddress?: string,
    binanceAddress?: string,
    wallets?: Array<IUserWalletsProps>
}