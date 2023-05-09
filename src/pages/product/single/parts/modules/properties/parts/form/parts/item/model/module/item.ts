import { Isku } from "lib/apis/product/interfaces"

export interface IcheckRemoveItem {
    skues: Array<Isku>
    item: {
        value: string | number
        variantID: string
    }
}

export default class itemModule {
    static check = ({ item: { value, variantID }, skues }: IcheckRemoveItem):Isku => {
        return skues.filter(sku => sku.options.filter(option => option.variantID === variantID && option.value === value).length)[0]
    }
}