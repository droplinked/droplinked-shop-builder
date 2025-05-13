const DropDownModel = ({
    style: (error: any) => ({
        control: (baseStyle) => ({
            fontSize: "14px",
            color: "#292929",
            background: "transparent",
            padding: "5px 5px",
            outline: "none",
            boxShadow: "none",
            borderRadius: "8px",
            display: "flex",
            transition: "border-color 0.1s ease-out",
            border: "1px solid",
            borderColor: "#3c3c3c",
            ...error && { borderColor: "#ff2244" },
            ...!error && {
                ":hover": {
                    borderColor: "#3c3c3c"
                },
                ":focus": {
                    borderColor: "#7b7b7b"
                }
            }
        }),
        indicatorSeparator: (baseStyle) => ({
            ...baseStyle,
            display: "none",
            color: "#7b7b7b"
        }),
        indicatorsContainer: (baseStyle) => ({
            ...baseStyle,
            opacity: "0.5"
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#7b7b7b"
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            color: "#ffff",
            backgroundColor: "#222222",
        }),
        container: (baseStyles) => ({
            ...baseStyles,
            color: "#ffff"
        }),
        option: () => ({
            fontSize: "14px",
            padding: "10px 16px",
            ":hover": {
                backgroundColor: "#3c3c3c"
            }
        }),
        valueContainer: (baseStyles) => ({
            ...baseStyles,
            color: "#ffff"
        }),
        input: (baseStyles) => ({
            ...baseStyles,
            color: "#ffff"
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#ffff"
        })
    })
})

export default DropDownModel