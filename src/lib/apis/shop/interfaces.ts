import { IAuthSupportedWalletsService } from "../auth/interfaces"

export interface IshopService {
    shopName: string
}

export interface IshopInfoService {
    shopName: string
}

export interface IpaymentCreateService {
    type: string
    destinationAddress: string
    isActive: boolean
}

export interface IrecordedShopService {
    shopName: string
}

export interface IproductService {
    productID: string
}

export interface IshopSocial {
    discordURL?: string
    instagramURL?: string
    twitterURL?: string
    webURL?: string
    linkedinURL?: string
    tiktokURL?: string
    facebookURL?: string
    telegramURL?: string
    youtubeURL?: string
    messengerURL?: string
}

export interface IshopUpdateService extends IshopSocial {
    description?: string
    logo?: string
    addressBookID?: string
    shopifyDomain?: string
    headerIcon?: string
    textColor?: string
    backgroundColor?: string
    theme?: string
    backgroundText?: string
    backgroundImage?: string
    backgroundImageSecondary?: string
    templateID?: string
    tags?: Array<string>
    infoEmail?: string
    imsType?: string;
    paymentMethods: any[];
    loginMethods: IAuthSupportedWalletsService[]
    credit?: number,
    pre_purchase_data_fetch?: {
        active: boolean,
        title: string
    },
    productTile?: any[]
}

export interface IShopRecordedService {
    subCategoryIds: Array<string>
    categoryIds: Array<string>
    title: string
    page: string | number
}

export interface IshopPublicRecordedService {
    tags: string
    page: string | number
}

export interface IchargeCreditService {
    amount: number
}

export interface ShopOAuth2Client {
    domains: Array<string>
}

export interface ShopCustomURL {
    domain: string;
}

export interface ShopDNSInformation {
    domain_name: string;
}

export interface ICustomReferralCode {
    customCode: string;
}

export type IPaymentMethod = {
    _id: string;
    type: string;
    icon?: string;
    isActive: boolean;
    tokens?: {
        _id: string
        name: string;
        icon?: string;
        type: string;
        isActive: boolean;
        isNative: boolean;
        isCustom: boolean;
    }[]
}