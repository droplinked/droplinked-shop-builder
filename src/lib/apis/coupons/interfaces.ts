export interface IgiftcardCreateService {
    name: string
    type: string
    balance: string
    expiryDate: string
    quantity: string
    shopID: string
}

export interface IGiftCardExpiryDate {
    id: string;
    expiryDate: string
}

export interface IgiftcardsService {
    page: string
    limit?: number
    search?: string
}