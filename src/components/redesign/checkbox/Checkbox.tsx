import { Checkbox as ChakraCheckbox, CheckboxProps } from "@chakra-ui/react"
import React from "react"

function Checkbox({ children, ...rest }: CheckboxProps) {
    return (
        <ChakraCheckbox
            color="#FFF"
            css={{
                ".chakra-checkbox__label": { fontSize: 14 },
                ".chakra-checkbox__control": {
                    width: 20,
                    height: 20,
                    border: "1px solid #3C3C3C",
                    borderRadius: 4,
                    backgroundColor: "transparent",
                    "&[data-checked]": {
                        backgroundColor: "#2BCFA1",
                        borderColor: "#2BCFA1",
                        "& svg": { stroke: "#141414 !important" }
                    }
                }
            }}
            {...rest}
        >
            {children}
        </ChakraCheckbox>
    )
}

export default Checkbox