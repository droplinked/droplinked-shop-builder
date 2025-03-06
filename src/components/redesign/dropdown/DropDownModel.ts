const DropDownModel = ({
    style: (error: any) => ({
        control: (baseStyle) => ({
            fontSize: "14px",
            color: "neutral.gray.300",
            background: "transparent",
            padding: "5px 5px",
            outline: "none",
            boxShadow: "none",
            borderRadius: "8px",
            display: "flex",
            transition: "border-color 0.1s ease-out",
            border: "1px solid",
            borderColor: "neutral.gray.800",
            ...error && { borderColor: "system.error" },
            ...!error && {
                ":hover": {
                    borderColor: "neutral.gray.700"
                },
                ":focus": {
                    borderColor: "text.subtextPlaceholder.dark"
                }
            }
        }),
        indicatorSeparator: (baseStyle) => ({
            ...baseStyle,
            display: "none",
            color: "text.subtextPlaceholder.dark"
        }),
        indicatorsContainer: (baseStyle) => ({
            ...baseStyle,
            opacity: "0.5"
        }),
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "text.subtextPlaceholder.dark"
        }),
        menu: (baseStyles) => ({
            ...baseStyles,
            color: "neutral.white",
            backgroundColor: "neutral.gray.900",
        }),
        container: (baseStyles) => ({
            ...baseStyles,
            color: "neutral.white"
        }),
        option: () => ({
            fontSize: "14px",
            padding: "10px 16px",
            ":hover": {
                backgroundColor: "neutral.gray.700"
            }
        }),
        valueContainer: (baseStyles) => ({
            ...baseStyles,
            color: "neutral.white"
        }),
        input: (baseStyles) => ({
            ...baseStyles,
            color: "neutral.white"
        }),
        singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "neutral.white",
        })
    })
})

export default DropDownModel