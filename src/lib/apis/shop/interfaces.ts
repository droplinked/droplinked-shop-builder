export interface IshopService {
    shopName : string
}

export interface IpaymentCreateService {
    type : string
    destinationAddress : string
    isActive : boolean
}