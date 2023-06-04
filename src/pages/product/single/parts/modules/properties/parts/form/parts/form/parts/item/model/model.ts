import { Iproperties, IpropertiesItems } from "lib/apis/product/interfaces"
import AppendModule from "../../../../../model/module/append"

interface IremoveItem {
    state: Array<Iproperties>
    valueItem: string
    keyProperty: number
}

interface IappendPropertyItem {
    state: Array<Iproperties>
    keyProperty: number
}


export interface IaddPropertyItem {
    item: {
        variantID: string
        value: string
    }
}

interface IaddProperty extends IaddPropertyItem {
    properties: Array<Iproperties>
}

interface IcheckUsedPropertyItem {
    propertyValue: string
    properties: Array<Iproperties>
}

export default class propertyItemModel {
    private static append = AppendModule

    // Append new row item to property
    static appendPropertyItem = ({ state, keyProperty }: IappendPropertyItem) => {
        return this.append.loopProperty({
            state,
            action: (el: Iproperties, key: number) => {
                return {
                    ...el,
                    items: keyProperty === key ? [...el.items, ...this.append.mockItem()] : el.items
                }
            }
        })
    }

    // Set item for property
    static addPropertyItem = ({ item, properties }: IaddProperty): Array<Iproperties> => {
        const property = properties.find(el => el.value === item.variantID)
        let result = []
        console.log("properties", properties);

        properties.forEach(element => {
            result.push({
                ...element,
                items: element.value === property.value ? [...element.items, {
                    value: item.value
                }] : element.items
            })
        });
        return result
    }

    // Remove item property
    static removePropertyItem = ({ valueItem, keyProperty, state }: IremoveItem): Array<Iproperties> => {
        console.log("ad", { valueItem, keyProperty, state });

        return this.append.loopProperty({
            state,
            action: (el: Iproperties, key: number) => {
                return {
                    ...el,
                    items: keyProperty === key ? el.items.filter((item, index) => {
                        if (valueItem !== item.value) return item
                    }) : el.items
                }
            }
        })
    }

    // Check this item use in property
    static checkUsedPropertyItem = ({ properties, propertyValue }: IcheckUsedPropertyItem) => {
        return new Promise((resolve, reject) => {
            const check = properties.find(el => el.items.find(item => item.value === propertyValue))
            if (check) {
                reject(check)
            } else {
                resolve(true)
            }
        })
    }


}