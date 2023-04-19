import PropertiesFormModel from "../model"

export interface Iitems {
    value: string
}

export interface IAppendModule {
    title: string
    items: Array<Iitems>
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

    public static checkLengthProperty = (data: Array<IAppendModule>) => {
        return PropertiesFormModel.types().length <= data.length
    }

    // Add new property row
    static appendProperty = (data: Array<any>): Array<IAppendModule> => {
        if (this.checkLengthProperty(data)) return data
        return [...data, ...this.mock()]
    }
}

export default AppendModule