import { Isku } from "apis/product/interfaces";

export default class SkuTableModel {
    static getRows = (sku: Isku) => {

        // Get options
        let options = {}
        if (sku.options && sku.options.length) {
            sku.options.forEach(element => {
                options[element.variantName] = { value: element.value }
            });
        }

        return {
            quantity: {
                value: sku.quantity
            },
            externalID: {
                value: sku.externalID
            },
            price: {
                props: {
                    width: "20%"
                },
                value: sku.price
            },
            ...options
        }
    }
}