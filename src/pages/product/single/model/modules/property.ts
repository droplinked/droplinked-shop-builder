import { Iproperties } from "lib/apis/product/interfaces";
import AppendModule from "../../parts/modules/properties/model/module/append";

const propertyFactor = ({
    refactor : (items: Array<any>): Array<Iproperties> => {

        let properties = {}
        items.forEach(item => {
            const data: Array<any> = item
            data.forEach(element => {
                if (!properties[element?.variantID]) {
                    properties[element?.variantID || "1"] = {
                        items: [],
                        title: AppendModule.getCaption(element.variantID || "1"),
                        value: element.variantID || "1"
                    }
                }
                properties[element?.variantID || "1"]["items"][element.value] = { 
                    value: element.value,
                    caption: element.caption
                 }
            });

        });
        
        const refactorToArray = Object.keys(properties).map(el => {
            const items = properties[el].items
            return {
                ...properties[el],
                items: Object.keys(items).map(el => {
                    return {
                        value: items[el].value,
                        caption: items[el].caption,
                    }
                })
            }
        })

        return refactorToArray
    }
})

export default propertyFactor