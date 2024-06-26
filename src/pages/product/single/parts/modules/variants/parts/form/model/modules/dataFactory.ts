import { Isku, IskuOption } from "lib/apis/product/interfaces"
import { property_to_id, typesProperties } from "lib/utils/statics/types"

const dataFactoryModule = ({
    makeProperties: (props: Object): Array<IskuOption> => {
        const propertyKeyes = typesProperties.map(el => el.name)
        let result = []
        Object.keys(props).forEach(el => {
            if (propertyKeyes.includes(el)) {
                result.push({
                    value: props[el],
                    variantID: property_to_id?.[el] || undefined,
                    variantName: el,
                })
            }
        })
        return result
    },

    dataSync: (data: Isku): Isku => ({
        _id: "",
        dimensions: data.dimensions,
        externalID: data.externalID,
        index: data.index,
        options: data.options,
        price: data.price,
        quantity: data.quantity,
        record: data.record,
        weight: data.weight
    })
})

export default dataFactoryModule