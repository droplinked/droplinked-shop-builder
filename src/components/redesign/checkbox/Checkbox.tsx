import { Checkbox as ChakraCheckbox, CheckboxProps } from "@chakra-ui/react"
import React from "react"

/**
 * Custom styled checkbox component that extends Chakra UI's Checkbox
 * 
 * @param {object} props - Component props extending Chakra UI's CheckboxProps
 * @param {ReactNode} [props.children] - Label content for the checkbox
 * @param {boolean} [props.isChecked] - Controlled checked state
 * @param {boolean} [props.defaultChecked] - Default checked state (uncontrolled)
 * @param {boolean} [props.isDisabled] - Whether the checkbox is disabled
 * @param {function} [props.onChange] - Function called when the checkbox state changes
 * 
 * @returns {JSX.Element} Styled checkbox component
 */
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
                        backgroundColor: "main.primary",
                        borderColor: "main.primary"
                    },
                    "&[data-disabled]": {
                        backgroundColor: "transparent",
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