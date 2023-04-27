import { InputProps } from "@chakra-ui/react"

export interface IAppForm {
    error?: string
    label?: string
    name: string
}

export default class FormModel {
    static styleProps = () => {
        return {
            borderColor: "#141414",
            errorBorderColor: "red.200",
            backgroundColor: "#141414",
            padding: "15px",
            fontSize: "14px",
            color: "#FFF",
            _focus: {
                borderColor: "none"
            },
            _hover: {
                borderColor: "none"
            }
        }
    }
}