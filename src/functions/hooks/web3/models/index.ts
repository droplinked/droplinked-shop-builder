import { Isku } from "lib/apis/product/interfaces"
import { appDeveloment } from "lib/utils/app/variable"
import { stacksRecord } from "lib/utils/blockchain/stacks/record"
import stacksRequest from "lib/utils/blockchain/stacks/request"
import { getNetworkProvider } from "lib/utils/chains/chainProvider"
import { Chain, Network } from "lib/utils/chains/Chains"
import acceptModel from "./module/accept/acceptModel"
import recordModel, { Ideploy, IStacks } from "./module/record/recordModel"

export interface IRecordParamsData {
    commission: any
    quantity: any
    blockchain: any
    royalty: any
}

export interface IRecordPrams {
    data: IRecordParamsData
    product: any
    sku: any
    imageUrl?: string
}

export interface Irecord {
    params: IRecordPrams
    accountAddress: any
    stack: IStacks
}

export interface IRequestData {
    sku: Isku
}

interface IRequest {
    params: IRequestData
    accountAddress: any
    stack: IStacks
}

export interface IAcceptData {
    shop: any
    accept: boolean
}

interface IAccept {
    params: IAcceptData
    accountAddress: any
    stack: IStacks
}

const web3Model = ({
    record: async ({ params: { data, product, sku, imageUrl }, accountAddress, stack: { isRequestPending, openContractCall, stxAddress } }: Irecord) => {
        return new Promise<void>(async (resolve: any, reject) => {
            try {
                const commission = data.commission
                const quantity: any = data.quantity
                if (!data.royalty) data.royalty = 0
                const dataDeploy: Ideploy = {
                    data, deployHash: '', product, sku
                }
                if (data.blockchain === "STACKS") {
                    const query = await stacksRecord({
                        isRequestPending,
                        openContractCall,
                        params: {
                            price: sku.price * 100,
                            amount: product.product_type === "PRINT_ON_DEMAND" ? quantity : sku.quantity,
                            commission,
                            productID: product?._id,
                            creator: stxAddress,
                            uri: "record"
                        }
                    })
                    if (query) dataDeploy.deployHash = query.txId
                } else {
                    const res = await recordModel.record({ commission, product, royalty: data.royalty, blockchain: data.blockchain, sku, quantity, imageUrl, accountAddress })
                    if (res) dataDeploy.deployHash = res
                }

                await recordModel.deploy(dataDeploy)
                resolve(dataDeploy.deployHash)
            } catch (error) {
                reject(error)
            }
        })
    },

    request: ({ accountAddress, params: { sku }, stack: { isRequestPending, openContractCall, stxAddress } }: IRequest) => {
        return new Promise<any>(async (resolve: any, reject) => {
            try {
                const tokenID = sku?.recordData?.data?.details?.token_id
                const blockchain: string = sku?.recordData?.recordNetwork
                const quantity = sku.recorded_quantity

                if (blockchain === "STACKS") {
                    const request = await stacksRequest({
                        isRequestPending,
                        openContractCall,
                        params: {
                            amount: quantity,
                            commission: sku?.recordData?.data?.details?.commision,
                            id: parseInt(tokenID),
                            publisher: stxAddress
                        }
                    })
                    resolve(request.txId)
                } else {
                    const request = await getNetworkProvider(Chain[blockchain], Network[appDeveloment ? "TESTNET" : "MAINNET"], accountAddress).publishRequest(sku?.recordData?.data?.details?.recipient, tokenID)
                    resolve(request)
                }
            } catch (error) {
                reject(error)
            }
        })
    },

    accept: ({ accountAddress, params: { shop, accept }, stack: { isRequestPending, openContractCall } }: IAccept) => {
        return new Promise<any>(async (resolve, reject) => {
            try {
                const requestID = shop?.recordData?.details?.request_id
                const blockchain: string = shop.sku[0]?.recordData?.recordNetwork
                let deployHash = null
                if (blockchain === "STACKS") {
                    const request = await acceptModel.approveRequestStack({ isRequestPending, openContractCall, params: { id: requestID, publisher: shop?.recordData?.details?.publisher } })
                    deployHash = request.txId
                    resolve(deployHash)
                } else {
                    const accept = await getNetworkProvider(Chain[blockchain], Network[appDeveloment ? "TESTNET" : "MAINNET"], accountAddress).approveRequest(requestID)
                    deployHash = accept
                    resolve(deployHash)
                }
                await acceptModel.deploy({ deployHash, accept, chain: blockchain, shop })
            } catch (error) {
                reject(error)
            }
        })

    }
})

export default web3Model