import { types } from 'pages/product/single/parts/properties/parts/form/model/model'

export default class RequestProductModel {
    static getCaption = (id: string) => types.find(el => el._id === id).name

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