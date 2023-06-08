import { IproductState, Isku } from 'lib/apis/product/interfaces'
import AppErrors from 'lib/utils/statics/errors/errors'
import { object, string, array, number } from 'yup'
import MakeDataProductModel from './modules/MakeDataProduct'
import ProductValidateModel from './modules/validate'

interface ImakeData {
    state: IproductState
    draft: boolean
    productID: string
}

interface ImakeskuUpdate {
    sku: Isku
}

interface Ivalidate {
    state: IproductState
    draft: boolean
}

export default class ButtonsProductClass {
    private static makemodel = MakeDataProductModel
    private static skumodel = ProductValidateModel

    static validate = ({ state, draft }: Ivalidate) => {
        return new Promise(async (resolve, reject) => {
            try {
                // Check skue externals IDs
                if (state.sku.length && this.skumodel.skues({ skues: state.sku })) {
                    let error = new Error();
                    error.message = "Please enter External IDs and Quantity for all SKUs"
                    throw error
                }

                const schema = object({
                    ...!draft && {
                        ...state.shippingType === "CUSTOM" && { shippingPrice: number().min(1, "Shipping Cost not valid").required("Shipping Cost is required") },
                        sku: array().min(1, AppErrors.product.sku_not_added).required(),
                        media: array().min(1, AppErrors.product.product_image_required).required(),
                        ...state.product_type === "PRINT_ON_DEMAND" && {
                            artwork: string().required(AppErrors.product.artwork_should_be_provided),
                        }
                    },
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

    static makeData = ({ state, draft, productID }: ImakeData) => {
        const updateData = (publish_product: boolean) => this.makemodel.update({ state: { ...state, publish_product } })
        const data = { ...state, sku: MakeDataProductModel.refactorSku({ skues: state.sku }) }

        return draft ? productID ? updateData(false) : { ...data, publish_product: false } : productID ? updateData(true) : { ...data, publish_product: true }
    }

    static makeskuUpdate = ({ sku }: ImakeskuUpdate) => {
        return {
            "quantity": sku.quantity,
            "price": sku.price,
            "weight": sku.weight,
            "externalID": sku.externalID,
            "dimensions": sku.dimensions,
        }
    }
}