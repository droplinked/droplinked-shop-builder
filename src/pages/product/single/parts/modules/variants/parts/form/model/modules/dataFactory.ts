import { Isku, IskuOption } from "lib/apis/product/interfaces"
import { typesProperties } from "lib/utils/statics/types"

export default class dataFactoryModule {
    static makeProperties = (props: Object): Array<IskuOption> => {
        const propertyKeyes = typesProperties.map(el => el.name)
        let result = []
        Object.keys(props).forEach(el => {
            if (propertyKeyes.includes(el)) {
                result.push({
                    value: props[el],
                    variantID: typesProperties.filter(type => type.name === el && type)[0]._id,
                    variantName: el,
                })
            }
        })
        return result
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