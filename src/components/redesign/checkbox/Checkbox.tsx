import { Checkbox as ChakraCheckbox, CheckboxProps } from "@chakra-ui/react"
import React from "react"

const checkboxStyles = {
    ".chakra-checkbox__label": { fontSize: 14 },
    ".chakra-checkbox__control": {
        width: 20,
        height: 20,
        border: "1px solid #3C3C3C",
        borderRadius: 4
    }
}

function Checkbox({ children, ...rest }: CheckboxProps) {
    return (
        <ChakraCheckbox
            color="#FFF"
            css={checkboxStyles}
            {...rest}
        >
            {children}
        </ChakraCheckbox>
    )
}

export default Checkbox