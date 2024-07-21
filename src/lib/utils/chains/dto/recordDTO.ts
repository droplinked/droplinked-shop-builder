import { Beneficiary, ProductType } from "./chainStructs"

export type RecordProduct = {
    skuProperties: any,
    productTitle: string,
    description: string,
    image_url: string,
    price: number,
    amount: number,
    commission: number,
    type: ProductType,
    beneficiaries: Beneficiary[],
    acceptsManageWallet: boolean,
    royalty: number,
    currencyAddress: string
}