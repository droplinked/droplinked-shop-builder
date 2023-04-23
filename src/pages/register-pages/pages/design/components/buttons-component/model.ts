import { object, string } from "yup"

interface Ivalidation {
    backgroundImage: string
    headerIcon: string
    backgroundText: string
    logo: string,
    backgroundColor: string
    textColor: string
}

export default class DesignRegisterMdel {
    static validation = (designForm: Ivalidation) => {
        const schema = object({
            backgroundColor: string().required(),
            textColor: string().required(),
            backgroundImage: string().required("Header banner is required"),
            backgroundText: string().required("Header title is required"),
            headerIcon: string().required("Header logo is required"),
            logo: string().required(),
        })
        return schema.validate(designForm)
    }
}