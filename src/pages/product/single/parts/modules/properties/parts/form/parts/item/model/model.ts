import { Iproperties, IpropertiesItems } from "lib/apis/product/interfaces"
import AppendModule from "../../../model/module/append"
import { IaddProperty } from "../../../model/model"

interface IremoveItem {
    state: Array<Iproperties>
    valueItem: string
    keyProperty: number
}

interface IappendPropertyItem {
    state: Array<Iproperties>
    keyProperty: number
}

interface IaddItem extends IaddProperty {
    keyProperty: number
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
    static addPropertyItem = ({ state, value, index, keyProperty }: IaddItem): Array<Iproperties> => {
        return this.append.loopProperty({
            state,
            action: (el: Iproperties, key: number) => {
                return {
                    ...el,
                    items: el.items.map<IpropertiesItems>((item, keyItem) => {
                        return {
                            value: (keyItem === index) && (keyProperty === key) ? value : item.value,
                        }
                    })
                }
            }
        })
    }

    // Remove item property
    static removePropertyItem = ({ valueItem, keyProperty, state }: IremoveItem): Array<Iproperties> => {
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