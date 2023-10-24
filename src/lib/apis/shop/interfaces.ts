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
    imsType?: string
}

export interface IShopRecordedService {
    subCategoryIds: Array<string>
    categoryIds: Array<string>
    title: string
    page: string | number
}