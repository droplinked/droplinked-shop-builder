import PropertiesFormModel from "../model"

export interface Iitems {
    value: string
}

export interface IAppendModule {
    title: string
    items: Array<Iitems>
}

export interface IcheckLengthProperty {
    properties: Array<IAppendModule>
    types: Array<IAppendModule>
}

export interface loopProperty {
    state: Array<IAppendModule>
    action: Function
}

class AppendModule {
    static mockItem = (): Array<Iitems> => {
        return [
            {
                value: ""
            }
        ]
    }

    static mock = (): Array<IAppendModule> => {
        return [
            {
                title: "",
                items: this.mockItem()
            }
        ]
    }

    public static checkLengthProperty = ({ types, properties }: IcheckLengthProperty) => {
        return types.length <= properties.length
    }

    // Add new property row
    static appendProperty = (data: Array<any>): Array<IAppendModule> => {
        return [...data, ...this.mock()]
    }

    static loopProperty = ({ action, state }: loopProperty) => {
        return state.map<IAppendModule>((el, key) => action(el, key))
    }
}

export default AppendModule