export interface IrecordCasperService {
    chain: string
    params: {
        deploy_hash: string
        skuID: string
        commision: number
        recorded_quantity?: number
    }
}