// import { Iproperties, IpropertiesItems } from "pages/product/single/context"
import { Iproperties } from "lib/apis/product/interfaces"
import AppendModule from "./module/append"

interface ItypesAvailable {
    state: Array<Iproperties>
    propertyValue: string
    typeID: string
}

export interface IaddProperty {
    state: Array<Iproperties>
    value: string
    index: number
}

interface IappendHandle {
    state: Array<Iproperties>
    types: Array<any>
}

export default class PropertiesFormModel {
    private static append = AppendModule

    // This method for button "Make New Properties" in "PropertiesForm" component
    static appendHandle = ({ state, types }: IappendHandle): Array<Iproperties> => {
        if (state.length) {

            // Check exist left types for append
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
    static typesAvailable = ({ state, propertyValue, typeID }: ItypesAvailable): Boolean => {
        const indexesState = state.map((el) => {
            return el.value
        })

        return [propertyValue, ...indexesState].includes(typeID)
    }

    // Set new property
    static addProperty = ({ state, value, index }: IaddProperty): Array<Iproperties> => {
        const propertiesLenght = state.length > 1
        return this.append.loopProperty({
            state,
            action: (el: Iproperties, key: number) => {
                return {
                    value: key === index ? value : el.value,
                    title: key === index ? this.append.getCaption(value) : this.append.getCaption(el.value),
                    items: propertiesLenght ? el.items : []
                }
            }
        })
    }

    // Make data 
    static makeData = (state: Array<Iproperties>) => {
        return state.filter(el => el.value && el.items.filter(item => item.value.length).length)
    }
}