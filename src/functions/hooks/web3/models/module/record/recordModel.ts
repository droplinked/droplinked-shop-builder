import RecordCasperModule from "./modules/casperModel"
import { stacksRecord } from "lib/utils/blockchain/stacks/record"
import { recordCasperService } from "lib/apis/sku/services"
import { getNetworkProvider } from "lib/utils/chains/chainProvider"
import { appDeveloment } from "lib/utils/app/variable"
import { Chain, Network } from "lib/utils/chains/Chains"

interface Irecord {
    product: any
    commission: number
    blockchain: string
    sku: any
    quantity: number
    imageUrl?: string
    accountAddress: string
}

interface IrecordData {
    commission: number
    quantity: any
    blockchain: string
}

export interface IStacks {
    login: any
    isRequestPending: any
    openContractCall: any
    stxAddress: any
}


export interface Ideploy {
    data: IrecordData
    product: any
    sku: any
    deployHash: string
}

const recordModel = ({
    record: async ({ product, commission, blockchain, quantity, sku, imageUrl, accountAddress }: Irecord) => {
        const provider = getNetworkProvider(Chain[blockchain], Network[appDeveloment ? "TESTNET" : "MAINNET"], accountAddress)
        const record = await provider.recordProduct(sku, product.title, product.description, imageUrl || product.media[0].url, sku.price * 100, product.product_type === "PRINT_ON_DEMAND" ? quantity : sku.quantity, commission * 100, process.env.REACT_APP_RECORD_MATCH_POLYGON_RIPPLE)

        return record
    },

    deploy: ({ data, deployHash, product, sku }: Ideploy) => {
        return new Promise<void>(async (resolve: any, reject) => {
            try {
                const record = await recordCasperService({
                    chain: data.blockchain,
                    params: {
                        deploy_hash: deployHash,
                        skuID: sku._id,
                        commision: Number(data.commission),
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