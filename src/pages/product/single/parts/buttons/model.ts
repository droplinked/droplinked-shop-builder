import { IproductState, Isku } from 'lib/apis/product/interfaces'
import AppErrors from 'lib/utils/statics/errors/errors'
import { object, string, array, number } from 'yup'

interface ImakeDataUpdate {
    state: IproductState
}

interface ImakeskuUpdate {
    sku: Isku
}

export default class ButtonsProductClass {
    static validate = (state: IproductState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const schema = object({
                    ...state.shippingType === "CUSTOM" && { shippingPrice: number().min(1, "Shipping Cost not valid").required("Shipping Cost is required") },
                    sku: array().min(1, AppErrors.product.sku_not_added).required(),
                    media: array().min(1, AppErrors.product.product_image_required).required(),
                    description: string().max(250, AppErrors.product.product_description_too_long).required(),
                    title: string().required(),
                })

                await schema.validate(state)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }

    static makeDataUpdate = ({ state }: ImakeDataUpdate) => {
        return {
            "title": state.title,
            "description": state.description,
            "priceUnit": state.priceUnit,
            "productCollectionID": state.productCollectionID,
            "media": state.media
        }
    }

    static makeskuUpdate = ({ sku }: ImakeskuUpdate) => {
        return {
            "quantity": sku.quantity,
            "price": sku.price,
            "externalID": sku.externalID,
            "dimensions": sku.dimensions,
        }
    }
}