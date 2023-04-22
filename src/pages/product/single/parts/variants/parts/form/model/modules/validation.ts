import { string } from "yup";
import { IvalidationFormSku } from "../model";
import { Isku } from "apis/product/interfaces";

export default class SkuFormValidationModule {

    static isValidateProperties = (skues: Array<Isku>) => Boolean(skues.filter(el => !el.options.filter(option => option.value.length).length).length)

    // Make properties for push to validate schema
    static propertyValidation = ({ formData, skues }: IvalidationFormSku) => {
        let shapes = {};

        if (formData?.properties) {
            Object.keys(formData.properties).forEach(el => {
                shapes[el] = string().required();
            });
        }
        return shapes
    }

}