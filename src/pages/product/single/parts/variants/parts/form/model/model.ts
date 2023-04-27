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
    [propsName:string]: any
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

export interface IinitialFormikVariantForm {
    properties: Array<any>
    update?: Isku
}

class VariantsFormModel {
    private static dataFactory = dataFactoryModule
    private static validationModule = SkuFormValidationModule

    // Make data for service "post product"
    static makeDataService = (props: ImakeDataService): Isku => {
        const { externalID, height, length, price, quantity, weight, width, properties, ids, _id } = props
        return {
            dimensions: {
                height: parseFloat(height),
                length: parseFloat(length),
                width: parseFloat(width),
            },
            externalID: externalID,
            index: 0,
            options: this.dataFactory.makeProperties(props),
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

    static initialFormik = (props: IinitialFormikVariantForm) => {
        return {
            values : this.validationModule.initialProperties(props),
            schema : this.validationModule.schema(props)
        }
    }
}

export default VariantsFormModel