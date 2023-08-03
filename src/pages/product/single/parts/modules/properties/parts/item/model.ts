import { Iproperties, IpropertiesItems } from "lib/apis/product/interfaces"
import AppendModule from "../../model/module/append"

interface IremoveItem {
    state: Array<Iproperties>
    valueItem: string
}

interface IappendPropertyItem {
    state: Array<Iproperties>
    keyProperty: number
}


export interface IaddPropertyItem {
    item: {
        variantID: string
        value: string
        caption: string
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
        properties.forEach(element => {
            result.push({
                ...element,
                items: property && element.value === property.value ? [...element.items, {
                    value: item.value,
                    caption: item.caption
                }] : element.items
            })
        });
        return result
    }

    // Remove item property
    static removePropertyItem = ({ valueItem, state }: IremoveItem): Array<Iproperties> => {
        return this.append.loopProperty({
            state,
            action: (el: Iproperties, key: number) => {
                return {
                    ...el,
                    items: el.items.filter(item => item.value.toLowerCase() !== valueItem.toLowerCase())
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