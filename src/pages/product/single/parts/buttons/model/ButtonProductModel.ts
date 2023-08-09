import { IproductState, Isku } from 'lib/apis/product/interfaces'
import AppErrors from 'lib/utils/statics/errors/errors'
import { typesProperties } from 'lib/utils/statics/types'
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

const ButtonsProductClass = ({
    validate: ({ state, draft }: Ivalidate) => {
        return new Promise(async (resolve, reject) => {
            try {
                let error = new Error();

                if (!draft) {
                    if (!state.sku.length) {
                        error.message = "Please enter sku"
                        throw error
                    } else if (state.sku.length && state.product_type === "NORMAL" && ProductValidateModel.skues({ skues: state.sku })) {
                        error.message = "Please enter Quantity for all SKUs"
                        throw error
                    } else if (state.sku.find(el => !el.price)) {
                        error.message = "Please enter Price for all SKUs"
                        throw error
                    } else if (state.product_type === "NORMAL" && state.sku.find(el => !el.dimensions.height || !el.dimensions.width || !el.dimensions.length)) {
                        error.message = "Please enter packaging size property for all SKUs"
                        throw error
                    } else if (state.m2m_positions.length && !state.m2m_services.length) {
                        error.message = "Please choose customers wallet options"
                        throw error
                    } else if ((state.artwork && !state.artwork_position) || (state.artwork2 && !state.artwork2_position)) {
                        error.message = "Please choose position for artworks"
                        throw error
                    }
                }

                if (state.product_type === "PRINT_ON_DEMAND" && state.sku.length && !ProductValidateModel.checkExistAllPropperty({ properties: state.properties })) {
                    error.message = `Please enter all property (${typesProperties.map(el => el.name).join(', ')})`
                    throw error
                }

                const schema = object({
                    ...!draft && {
                        ...state.shippingType === "CUSTOM" && { shippingPrice: number().min(1, "Shipping Cost not valid").required("Shipping Cost is required") },
                        sku: array().min(1, AppErrors.product.sku_not_added).required(),
                        media: array().min(1, AppErrors.product[state.product_type === "PRINT_ON_DEMAND" ? "mockup_image_required" : "product_image_required"]).required(),
                    },
                    description: string().required(),
                    title: string().required(),
                })

                await schema.validate(state)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    },

    makeData: ({ state, draft, productID }: ImakeData) => {

        // Check PRINT_ON_DEMAND
        if (state.product_type === "PRINT_ON_DEMAND") state.shippingType = "DLW"

        const updateData = (publish_product: boolean) => MakeDataProductModel.update({ state: { ...state, publish_product } })
        const data = { ...state, sku: MakeDataProductModel.refactorSku({ skues: state.sku }) }
        return draft ? productID ? updateData(false) : { ...data, publish_product: false } : productID ? updateData(true) : { ...data, publish_product: true }

    },

    makeskuUpdate: ({ sku }: ImakeskuUpdate) => {
        return {
            "quantity": sku.quantity,
            "price": sku.price,
            "weight": sku.weight,
            "externalID": sku.externalID,
            "dimensions": sku.dimensions,
        }
    }
})

export default ButtonsProductClass