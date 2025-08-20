import { Checkbox as ChakraCheckbox, CheckboxProps } from "@chakra-ui/react"
import React from "react"

function Checkbox({ children, size = 'md', ...rest }: CheckboxProps) {
    const sizeMap: Record<string, number> = {
        sm: 4,
        md: 5,
        lg: 6,
    }

    const controlSize = sizeMap[size as keyof typeof sizeMap] ?? 5
    const borderWidth = size === 'lg' ? '1.5px' : '1px'

    return (
        <ChakraCheckbox
            color="text.white"
            iconColor="neutral.background"
            colorScheme="primary"
            size={size as any}
            sx={{
                ".chakra-checkbox__label": { fontSize: 14 },
                ".chakra-checkbox__control": {
                    width: controlSize,
                    height: controlSize,
                    border: `${borderWidth} solid`,
                    borderColor: "neutral.gray.700",
                    borderRadius: 4,

                    // Checked state
                    "&[data-checked]": {
                        backgroundColor: "main.primary",
                        borderColor: "main.primary",
                    },

                    // Disabled (unchecked) state
                    "&[data-disabled]": {
                        backgroundColor: "transparent",
                        borderColor: "button.disable.dark",
                    },

                    // Disabled AND checked state
                    "&[data-disabled][data-checked]": {
                        backgroundColor: "button.disable.dark",
                        borderColor: "button.disable.dark",
                        ".chakra-checkbox__icon": {
                            color: "neutral.gray.650",
                        }
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