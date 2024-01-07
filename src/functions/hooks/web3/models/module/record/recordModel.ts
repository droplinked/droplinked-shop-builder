import RecordCasperModule from "./modules/casperModel"
import { stacksRecord } from "lib/utils/blockchain/stacks/record"
import { recordCasperService } from "lib/apis/sku/services"
import { getNetworkProvider } from "lib/utils/chains/chainProvider"
import { appDeveloment } from "lib/utils/app/variable"
import { Beneficiary, Chain, Network, ProductType } from "lib/utils/chains/Chains"
import { IRecordParamsData } from "../.."

interface Irecord {
    product: any
    commission: number
    blockchain: string
    sku: any
    quantity: number
    imageUrl?: string
    accountAddress: string
    royalty: number
}

export interface IStacks {
    login: any
    isRequestPending: any
    openContractCall: any
    stxAddress: any
}


export interface Ideploy {
    data: IRecordParamsData
    product: any
    sku: any
    deployHash: string
}

const recordModel = ({
    record: async ({ product, commission, blockchain, quantity, sku, imageUrl, accountAddress, royalty }: Irecord) => {
        const provider = getNetworkProvider(Chain[blockchain], Network[appDeveloment ? "TESTNET" : "MAINNET"], accountAddress)
        // ---------------- new parameters: ------------------------
        // get these parameters from recorder:
        const type = ProductType.DIGITAL; // type of the product
        const paymentWallet = accountAddress; // the wallet in which the funds would go
        const beneficiaries: Beneficiary[] = []; // this is the value added services
        const acceptsManageWallet = true; // if user accepts the manage wallet
        let record: any;
        // ----------------------------------------------------------
        if (blockchain === 'CASPER') {
            record = await provider.casperRecordProduct(sku, product.title, product.description, imageUrl || product.media[0].url, sku.price * 100, product.product_type === "PRINT_ON_DEMAND" ? quantity : sku.quantity, commission * 100, process.env.REACT_APP_RECORD_MATCH_POLYGON_RIPPLE)

        } else {
            record = await provider.recordProduct(sku, product.title, product.description, imageUrl || product.media[0].url, sku.price * 100, product.product_type === "PRINT_ON_DEMAND" ? quantity : sku.quantity, commission * 100, type, paymentWallet, beneficiaries, acceptsManageWallet, royalty * 100, process.env.REACT_APP_RECORD_MATCH_POLYGON_RIPPLE)
        }
        return record
    },

    refactorSku: (sku: any) => {
        const result = {}
        Object.keys(sku).filter(el => !['recordData', 'partialOwners', 'sold_units'].includes(el)).forEach(el => result[el] = sku[el])
        return result
    },

    deploy: ({ data, deployHash, product, sku }: Ideploy) => {
        return new Promise<void>(async (resolve: any, reject) => {
            try {
                const record = await recordCasperService({
                    chain: data.blockchain,
                    params: {
                        deploy_hash: deployHash,
                        skuID: sku._id,
                        royalty: parseInt(data.royalty),
                        canBeAffiliated: Boolean(data.commission && data.commission.length),
                        commision: parseInt(data.commission),
                        ...product.product_type === "PRINT_ON_DEMAND" && { recorded_quantity: parseInt(data.quantity) }
                    }
                })
                resolve(record)
            } catch (error) {
                reject(error)
            }
        })
    }
})

export default recordModel