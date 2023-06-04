import { Iproperties, Isku, IskuOption } from "lib/apis/product/interfaces"

interface Irefactor {
    properties: Array<Iproperties>
    skues: Array<Isku>
}

interface IfindByOptionSku {
    options: Array<IskuOption>
    skues: Array<Isku>
}


export default class VariantsProductModel {
    static findByOptionSku = ({ options, skues }: IfindByOptionSku) => {
        return skues.find(el => JSON.stringify(el.options) === JSON.stringify(options))
    }

    static refactor = ({ properties, skues }: Irefactor) => {
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
                        const options = [
                            {
                                value: node.value,
                                variantID: properties[0].value,
                                variantName: properties[0].title
                            },
                            {
                                value: items.value,
                                variantID: properties[1].value,
                                variantName: properties[1].title
                            }
                        ]
                        const sku = this.findByOptionSku({ options, skues })

                        result.push({
                            ...sku || data, options
                        });
                    })
                } else {
                    const options = [
                        {
                            value: node.value,
                            variantID: properties[0].value,
                            variantName: properties[0].title
                        }
                    ]
                    const sku = this.findByOptionSku({ options, skues })
                    result.push({
                        ...sku || data, options
                    });
                }
            })
        }
        return result
    }
}