import { Isku } from "apis/product/interfaces"

interface dataSync {
    data1: Isku
    data2: Isku
}

export default class dataFactoryModule {
    static makeProperties = (properties: Array<any>, ids: Array<any>) => {
        return Object.keys(properties).map(el => {
            return {
                value: properties[el],
                variantID: ids[el],
                variantName: el,
            }
        })
    }

    static dataSync = (data: Isku): Isku => {
        return {
            _id: "",
            dimensions: data.dimensions,
            externalID: data.externalID,
            index: data.index,
            options: data.options,
            price: data.price,
            quantity: data.quantity,
            record: data.record,
            weight: data.weight
        }
    }
}