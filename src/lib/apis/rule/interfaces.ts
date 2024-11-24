export interface IgetRuleService {
    ruleID: string;
}

export interface IcreateRuleService {
    "name": string,
    "type": RuleTypes,
    "discountPercentage": number,
    "nftPurchaseLink": string,
    "network": string,
    "blockchainType": string,
    "nftContractAddresses": string[],
    "minimumNftRequired": number,
    "description": string,
    "collectionID": string
}

export interface IupdateRuleService {
    ruleID: string;
    data: IcreateRuleService;
}

export interface IgetRuleTypeService {
    chain: string;
}

export enum RuleTypes {
    GATED = "GATING",
    DISCOUNT = "DISCOUNT",
};