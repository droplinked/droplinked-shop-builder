import { Iproperties } from "lib/apis/product/interfaces";
import AppendModule from "../../parts/properties/parts/form/model/module/append";

export default class propertyFactor {
    static refactor = (items: Array<any>): Array<Iproperties> => {

        let properties = {}
        items.forEach(item => {
            const data: Array<any> = item
            data.forEach(element => {
                if (!properties[element.variantID]) {
                    properties[element.variantID] = {
                        items: [],
                        title: AppendModule.getCaption(element.variantID),
                        value: element.variantID
                    }
                }
                properties[element.variantID]["items"][element.value] = { value: element.value }
            });

        });
        
        const refactorToArray = Object.keys(properties).map(el => {
            const items = properties[el].items
            return {
                ...properties[el],
                items: Object.keys(items).map(el => {
                    return {
                        value: items[el].value
                    }
                })
            }
        })

        return refactorToArray
    }
}