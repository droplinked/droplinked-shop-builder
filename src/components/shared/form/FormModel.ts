import { InputProps } from "@chakra-ui/react"

export interface IAppForm {
    error?: string
    label?: string
    name: string
    loading?: boolean
}

export default class FormModel {
    static styleProps = () => {
        return {
            borderColor: "#141414",
            errorBorderColor: "red.200",
            backgroundColor: "#141414",
            padding: "22px 17px",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#808080",
            _placeholder: {
                color: "#808080"
            },
            _focus: {
                borderColor: "none"
            },
            _hover: {
                borderColor: "none"
            }
        }
    }
}