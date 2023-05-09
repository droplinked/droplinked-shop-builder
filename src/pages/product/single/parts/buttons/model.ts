import { IproductState } from 'lib/apis/product/interfaces'
import { object, string, array, number } from 'yup'

export default class ButtonsProductClass {
    static validate = (state: IproductState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const schema = object({
                    ...state.shippingType === "CUSTOM" && { shippingPrice: number().min(1, "Shipping Cost not valid").required("Shipping Cost is required") },
                    sku: array().min(1, "Please enter variant").required(),
                    media: array().min(1, "Please choose at least one image").required(),
                    description: string().required(),
                    title: string().required(),
                })

                await schema.validate(state)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
}