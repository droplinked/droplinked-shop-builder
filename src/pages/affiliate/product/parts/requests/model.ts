import { typesProperties } from "lib/utils/statics/types";

const RequestProductModel = ({
    getCaption: (id: string) => typesProperties.find(el => el._id === id).name,

    makeOptions: (list: any) => {
        let options = {}
        list.forEach((element: any) => {
            options[RequestProductModel.getCaption(element.variantID)] = {
                value: element.value
            }
        });
        return options
    }
})

export default RequestProductModel