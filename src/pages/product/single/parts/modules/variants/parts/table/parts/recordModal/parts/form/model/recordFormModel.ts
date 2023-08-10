import { product_type } from "lib/apis/product/interfaces"
import { PolygonLogin } from "lib/utils/blockchain/polygon/metamaskLogin"
import { record_merch_polygon } from "lib/utils/blockchain/polygon/record"
import { XRPLogin } from "lib/utils/blockchain/ripple/xrpLogin"
import { XRPRecordMerch } from "lib/utils/blockchain/ripple/xrpRecord"
import RecordCasperModule from "./modules/casperModel"

interface Icasper {
    commission: number
    product: any
}

interface Irecord {
    product: any
    product_type: product_type
    commission: number,
    blockchain: string
}

const RecordModalModule = ({
    casper: async ({ commission, product }: Icasper) => {
        const { casperRecord, openCasperWallet } = RecordCasperModule
        const CasperWallet = await openCasperWallet()
        const record = await casperRecord({
            commission,
            product,
            publicKey: CasperWallet.publicKey,
        })
        if (!record.deployHash) throw Error("Desploy hash empty");

        return record.deployHash
    },

    record: async ({ product, product_type, commission, blockchain }: Irecord) => {
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
        }

        const login = await methods.login()
        const quantityPOD = '11579208923731619542357098500868790785326998466564056403945758400791312963999'
        const record = await methods.record(product.sku, login.address, product.title, product.description, product.media[0].url, product.sku.price * 100, product_type === "PRINT_ON_DEMAND" ? quantityPOD : product.sku.quantity, commission * 100)

        return record
    }
})

export default RecordModalModule