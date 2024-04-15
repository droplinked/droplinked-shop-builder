export interface IgetRuleService {
    ruleID: string;
}

export interface IcreateRuleService {
    collectionID: string;
    gated: boolean;
    rules: [
        {
            addresses: any;
            discountPercentage: number;
            nftsCount: number;
            type: string;
            description: string;
        }
    ];
    type: string;
    ruleType: string;
    webUrl: string;
    redeemedNFTs: [];
}

export interface IupdateRuleService {
    ruleID: string;
    data: IcreateRuleService;
}

export interface IgetRuleTypeService {
    chain: string;
}
