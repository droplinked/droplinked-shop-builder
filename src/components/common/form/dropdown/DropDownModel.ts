import FormModel from "../FormModel"

const DropDownModel = ({
    style: (error: any) => ({
        control: () => ({
            ...FormModel.baseStyleProps(),
            padding: "4px 7px",
            outline: "none",
            boxShadow: "none",
            borderRadius: "5px",
            ...error && { border: "1px solid #FEB2B2" }
        }),
        indicatorsContainer: (baseStyles) => ({
            ...baseStyles,
            display: "none",
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#555"
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            color: "#FFF",
            backgroundColor: "#222",
        }),
        container: (baseStyles) => ({
            ...baseStyles,
            color: "#FFF"
        }),
        option: () => ({
            fontSize: "14px",
            padding: "10px 16px",
            ":hover": {
                backgroundColor: "#444"
            }
        }),
        valueContainer: (baseStyles) => ({
            ...baseStyles,
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#808080",
        })
    })
})

export default DropDownModel