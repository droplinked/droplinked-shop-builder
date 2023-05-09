import { typesProperties } from "lib/utils/statics/types";

export default class RequestProductModel {
    static getCaption = (id: string) => typesProperties.find(el => el._id === id).name

    static makeOptions = (list: any) => {
        let options = {}
        list.forEach((element: any) => {
            options[this.getCaption(element.variantID)] = {
                value: element.value
            }
        });
        return options
    }
}