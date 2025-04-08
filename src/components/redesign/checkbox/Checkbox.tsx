import { Checkbox as ChakraCheckbox, CheckboxProps } from "@chakra-ui/react"
import React from "react"

function Checkbox({ children, ...rest }: CheckboxProps) {
    return (
        <ChakraCheckbox
            color="text.white"
            iconColor="neutral.background"
            colorScheme="primary"
            sx={{
                ".chakra-checkbox__label": { fontSize: 14 },
                ".chakra-checkbox__control": {
                    width: 5,
                    height: 5,
                    border: "1px solid",
                    borderColor: "neutral.gray.700",
                    borderRadius: 4,
                    "&[data-checked]": {
                        backgroundColor: "primary.default",
                        borderColor: "primary.default"
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