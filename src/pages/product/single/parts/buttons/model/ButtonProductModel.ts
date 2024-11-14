import { IStacks } from 'functions/hooks/web3/models/module/record/recordModel'
import { IproductState, Isku } from 'lib/apis/product/interfaces'
import { isDateExpired } from 'lib/utils/helpers/helpers'
import AppErrors from 'lib/utils/statics/errors/errors'
import { typesProperties } from 'lib/utils/statics/types'
import { array, number, object, string } from 'yup'
import MakeDataProductModel from './modules/MakeDataProduct'
import ProductValidateModel from './modules/validate'
import { IShopCurrency } from 'types/interface/shopCurrency.interface'

interface ImakeData {
    state: IproductState
    draft: boolean
    productID: string
    currency: IShopCurrency;
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
                        error.message = "Price field cannot be empty"
                        throw error
                    } else if (!state.sku[0].quantity) {
                        error.message = "Quantity field cannot be empty"
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

                if (state.launchDate && isDateExpired(state.launchDate)) {
                    error.message = "Please choose a further date for launch time"
                    throw error
                }

                if (state.canBeAffiliated && !state.commission) {
                    error.message = "Please enter a valid commission percentage between 1 and 100"
                    throw error
                }

                await schema.validate(state)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    },

    makeData: ({ state: { publish_status, commission, ...rest }, draft, productID, currency }: ImakeData) => {
        const state: IproductState = {
            ...rest,
            commission: commission || 0,
            properties: rest?.properties.map((state_property) => ({ ...state_property, child: null })),
            publish_status: draft ? 'DRAFTED' : publish_status // Set publish_status to DRAFT if draft is true
        };

        // Check PRINT_ON_DEMAND
        if (state.product_type === "PRINT_ON_DEMAND") state.shippingType = state.prodviderID;

        const updateData = (publish_product: boolean) => MakeDataProductModel.update({ state: { ...state, publish_product }, currency: currency });
        const data = { ...state, sku: MakeDataProductModel.refactorSku({ skues: state.sku, currency }) };

        // Ensure publish_product is false when draft is true
        if (draft) {
            return productID ? updateData(false) : { ...data, publish_product: false };
        } else {
            return productID ? updateData(true) : { ...data, publish_product: true };
        }
    },

    record: async ({ method, product, stacks, shop }: Irecord) => {
        const dataForm = {
            data: {
                blockchain: product?.digitalDetail?.chain,
                commission: product.commission,
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