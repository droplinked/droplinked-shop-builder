import { IproductState } from 'apis/product/interfaces'
import { object, string, array } from 'yup'

export default class ButtonsProductClass {
    static validate = (state: IproductState) => {
        return new Promise(async (resolve, reject) => {
            try {
                const schema = object({
                    sku: array().min(1,"Please enter variant").required(),
                    media: array().min(1, "Please choose at least one image").required(),
                    description: string().required(),
                    title: string().required()
                })

                await schema.validate(state)
                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
}