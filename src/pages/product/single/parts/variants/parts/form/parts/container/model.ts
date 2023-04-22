import { IskuOption } from "apis/product/interfaces";

interface IdefaultValueProperty {
    property: Array<IskuOption>
    caption: string
}

export default class VariantMakeFormModel {
    static defaultValueProperty = ({ caption, property }: IdefaultValueProperty) => {
        const value = property ? property.filter(el => caption === el.variantName) : []

        return value.length ? value[0].value : ""
    }
}