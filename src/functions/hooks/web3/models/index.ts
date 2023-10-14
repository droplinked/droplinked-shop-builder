import { Isku } from "lib/apis/product/interfaces"
import { appDeveloment } from "lib/utils/app/variable"
import { publish_request } from "lib/utils/blockchain/casper/casper_wallet_publish_request"
import { stacksRecord } from "lib/utils/blockchain/stacks/record"
import { getNetworkProvider } from "lib/utils/chains/chainProvider"
import { Chain, Network } from "lib/utils/chains/Chains"
import ModalRequestModel from "pages/affiliate/product/parts/requests/parts/modalRequest/parts/form/model"
import RecordCasperModule from "./module/record/modules/casperModel"
import recordModel, { Ideploy, IStacks } from "./module/record/recordModel"

interface IRecordData {
    commission: any
    quantity: any
    blockchain: any
}

export interface IRecordPrams {
    data: IRecordData
    product: any
    sku: any
    stacks: IStacks
    imageUrl?: string
}

export interface Irecord {
    params: IRecordPrams
    accountAddress: any
}

export interface IRequestData {
    sku: Isku
    stack: {
        stacksRequest: any
        isRequestPending: any
        openContractCall: any
        stxAddress: any
    }
}

interface IRequest {
    params: IRequestData
    accountAddress: any
}

const web3Model = ({
    record: async ({ params: { data, product, sku, stacks: { isRequestPending, login, openContractCall, stxAddress }, imageUrl }, accountAddress }: Irecord) => {
        return new Promise<void>(async (resolve: any, reject) => {
            try {
                const commission = data.commission
                const quantity: any = data.quantity
                const dataDeploy: Ideploy = {
                    data, deployHash: '', product, sku
                }
                if (data.blockchain === "CASPER") dataDeploy.deployHash = await RecordCasperModule.casper({ commission, product, sku, quantity, accountAddress: accountAddress.publicKey })
                else if (data.blockchain === "STACKS") {
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
                } else if (["POLYGON", "RIPPLESIDECHAIN", "BINANCE"].includes(data.blockchain)) {
                    const res = await recordModel.record({ commission, product, blockchain: data.blockchain, sku, quantity, imageUrl, accountAddress })
                    if (res) dataDeploy.deployHash = res
                }

                await recordModel.deploy(dataDeploy)
                resolve(dataDeploy.deployHash)
            } catch (error) {
                console.log(error);

                reject(error)
            }
        })
    },

    request: ({ params: { sku, stack: { stacksRequest, isRequestPending, openContractCall, stxAddress } }, accountAddress }: IRequest) => {
        return new Promise<any>(async (resolve: any, reject) => {
            try {
                const tokenID = sku?.recordData?.data?.details?.token_id
                const blockchain: string = sku?.recordData?.recordNetwork
                const quantity = sku.recorded_quantity

                if (blockchain === "CASPER") {
                    const publish = await publish_request(
                        parseInt(sku?.recordData?.data?.details?.holder_id),
                        quantity,
                        sku?.recordData?.data?.details?.recipient,
                        {
                            publicKey: accountAddress.publicKey,
                            account_hash: accountAddress.account_hash,
                            signature: accountAddress.signature
                        }
                    )
                    resolve(publish.deployHash)
                } else if (blockchain === "STACKS") {
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
                } else if (["POLYGON", "RIPPLESIDECHAIN", "BINANCE"].includes(blockchain)) {
                    const request = await getNetworkProvider(Chain[blockchain], Network[appDeveloment ? "TESTNET" : "MAINNET"], accountAddress).publishRequest({ recipient: sku?.recordData?.data?.details?.recipient, tokenID })
                    resolve(request)
                } else {
                    reject(null)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
})

export default web3Model