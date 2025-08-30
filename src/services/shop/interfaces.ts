import { IAuthSupportedWalletsService } from "../auth/interfaces";

export interface ShopSetupParams {
    shop_url: string
    name: string
    logo: string
    hero_section: string
    description: string
}

export interface IShopCredit {
    data: {
        credit: number;
    }
}

export interface IshopSocial {
    discordURL?: string;
    instagramURL?: string;
    twitterURL?: string;
    webURL?: string;
    linkedinURL?: string;
    tiktokURL?: string;
    facebookURL?: string;
    telegramURL?: string;
    youtubeURL?: string;
    messengerURL?: string;
}

export interface IshopUpdateService extends IshopSocial {
    description?: string;
    logo?: string;
    addressBookID?: string;
    headerIcon?: string;
    backgroundColor?: string;
    backgroundText?: string;
    backgroundImage?: string;
    backgroundImageSecondary?: string;
    isAgeRestricted?: boolean;
    templateID?: string;
    tags?: Array<string>;
    infoEmail?: string;
    imsType?: string;
    paymentMethods?: any[];
    loginMethods?: IAuthSupportedWalletsService[];
    credit?: number;
    currencyAbbreviation: string;
    pre_purchase_data_fetch?: {
        active: boolean;
        title: string;
    };
    productTile?: any[];
    productTileStyle?: any;
}

export interface IchargeCreditService {
    amount: number;
}

export interface ShopOAuth2Client {
    domains: Array<string>;
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

export interface IDeployContract {
    type: string;
    transaction_id: string;
    deployedShopAddress: string;
    deployedNFTAddress: string;
}

export interface IShopApiKey {
    clientId: string;
    domains: Array<string>;
}

export interface IPaymentPublicService {
    type?: string;
    isActive?: boolean;
    symbol?: string;
    _id?: string;
    description?: string
    supportedChains?: SupportedChains[]
}

export interface SupportedChains {
    group: string;
    type: string;
    _id: string;
}
export interface IUpdateShopName {
    id: string;
    shopName: string;
}

export interface UserShop {
    _id: string;
    name: string;
    logo?: string;
    selected?: boolean;
}

export interface UserExtraShopResponse {
    _id: string;
    name: string;
    ownerID: string;
    apiKey: string;
}

export interface IGetShopsCommunityService {
    limit: number;
    page: number;
    name?: string;
    tags?: string[];
    sort?: string;
}

export interface IGetShopCommunityProfile {
    shopId: string;
}

export interface IPostWithdrawCircleWallet {
    tokenId: string;
    amount: number;
}