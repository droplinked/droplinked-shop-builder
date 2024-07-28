import hashkeyModel from "components/common/hashKey/model"
import { recordBatchCasperService, recordCasperService } from "lib/apis/sku/services"
import { appDevelopment } from "lib/utils/app/variable"
import { ChainNotImplementedException, getNetworkProvider } from "lib/utils/chains/chainProvider"
import { Chain, Network } from "lib/utils/chains/dto/chains"
import { droplink_wallet } from "lib/utils/statics/adresses"
import { IRecordBatchParamsData, IRecordParamsData } from "../.."
import { Beneficiary, ProductType } from "lib/utils/chains/dto/chainStructs"
import { RecordProduct } from "lib/utils/chains/dto/recordDTO"
import { Exception } from "sass"

interface Irecord {
    product: any,
    blockchain: string
    accountAddress: string
    nftContract: string
    shopAddress: string
    products: RecordProduct[]
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

export interface IdeployBatch{
    royalty: any,
    commission: any,
    product: any
    deployHash: string
    blockchain: string
}

const recordModel = ({
    record: async ({ product, blockchain, accountAddress, nftContract, shopAddress, products }: Irecord) => {
        const provider = getNetworkProvider(Chain[blockchain], Network[appDevelopment ? "TESTNET" : "MAINNET"], accountAddress)
        // ---------------- new parameters: ------------------------
        // get these parameters from recorder:
        const type = ProductType.DIGITAL; // type of the product
        const paymentWallet = accountAddress; // the wallet in which the funds would go
        let beneficiaries: Beneficiary[] = []; // this is the value added services
        const acceptsManageWallet = true; // if user accepts the manage wallet
        const pod = product.product_type === "PRINT_ON_DEMAND"

        let record: any;
        if (products.length === 1){
            // ----------------------------------------------------------
            if (blockchain === 'CASPER') {
                throw new ChainNotImplementedException("Casper is not implemented")
            } else {
                const sku = products[0].skuProperties
                const imageUrl = products[0].image_url
                const quantity = products[0].amount
                const royalty = products[0].royalty
                const currencyAddress = '0x0000000000000000000000000000000000000000'
                const commission = products[0].commission
                if (pod) beneficiaries = [{
                    isPercentage: false,
                    value: sku.rawPrice * 100,
                    wallet: droplink_wallet
                }]
                const skuId = sku['_id']; // TODO: check here
                record = await provider.recordProduct(sku, product.title, product.description, imageUrl || product.media[0].url, sku.price * 100, pod ? quantity : sku.quantity, commission * 100, type, beneficiaries, acceptsManageWallet, royalty * 100, nftContract, shopAddress, currencyAddress, skuId)

            }
        } else {
            if (blockchain === 'CASPER') {
                throw new ChainNotImplementedException("Casper is not implemented")
            } else {
                record = await provider.recordBatch(products, shopAddress, nftContract)
            }
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
                        deploy_hash_link: hashkeyModel.getLink({ blockchain: data.blockchain, hashkey: deployHash }),
                        skuID: sku._id,
                        royalty: parseInt(data.royalty),
                        canBeAffiliated: data.commission > 0,
                        commision: parseInt(data.commission),
                        ...product.product_type === "PRINT_ON_DEMAND" && { recorded_quantity: parseInt(data.quantity) }
                    }
                })
                resolve(record)
            } catch (error) {
                reject(error)
            }
        })
    },

    deployBatch: ({ royalty, commission, deployHash, product, blockchain }: IdeployBatch) => {
        return new Promise<void>(async (resolve: any, reject) => {
            try {
                const record = await recordBatchCasperService({
                    chain: blockchain,
                    params: {
                        deploy_hash: deployHash,
                        deploy_hash_link: hashkeyModel.getLink({ blockchain: blockchain, hashkey: deployHash }),
                        productId: product._id,
                        royalty: parseInt(royalty),
                        canBeAffiliated: commission > 0,
                        commision: parseInt(commission)
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