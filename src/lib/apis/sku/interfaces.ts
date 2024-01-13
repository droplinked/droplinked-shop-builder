export interface IrecordCasperService {
    chain: string
    params: {
        deploy_hash: string
        deploy_hash_link: string
        skuID: string
        commision: number
        royalty: number
        canBeAffiliated: boolean
        recorded_quantity?: number
    }
}