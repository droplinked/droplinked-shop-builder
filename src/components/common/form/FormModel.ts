import { InputProps } from "@chakra-ui/react"

export interface IAppForm {
    error?: string
    label?: string
    name: string
    loading?: boolean
}

const FormModel = ({
    baseStyleProps: () => {
        return {
            borderColor: "#141414",
            errorBorderColor: "red.200",
            backgroundColor: "#141414",
            padding: "22px 17px",
            fontSize: "14px",
            color: "#C2C2C2",
        }
    },
    styleProps: () => {
        return {
            ...FormModel.baseStyleProps(),
            _placeholder: {
                color: "#808080",
                opacity: "1"
            },
            _focus: {
                borderColor: "none",
                backgroundColor: "#141414",
            },
            _hover: {
                borderColor: "none",
                backgroundColor: "#141414",
            }
        }
    }
})

export default FormModel 