export enum Chain {
    CASPER,
    POLYGON,
    BINANCE,
    STACKS,
    XRPLSIDECHAIN,
    NEAR,
    SKALE,
    BASE,
    LINEA,
    ETH,
}
export enum Network {
    MAINNET,
    TESTNET
}
export enum ProductType{
    DIGITAL,
    POD,
    PHYSICAL
}

export type Beneficiary = {
    isPercentage: boolean; 
    value: number;
    wallet: string;
}