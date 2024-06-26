import { Iproperties, IpropertiesItems } from "lib/apis/product/interfaces";
import AppendModule from "../../model/module/append";

interface IremoveItem {
    state: Array<Iproperties>;
    valueItem: string;
}

interface IappendPropertyItem {
    state: Array<Iproperties>;
    keyProperty: number;
}

export interface IaddPropertyItem {
    item: {
        title: string;
        value: string;
        caption: string;
    };
}

interface IaddProperty extends IaddPropertyItem {
    properties: Array<Iproperties>;
}

interface IcheckUsedPropertyItem {
    propertyValue: string;
    properties: Array<Iproperties>;
}

const propertyItemModel = {
    // Set item for property
    addPropertyItem: ({ item, properties }: IaddProperty): Array<Iproperties> => {
        let updatedProperties: Iproperties[] = JSON.parse(JSON.stringify(properties));

        // Find the property index by title
        const propertyIndex = updatedProperties.findIndex((p) => p.title === item.title);

        // Check if the property already exists
        if (propertyIndex !== -1) {
            // If it exists, add the new item to the items array of the property
            updatedProperties[propertyIndex].items.push({ value: item.value, caption: item.caption });
        } else {
            // If it does not exist, create a new property with the item
            updatedProperties.push({
                title: item.title,
                items: [{ value: item.value, caption: item.caption }],
            });
        }

        return updatedProperties;
    },

    // Remove item property
    removePropertyItem: ({ valueItem, state }: IremoveItem): Array<Iproperties> => {
        return AppendModule.loopProperty({
            state,
            action: (el: Iproperties, key: number) => {
                return {
                    ...el,
                    items: el.items.filter((item) => item.value.toLowerCase() !== valueItem.toLowerCase()),
                };
            },
        });
    },

    // Check this item use in property
    checkUsedPropertyItem: ({ properties, propertyValue }: IcheckUsedPropertyItem) => {
        return new Promise((resolve, reject) => {
            const check = properties.find((el) => el.items.find((item) => item.value === propertyValue));
            if (check) {
                reject(check);
            } else {
                resolve(true);
            }
        });
    },
};

export default propertyItemModel;
