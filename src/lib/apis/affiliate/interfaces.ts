export interface IcasperRequestService {
    shopID: string
    productID: string
    deploy_hash: string
    skuID: string
    quantity: number
}

export type IApproveRequestService = "ACCEPTED" | "REJECTED"

export interface IacceptRejectRequestService {
    deploy_hash: string
    requestID: string
    status: IApproveRequestService
}