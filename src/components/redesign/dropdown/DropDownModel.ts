const DropDownModel = ({
    style: (error: any) => ({
        control: (baseStyle) => ({
            fontSize: "14px",
            color: "#C2C2C2",
            background: "transparent",
            padding: "5px 5px",
            outline: "none",
            boxShadow: "none",
            borderRadius: "8px",
            display: "flex",
            transition: "border-color 0.1s ease-out",
            border: "1px solid #292929",
            ...error && { border: "1px solid #F24" },
            ...!error && {
                ":hover": {
                    borderColor: "#3C3C3C"
                },
                ":focus": {
                    borderColor: "#7B7B7B"
                }
            }
        }),
        indicatorSeparator: (baseStyle) => ({
            ...baseStyle,
            display: "none",
            color: "#7B7B7B"
        }),
        indicatorsContainer: (baseStyle) => ({
            ...baseStyle,
            opacity: "0.5"
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#7B7B7B"
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
            color: "#fff"
        }),
        input: (baseStyles) => ({
            ...baseStyles,
            color: "#fff"
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#fff",
        })
    })
})

export default DropDownModel