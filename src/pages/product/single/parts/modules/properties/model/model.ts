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

const append = AppendModule

const PropertiesFormModel = ({

    // This method for button "Make New Properties" in "PropertiesForm" component
    appendHandle: ({ state, types }: IappendHandle): Array<Iproperties> => {
        if (state.length) {

            // Check exist left types for append
            const checkLePr = append.checkLengthProperty({
                properties: state,
                types
            })
            if (checkLePr) return state

            return append.appendProperty(state)

        } else {
            return append.mock()
        }
    },

    // check and filter types can choose
    typesAvailable: ({ state, propertyValue, typeID }: ItypesAvailable): Boolean => {
        const indexesState = state.map((el) => {
            return el.value
        })
        return [propertyValue, ...indexesState].includes(typeID)
    },

    // Set new property
    addProperty: ({ state, value, index }: IaddProperty): Array<Iproperties> => {
        const propertiesLenght = state.length > 1
        return append.loopProperty({
            state,
            action: (el: Iproperties, key: number) => {
                return {
                    value: key === index ? value : el.value,
                    title: key === index ? append.getCaption(value) : append.getCaption(el.value),
                    items: propertiesLenght ? el.items : []
                }
            }
        })
    },

    // Make data 
    makeData: (state: Array<Iproperties>) => {
        return state.filter(el => el.value && el.items.filter(item => item.value.length).length)
    }
})

export default PropertiesFormModel