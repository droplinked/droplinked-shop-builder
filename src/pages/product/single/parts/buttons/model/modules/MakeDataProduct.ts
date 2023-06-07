import { IproductState, Isku } from "lib/apis/product/interfaces"

interface IrefactorSku {
    skues: Array<Isku>
}

interface Iupdate {
    state: IproductState
}

export default class MakeDataProductModel {
    static refactorSku = ({ skues }: IrefactorSku): Array<Isku> => {
        return skues.map((el: any) => ({
            ...el,
            dimensions: {
                height: parseInt(el.dimensions.height),
                length: parseInt(el.dimensions.length),
                width: parseInt(el.dimensions.width),
            },
            price: parseFloat(el.price),
            weight: parseFloat(el.weight),
            quantity: parseInt(el.quantity)
        }))
    }

    static update = ({ state }: Iupdate) => {
        return {
            "title": state.title,
            "description": state.description,
            "priceUnit": state.priceUnit,
            "productCollectionID": state.productCollectionID,
            "media": state.media,
            "publish_product": state.publish_product,
            "product_type": state.product_type,
            "m2m_positions": state.m2m_positions,
            "artwork": state.artwork,
            "artwork2": state.artwork2,
            "sku": state.sku.filter(el => !el._id)
        }
    }
}