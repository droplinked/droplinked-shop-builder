import { IproductState } from "lib/apis/product/interfaces"

interface Iupdate {
    state: IproductState
}

export default class MakeDataProductModel {
    static update = ({ state }: Iupdate) => {
        return {
            "title": state.title,
            "description": state.description,
            "priceUnit": state.priceUnit,
            "productCollectionID": state.productCollectionID,
            "media": state.media,
            "publish_product": state.publish_product,
            "sku": state.sku.filter(el => !el._id)
        }
    }
}