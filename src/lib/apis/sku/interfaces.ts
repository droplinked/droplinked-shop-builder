interface ICommonRecordParams {
    deploy_hash: string
    deploy_hash_link: string
    commision: number
    royalty: number
    canBeAffiliated: boolean
}

export interface IRecordCasperService {
    chain: string
    params: ICommonRecordParams & { skuID: string, recorded_quantity?: number }
}

export interface IRecordBatchCasperService {
    chain: string
    params: ICommonRecordParams & { productId: string }
}

export interface IRecordWithCircleWallet {
    chain: string
    params: ICommonRecordParams & { price: number, beneficiaries: [] }
}