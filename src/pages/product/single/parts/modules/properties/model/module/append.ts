import { Iproperties, IpropertiesItems } from "lib/apis/product/interfaces"
import { typesProperties } from "lib/utils/statics/types"

export interface IcheckLengthProperty {
    properties: Array<Iproperties>
    types: Array<Iproperties>
}

export interface loopProperty {
    state: Array<Iproperties>
    action: Function
}

class AppendModule {
    static mockItem = (): Array<IpropertiesItems> => {
        return [
            {
                value: "",
                caption: ""
            }
        ]
    }

    static mock = (): Array<Iproperties> => {
        return [
            {
                title: "",
                items: [],
            }
        ]
    }

    public static checkLengthProperty = ({ types, properties }: IcheckLengthProperty) => {
        return types.length <= properties.length
    }

    // Add new property row
    static appendProperty = (data: Array<any>): Array<Iproperties> => {
        return [...data, ...this.mock()]
    }

    // Get name as variable types
    static getCaption = (value: string): string => {
        const caption = typesProperties.filter(el => el._id === value && el)
        return caption.length ? caption[0].name : ""
    }

    static loopProperty = ({ action, state }: loopProperty) => {
        return state.map<Iproperties>((el, key) => action(el, key))
    }
}

export default AppendModule