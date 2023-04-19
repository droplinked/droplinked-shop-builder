import AppendModule, { IAppendModule, Iitems } from "./module/append"

interface ItypesAvailable {
    state: Array<IAppendModule>
    propertyTitle: string
    typeName: string
}

interface IappendPropertyItem {
    state: Array<IAppendModule>
    keyProperty: number
}

interface IaddProperty {
    state: Array<IAppendModule>
    value: string
    index: number
}

interface IaddItem extends IaddProperty {
    keyProperty: number
}

interface IappendHandle {
    state: Array<IAppendModule>
    types: Array<any>
}

interface IremoveItem {
    state: Array<IAppendModule>
    keyItem: number
    keyProperty: number
}

export default class PropertiesFormModel {
    private static append = AppendModule

    // This method for button "Make New Properties" in "PropertiesForm" component
    static appendHandle = ({ state, types }: IappendHandle): Array<IAppendModule> => {
        if (state.length) {
            const checkLePr = this.append.checkLengthProperty({
                properties: state,
                types
            })
            if (checkLePr) return state
            return this.append.appendProperty(state)
        } else {
            return this.append.mock()
        }
    }

    // check and filter types can choose
    static typesAvailable = ({ state, propertyTitle, typeName }: ItypesAvailable): Boolean => {
        const indexesState = state.map((el) => {
            return el.title
        })
        return [propertyTitle, ...indexesState].includes(typeName)
    }

    // Set new property
    static addProperty = ({ state, value, index }: IaddProperty): Array<IAppendModule> => {
        return this.append.loopProperty({
            state,
            action: (el: IAppendModule, key: number) => {
                return {
                    title: key === index ? value : el.title,
                    items: el.items
                }
            }
        })
    }

    // Append new item to property
    static appendPropertyItem = ({ state, keyProperty }: IappendPropertyItem) => {
        return this.append.loopProperty({
            state,
            action: (el: IAppendModule, key: number) => {
                return {
                    ...el,
                    items: keyProperty === key ? [...el.items, ...this.append.mockItem()] : el.items
                }
            }
        })
    }

    // Set new item for property
    static addPropertyItem = ({ state, value, index, keyProperty }: IaddItem): Array<IAppendModule> => {
        return this.append.loopProperty({
            state,
            action: (el: IAppendModule, key: number) => {
                return {
                    ...el,
                    items: el.items.map<Iitems>((item, keyItem) => {
                        return {
                            value: (keyItem === index) && (keyProperty === key) ? value : item.value,
                            append: false
                        }
                    })
                }
            }
        })
    }

    // Remove item property
    static removePropertyItem = ({ keyItem, keyProperty, state }: IremoveItem): Array<IAppendModule> => {
        return this.append.loopProperty({
            state,
            action: (el: IAppendModule, key: number) => {
                return {
                    ...el,
                    items: keyProperty === key ? el.items.filter((item, index) => {
                        if (keyItem !== index) return item
                    }) : el.items
                }
            }
        })
    }
}