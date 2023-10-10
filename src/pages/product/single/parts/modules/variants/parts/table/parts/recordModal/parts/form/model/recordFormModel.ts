import { binanceRecordMerch } from "lib/utils/blockchain/binance/record"
import { PolygonLogin } from "lib/utils/blockchain/polygon/metamaskLogin"
import { record_merch_polygon } from "lib/utils/blockchain/polygon/record"
import { XRPLogin } from "lib/utils/blockchain/ripple/xrpLogin"
import { XRPRecordMerch } from "lib/utils/blockchain/ripple/xrpRecord"
import RecordCasperModule from "./modules/casperModel"
import { BinanceMetamaskLogin } from "lib/utils/blockchain/binance/metamaskLogin"
import { stacksRecord } from "lib/utils/blockchain/stacks/record"
import { recordCasperService } from "lib/apis/sku/services"
import { getNetworkProvider } from "lib/utils/chains/chainProvider"
import { appDeveloment } from "lib/utils/app/variable"
import { Chain, Network } from "lib/utils/chains/Chains"

interface Icasper {
    commission: number
    product: any
    sku: any
    quantity: number
}

interface Irecord {
    product: any
    commission: number
    blockchain: string
    sku: any
    quantity: number
    imageUrl?: string
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

interface IswitchRecord {
    data: IrecordData
    product: any
    sku: any
    stacks: IStacks
    imageUrl?: string
}

interface Ideploy {
    data: IrecordData
    product: any
    sku: any
    deployHash: string
}

const RecordModalModule = ({
    casper: async ({ commission, product, sku, quantity }: Icasper) => {
        const { casperRecord, openCasperWallet } = RecordCasperModule
        const CasperWallet = await openCasperWallet()
        const record = await casperRecord({
            commission,
            product,
            sku,
            publicKey: CasperWallet.publicKey,
            quantity
        })
        if (!record.deployHash) throw Error("Desploy hash empty");

        return record.deployHash
    },

    record: async ({ product, commission, blockchain, quantity, sku, imageUrl }: Irecord) => {

        const provider = getNetworkProvider(Chain[blockchain], Network[appDeveloment ? "TESTNET" : "MAINNET"], process.env.REACT_APP_RECORD_MATCH_POLYGON_RIPPLE)
        const record = await provider.recordProduct(sku, product.title, product.description, imageUrl || product.media[0].url, sku.price * 100, product.product_type === "PRINT_ON_DEMAND" ? quantity : sku.quantity, commission * 100)

        return record
    },

    switchRecord: async ({ data, product, sku, stacks: { isRequestPending, login, openContractCall, stxAddress }, imageUrl }: IswitchRecord) => {
        return new Promise<void>(async (resolve: any, reject) => {
            try {
                const commission = data.commission
                const quantity: any = data.quantity
                const dataDeploy: Ideploy = {
                    data, deployHash: '', product, sku
                }
                if (data.blockchain === "CASPER") {
                    dataDeploy.deployHash = await RecordModalModule.casper({ commission, product, sku, quantity })
                } else if (data.blockchain === "STACKS") {
                    await login()
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
                    const res = await RecordModalModule.record({ commission, product, blockchain: data.blockchain, sku, quantity, imageUrl })
                    if (res) dataDeploy.deployHash = res
                }

                await RecordModalModule.deploy(dataDeploy)
                resolve(dataDeploy.deployHash)
            } catch (error) {
                console.log(error);
                
                reject(error)
            }
        })
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

export default RecordModalModule