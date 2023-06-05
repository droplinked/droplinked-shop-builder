import { IproductState, Isku } from "lib/apis/product/interfaces"

interface Iskues {
    skues: Array<Isku>
}

export default class ProductValidateModel {
    static skues = ({ skues }: Iskues) => {
        return skues.find(sku => !sku.externalID)
    }
}