import { IStacks } from 'functions/hooks/web3/models/module/record/recordModel'
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

interface Ivalidate {
    state: IproductState
    draft: boolean
}

interface Irecord {
    method: Function
    product: IproductState
    stacks: IStacks,
    shop: any
}

interface IcheckSkuesRecord {
    sku: Array<Isku>
}

const ButtonsProductClass = ({
    validate: ({ state, draft }: Ivalidate) => {
        return new Promise(async (resolve, reject) => {
            try {
                let error = new Error();

                // Digital product validation
                if (state.product_type === "DIGITAL" && !draft) {
                    if (!state.sku[0].price) {
                        error.message = "Please enter price"
                        throw error
                    } else if (!state.sku[0].quantity) {
                        error.message = "Please enter quantity"
                        throw error
                    } else if (!state?.digitalDetail?.chain) {
                        error.message = "Please enter Blockchain Network"
                        throw error
                    }
                }

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
                        error.message = "Please choose customer wallet options"
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
                        ...state.shippingType === "CUSTOM" && { shippingPrice: number().typeError('Shipping Cost not valid').min(1, "Shipping Cost not valid").required("Shipping Cost is required") },
                        sku: array().min(1, AppErrors.product.sku_not_added).required(),
                        media: array().min(1, AppErrors.product[state.product_type === "PRINT_ON_DEMAND" ? "mockup_image_required" : "product_image_required"]).required(),
                        description: string().required(),
                    },
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
        if (state.product_type === "PRINT_ON_DEMAND") state.shippingType = state.prodviderID
        if (state.product_type === "DIGITAL" && state.sku[0].recordData.status === "NOT_RECORDED") draft = true

        const updateData = (publish_product: boolean) => MakeDataProductModel.update({ state: { ...state, publish_product } })
        const data = { ...state, sku: MakeDataProductModel.refactorSku({ skues: state.sku }) }
        return draft ? productID ? updateData(false) : { ...data, publish_product: false } : productID ? updateData(true) : { ...data, publish_product: true }

    },

    record: async ({ method, product, stacks, shop }: Irecord) => {
        const dataForm = {
            data: {
                blockchain: product?.digitalDetail?.chain,
                commission: product.sku[0].recordData.commision,
                quantity: product.sku[0].quantity,
            },
            shop,
            product,
            sku: product?.sku[0],
            stacks
        }

        return await method(dataForm)
    },

    checkSkuesRecord: ({ sku }: IcheckSkuesRecord) => sku.find(el => ['RECORDED', 'PENDING'].includes(el?.recordData?.status))
})

export default ButtonsProductClass