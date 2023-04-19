import AppendModule, { IAppendModule, Iitems } from "./module/append"

interface IisSelected {
    state: IAppendModule | []
    item: string
}

interface IappendPropertyItem {
    state: Array<IAppendModule>
    index: number
}

interface IaddProperty {
    state: Array<IAppendModule>
    value: string
    index: number
}

interface IaddItem extends IaddProperty {
    keyProperty: number
}

export default class PropertiesFormModel {
    private static append = AppendModule

    // Initial data for state
    static types = () => {
        return [
            {
                _id: "62a989ab1f2c2bbc5b1e7153",
                name: "Color",
            },
            {
                _id: "62a989e21f2c2bbc5b1e7154",
                name: "Size",
            },
        ]
    }

    // This method for button "Make New Properties" in "PropertiesForm" component
    static appendHandle = (data: Array<any>): Array<IAppendModule> => {
        if (data.length) {
            return this.append.appendProperty(data)
        } else {
            return this.append.mock()
        }
    }

    // get property and check selected
    static isSelected = ({ state, item }: IisSelected): Boolean => {
        console.log(state, item);
        return false
    }

    // Set new property
    static addProperty = ({ state, value, index }: IaddProperty): Array<IAppendModule> => {
        return state.map<IAppendModule>((el, key) => {
            return {
                title: key === index ? value : el.title,
                items: el.items
            }
        })
    }

    // Append new item to property
    static appendPropertyItem = ({ state, index }: IappendPropertyItem) => {
        return state.map<IAppendModule>((el, key) => {
            return {
                ...el,
                items: [...el.items, ...this.append.mockItem()]
            }
        })
    }

    // Set new item for property
    static addPropertyItem = ({ state, value, index, keyProperty }: IaddItem): Array<IAppendModule> => {
        return state.map<IAppendModule>((el, key) => {
            return {
                ...el,
                items: el.items.map<Iitems>((item, keyItem) => {
                    console.log(index, keyItem);
                    return {
                        value: (keyItem === index) && (keyProperty === key) ? value : item.value
                    }
                })
            }
        })
    }
}