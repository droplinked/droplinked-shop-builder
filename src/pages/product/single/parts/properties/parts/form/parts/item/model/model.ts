import { Iproperties, IpropertiesItems } from "apis/product/interfaces"
import AppendModule from "../../../model/module/append"
import itemModule, { IcheckRemoveItem } from "./module/item"
import { IaddProperty } from "../../../model/model"

interface IremoveItem {
    state: Array<Iproperties>
    keyItem: number
    keyProperty: number
}

interface IappendPropertyItem {
    state: Array<Iproperties>
    keyProperty: number
}

interface IaddItem extends IaddProperty {
    keyProperty: number
}

export default class propertyItemModel {
    private static append = AppendModule
    private static itemModule = itemModule

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
    static removePropertyItem = ({ keyItem, keyProperty, state }: IremoveItem): Array<Iproperties> => {
        return this.append.loopProperty({
            state,
            action: (el: Iproperties, key: number) => {
                return {
                    ...el,
                    items: keyProperty === key ? el.items.filter((item, index) => {
                        if (keyItem !== index) return item
                    }) : el.items
                }
            }
        })
    }

    // Check this item use in property
    static checkUsedPropertyItem = (params: IcheckRemoveItem) => {
        return new Promise((resolve, reject) => {
            const check = this.itemModule.check(params)
            if (check && params.item.value.toLocaleString().length) {
                reject(check)
            } else {
                resolve(true)
            }
        })
    }
}