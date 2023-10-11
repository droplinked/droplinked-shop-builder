import { object, string } from "yup"

interface Ivalidation {
    backgroundImage: string
    headerIcon: string
    backgroundText: string
    logo: string,
    backgroundColor: string
    textColor: string
}

const DesignRegisterMdel = ({
    validation: (designForm: Ivalidation) => {
        const schema = object({
            backgroundColor: string().required(),
            textColor: string().required(),
            backgroundImage: string().required("Header banner is required"),
            headerIcon: string().required("Header logo is required"),
            logo: string().required(),
            templateID: string().required('Please choose store template'),
        })
        return schema.validate(designForm)
    }
})

export default DesignRegisterMdel