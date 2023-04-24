import { number, object, string } from 'yup';
import dataFactoryModule from './modules/dataFactory';
import { Isku } from 'lib/apis/product/interfaces';
import SkuFormValidationModule from './modules/validation';

export interface ImakeDataService {
    _id?: string
    externalID: string
    height: string
    length: string
    price: string
    quantity: string
    weight: string
    width: string
    properties: Array<any>
    ids: Array<any>
}

interface IduplicateCheck {
    params: Isku
    skues: Array<Isku>
    skuKey?: number
}

interface IfindKeySku {
    sku: Isku,
    skues: Array<Isku>,
}

export interface IvalidationFormSku {
    formData: ImakeDataService,
    skues: Array<Isku>,
}

class VariantsFormModel {
    private static dataFactory = dataFactoryModule
    private static validationModule = SkuFormValidationModule

    // Validation sku form
    static validation = (params: IvalidationFormSku) => {
        const { formData } = params

        const valid = (field: string) => number().min(1, `${field} is discorrect`).required().typeError(`${field} is discorrect`)

        let schema = object({
            weight: valid("Weight"),
            width: valid("Width"),
            height: valid("Height"),
            length: valid("Length"),
            quantity: valid("Quantity"),
            price: valid("Price"),
            ... this.validationModule.propertyValidation(params)
        });
        return schema.validate({ ...formData, ...formData.properties });

    }

    // Make data for service "post product"
    static makeDataService = ({ externalID, height, length, price, quantity, weight, width, properties, ids, _id }: ImakeDataService): Isku => {
        return {
            dimensions: {
                height: parseFloat(height),
                length: parseFloat(length),
                width: parseFloat(width),
            },
            externalID: externalID,
            index: 0,
            options: properties && ids ? this.dataFactory.makeProperties(properties, ids) : [],
            price: parseFloat(price),
            record: false,
            weight: parseFloat(weight),
            quantity: parseFloat(quantity),
            ..._id && { _id }
        }
    }

    // Check duplicate sku
    static duplicateCheck = ({ params, skues, skuKey }: IduplicateCheck) => {
        return new Promise((resolve, reject) => {
            params = this.dataFactory.dataSync(params)
            const check = skues.filter((el: Isku, key: number) => {
                el = this.dataFactory.dataSync(el)
                if ((JSON.stringify(el) === JSON.stringify(params)) && key !== skuKey || (el.options.length && JSON.stringify(el.options) === JSON.stringify(params.options) && key !== skuKey)) return el
            }).length
            if (!check) {
                resolve(true)
            } else {
                reject("This sku exist")
            }
        })
    }

    static findKeySku = ({ sku, skues }: IfindKeySku) => {
        return skues.findIndex((el, key) => JSON.stringify(el) === JSON.stringify(sku))
    }
}

export default VariantsFormModel