
export interface IAppForm {
    error?: string
    label?: string
    name: string
    loading?: boolean
    description?: string
}

const FormModel = ({
    baseStyleProps: () => {
        return {
            borderColor: "#292929",
            errorBorderColor: "red.200",
            backgroundColor: "#1E1E1E",
            padding: "22px 17px",
            fontSize: "16px",
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
            backgroundColor: "#1E1E1E",
            border: "1px solid #292929",
            _focus: {
                borderColor: "none",
                backgroundColor: "#1E1E1E",
                border: "1px solid #7B7B7B"
            },
            _hover: {
                borderColor: "none",
                backgroundColor: "#1E1E1E",
                border: "1px solid #3C3C3C"
            }
        }
    }
})

export default FormModel 