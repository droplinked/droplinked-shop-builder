import { Isku } from "apis/product/interfaces"
import { ImakeDataService } from "../model"

export default class dataFactoryModule {
    static makeProperties = (properties: Array<any>, ids: Array<any>) => {
        return Object.keys(properties).map(el => {
            return {
                value: properties[el],
                variantID: ids[el],
                variantName: el,
            }
        })
    }
}