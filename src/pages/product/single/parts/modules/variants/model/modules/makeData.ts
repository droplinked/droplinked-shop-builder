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
}

export default class VariantsMakeDataModel {
    static sort = ({ properties }: Isort) => properties.sort((a, b) => b.items.length - a.items.length)

    static makePropertyChild = ({ sort }: ImakePropertyItem) => {
        return sort.reduceRight((acc, curr: any) => {
            curr.child = acc;
            return curr;
        }, null)
    }

    static getOptions = ({ properties, skues, product_type }: IgetOptions): Array<Isku> => {
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
                arr.push({
                    ...sku || data,
                    options: optionCombination,
                });
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
}