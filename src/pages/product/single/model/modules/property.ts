import { Iproperties } from "lib/apis/product/interfaces";
import { typesProperties } from "lib/utils/statics/types";

const propertyFactor = {
    refactor: (items: Array<any>): Array<Iproperties> => {
        let properties = {};
        items.forEach((item) => {
            const data: Array<any> = item;
            data.forEach((element) => {
                const variantName = element?.variantName || typesProperties.filter(el => el._id === element?.variantID && el)?.[0]?.name || ""
                if (!properties[variantName]) {
                    properties[variantName] = {
                        items: [],
                        title: variantName,
                        value: element.variantID,
                    };
                }
                properties[variantName]["items"][element.value] = {
                    value: element.value,
                    caption: element.caption,
                };
            });
        });
        const refactorToArray = Object.keys(properties).map((el) => {
            const items = properties[el].items;
            return {
                ...properties[el],
                items: Object.keys(items).map((el) => {
                    return {
                        value: items[el].value,
                        caption: items[el].caption,
                    };
                }),
            };
        });
        return refactorToArray;
    },
};

export default propertyFactor;
