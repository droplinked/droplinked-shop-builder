import { object, string } from 'yup';
import dataFactoryModule from './modules/dataFactory';
import { Isku } from 'apis/product/interfaces';

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

class VariantsFormModel {
    private static dataFactory = dataFactoryModule

    // toast error message
    static validation = (data: ImakeDataService) => {
        // Make properties for push to validate schema
        let shapes = {};
        if (data?.properties) {
            Object.keys(data.properties).forEach(el => {
                shapes[el] = string().required();
            });
        }

        let schema = object({
            price: string().required(),
            externalID: string().required(),
            height: string().required(),
            length: string().required(),
            quantity: string().required(),
            weight: string().required(),
            width: string().required(),
            ...shapes
        });
        return schema.validate({ ...data, ...data.properties });
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
            ...properties && ids && { options: this.dataFactory.makeProperties(properties, ids) },
            price: parseFloat(price),
            record: false,
            weight: parseFloat(weight),
            quantity: parseFloat(quantity),
            ..._id && { _id }
        }
    }
}

export default VariantsFormModel