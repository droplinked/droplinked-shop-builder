export interface IgetRuleService {
    ruleID: string
}

export interface IcreateRuleService {
    collectionID: string
    gated: boolean
    rules: [
        {
            addresses: any
            discountPercentage: string
            nftsCount: string
            type: string
            description: string
        },
    ],
    type: string
    webUrl: string
    redeemedNFTs: []
}

export interface IupdateRuleService {
    ruleID : string
    data : IcreateRuleService
}