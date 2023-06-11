import { number, object, string } from "yup";
import { IinitialFormikVariantForm, IvalidationFormSku } from "../model";
import { Isku } from "lib/apis/product/interfaces";

interface IgetValueOptions {
    update: Isku
    variantName: string
}

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

    static getValueOptions = ({update,variantName}:IgetValueOptions) => {
        return update ? update.options.filter(el => el.variantName === variantName)[0].value : ""
    }

    static initialProperties = ({ properties, update }: IinitialFormikVariantForm) => {
        const values = {}
        properties.forEach(element => {
            values[element.title] = update ? this.getValueOptions({update,variantName: element.title}) : ''
        });
        return values
    }

    static schema = ({ properties }: IinitialFormikVariantForm) => {
        const shapes = {}
        properties.forEach(element => {
            shapes[element.title] = string().required("Required");
        });

        const valid = (field: string) => number().min(1, `${field} is discorrect`).required(`Required`).typeError(`${field} is discorrect`)

        return object().shape({
            weight: valid("Weight"),
            width: valid("Width"),
            height: valid("Height"),
            length: valid("Length"),
            quantity: valid("Quantity"),
            price: valid("Price"),
            ...shapes
        });
    }

}