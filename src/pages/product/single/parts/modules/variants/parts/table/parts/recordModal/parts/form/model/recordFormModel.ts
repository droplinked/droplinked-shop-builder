import { product_type } from "lib/apis/product/interfaces"
import { binanceRecordMerch } from "lib/utils/blockchain/binance/record"
import { PolygonLogin } from "lib/utils/blockchain/polygon/metamaskLogin"
import { binanceLogin } from "lib/utils/blockchain/binance/binanceWallet"
import { record_merch_polygon } from "lib/utils/blockchain/polygon/record"
import { XRPLogin } from "lib/utils/blockchain/ripple/xrpLogin"
import { XRPRecordMerch } from "lib/utils/blockchain/ripple/xrpRecord"
import RecordCasperModule from "./modules/casperModel"
import { BinanceMetamaskLogin } from "lib/utils/blockchain/binance/metamaskLogin"

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

    record: async ({ product, commission, blockchain, quantity, sku }: Irecord) => {
        let methods = { login: null, record: null }

        switch (blockchain) {
            case "POLYGON":
                methods = {
                    login: PolygonLogin,
                    record: record_merch_polygon
                }
            case "RIPPLE":
                methods = {
                    login: XRPLogin,
                    record: XRPRecordMerch
                }
            case "BINANCE":
                methods = {
                    login: BinanceMetamaskLogin,
                    record: binanceRecordMerch
                }
        }

        const login = await methods.login()
        const record = await methods.record(sku, login.address, product.title, product.description, product.media[0].url, sku.price * 100, product.product_type === "PRINT_ON_DEMAND" ? quantity : sku.quantity, commission * 100)

        return record
    }
})

export default RecordModalModule