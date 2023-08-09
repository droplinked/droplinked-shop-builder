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

 const propertyItemModel = ({

    // Append new row item to property
    appendPropertyItem : ({ state, keyProperty }: IappendPropertyItem) => {
        return AppendModule.loopProperty({
            state,
            action: (el: Iproperties, key: number) => {
                return {
                    ...el,
                    items: keyProperty === key ? [...el.items, ...AppendModule.mockItem()] : el.items
                }
            }
        })
    },

    // Set item for property
    addPropertyItem : ({ item, properties }: IaddProperty): Array<Iproperties> => {
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
    },

    // Remove item property
    removePropertyItem : ({ valueItem, state }: IremoveItem): Array<Iproperties> => {
        return AppendModule.loopProperty({
            state,
            action: (el: Iproperties, key: number) => {
                return {
                    ...el,
                    items: el.items.filter(item => item.value.toLowerCase() !== valueItem.toLowerCase())
                }
            }
        })
    },

    // Check this item use in property
    checkUsedPropertyItem : ({ properties, propertyValue }: IcheckUsedPropertyItem) => {
        return new Promise((resolve, reject) => {
            const check = properties.find(el => el.items.find(item => item.value === propertyValue))
            if (check) {
                reject(check)
            } else {
                resolve(true)
            }
        })
    },

 })

 export default propertyItemModel