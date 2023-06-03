import { Iproperties, Isku } from "lib/apis/product/interfaces"

export default class VariantsProductModel {
    static refactor = (properties: Array<Iproperties>,) => {
        const data: Isku = {
            externalID: "",
            index: 0,
            options: [],
            price: 0,
            quantity: 0,
            record: false,
            weight: 0,
            dimensions: {
                height: 0,
                length: 0,
                width: 0
            }
        }

        let result = []
        if (properties.length) {
            properties[0].items.map(node => {
                if (properties[1]) {
                    properties[1].items.map(items => {
                        result.push({
                            ...data,
                            options: [
                                {
                                    value: node.value,
                                    variantID: properties[0].value,
                                    variantName: properties[0].title
                                },
                                {
                                    value: items.value,
                                    variantID: properties[0].value,
                                    variantName: properties[0].title
                                }
                            ]
                        });
                    })
                } else {
                    result.push({
                        ...data,
                        options: [
                            {
                                value: node.value,
                                variantID: properties[0].value,
                                variantName: properties[0].title
                            }
                        ],
                    });
                }
            })
        }
        return result
    }
}