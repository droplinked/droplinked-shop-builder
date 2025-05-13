import { ButtonProps } from "@chakra-ui/react"
export type BasicButtonStylesTypes = "solid" | "outline" | "ghost" | "link" | "unstyled"

const BasicButtonStyles = ({
    solid: (): ButtonProps => {
        return {
            color: "neutral.gray.1000",
            bgColor: "main.primary",
            border: "2px solid",
            borderColor: "main.primary",
            _hover: {
                borderColor: "main.primary",
                bgColor: "unset",
                color: "main.primary",
            }
        }
    },

    outline: (): ButtonProps => {
        return {
            color: "neutral.white",
            bgColor: "neutral.gray.1000",
            border: "2px solid",
            borderColor: "neutral.gray.800",
            _hover: {
                borderColor: "neutral.gray.500",
                bgColor: "unset",
                color: "text.subtext.placeholder.dark",
            }
        }
    },

    link: (): ButtonProps => {
        return {
            color: "neutral.white",
            bgColor: "none",
            border: "none",
            _hover: {
                bgColor: "unset",
                color: "text.subtext.placeholder.dark",
            }
        }
    },

    ghost: (): ButtonProps => {
        return {
            color: "neutral.gray.300",
            bgColor: "neutral.gray.800",
            border: "none",
            _hover: {
                bgColor: "neutral.gray.800",
                color: "neutral.gray.300",
            }
        }
    }
})

export default BasicButtonStyles
