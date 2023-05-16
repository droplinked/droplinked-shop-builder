export interface IshopService {
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
    shopname: string
}