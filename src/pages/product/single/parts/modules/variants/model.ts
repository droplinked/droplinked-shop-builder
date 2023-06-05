import { Iproperties, Isku, IskuOption, product_type } from "lib/apis/product/interfaces"

interface IcheckAvailable {
    variants: any
    options: Array<IskuOption>
}

interface Irefactor {
    properties: Array<Iproperties>
    skues: Array<Isku>
    product_type: product_type
    variants: any
}

interface IfindByOptionSku {
    options: Array<IskuOption>
    skues: Array<Isku>
}


export default class VariantsProductModel {
    static findByOptionSku = ({ options, skues }: IfindByOptionSku) => {
        return skues.find(el => JSON.stringify(el.options) === JSON.stringify(options))
    }

    static checkAvailable = ({ options, variants }: IcheckAvailable) => {
        const blank_options = variants?.blank_options
        if (blank_options && blank_options[0]) {
            const getVariant = blank_options[0][options[0].value]
            const sizes = getVariant?.sizes
            return sizes && sizes.includes(options[1].value)
        }
        return false
    }

    static refactor = ({ properties, skues, variants, product_type }: Irefactor) => {
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
                if (properties[1] && properties[1].items.length) {
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
                        // if ((product_type === "PRINT_ON_DEMAND" && this.checkAvailable({ options, variants }) || ["DIGITAL", "NORMAL"].includes(product_type)) && options.length > 1) 
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