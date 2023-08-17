import { Iproperties, Isku, product_type } from "lib/apis/product/interfaces"
import VariantsRefactorModel from "./refactor"

interface Isort {
    properties: Array<Iproperties>
}

interface ImakePropertyItem {
    sort: Array<any>
}

interface IgetOptions {
    skues: Array<Isku>
    properties: Array<Iproperties>
    product_type: product_type
    available_variant: Array<any>
}

interface Icheck_available {
    options: any
    available_variant: Array<any>
}

interface IcheckAvailableExport {
    values: {
        color: string
        size: string
    }
    data: any
    size: {
        id: number
        size: string
        price: number
    }
}

const VariantsMakeDataModel = ({
    sort: ({ properties }: Isort) => properties.sort((a, b) => b.items.length - a.items.length),

    makePropertyChild: ({ sort }: ImakePropertyItem) => {
        return sort.reduceRight((acc, curr: any) => {
            curr.child = acc;
            return curr;
        }, null)
    },

    check_available: ({ available_variant, options }: Icheck_available): IcheckAvailableExport => {
        const values = {
            color: options.find(el => el.variantName === "Color")?.caption || null,
            size: options.find(el => el.variantName === "Size")?.value || null
        }
        const data = available_variant && available_variant.length && available_variant.find(el => el.color === values.color && el.sizes.map(size => size.size).includes(values.size))
        const size = data ? data.sizes.find(el => el.size === values.size) : null
        return {
            values,
            data,
            size: {
                id: size?.id,
                price: size?.finalPrice ? Math.round(parseFloat(size?.finalPrice)) : 0,
                size: size?.size,
            }
        }
    },

    getOptions: ({ properties, skues, product_type, available_variant }: IgetOptions): Array<Isku> => {
        const arr: any = [];
        const data: Isku = {
            externalID: "",
            index: 0,
            options: [],
            price: 0,
            quantity: product_type === "PRINT_ON_DEMAND" ? -1 : 0,
            record: false,
            weight: 0,
            dimensions: {
                height: 0,
                length: 0,
                width: 0
            }
        }

        const handle = (obj: any, options: any = []) => {
            if (!obj) {
                const optionCombination = options.map(option => {
                    return {
                        value: option.value,
                        variantID: option.variantID,
                        variantName: option.variantName,
                        caption: option?.caption
                    };
                });
                const sku = VariantsRefactorModel.findByOptionSku({ options, skues })
                const dataNew = {
                    ...sku || data,
                    options: optionCombination
                }

                // Check available
                const check = available_variant.length && optionCombination.length > 1 && optionCombination.find(el => el.variantName === "Color")
                if (product_type === "PRINT_ON_DEMAND" && check) {
                    const available = VariantsMakeDataModel.check_available({ available_variant, options: optionCombination })
                    if (!available.data) return
                    dataNew.externalID = available.size.id.toString()
                }

                arr.push(dataNew);
                return;
            }

            const variantOption = {
                value: "",
                variantID: obj.value,
                variantName: obj.title,
                caption: ""
            };

            for (let i = 0; i < obj.items.length; i++) {
                variantOption.value = obj.items[i].value;
                variantOption.caption = obj.items[i].caption;
                handle(obj.child, [...options, variantOption]);
            }
        }
        handle(properties)

        return arr
    }
})

export default VariantsMakeDataModel