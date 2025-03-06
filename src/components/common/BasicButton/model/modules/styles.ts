import { ButtonProps } from "@chakra-ui/react"
export type BasicButtonStylesTypes = "solid" | "outline" | "ghost" | "link" | "unstyled"

const BasicButtonStyles = ({
    solid: (): ButtonProps => {
        return {
            color: "neutral.gray.1000",
            bgColor: "primary.default",
            border: "2px solid",
            borderColor: "primary.default",
            _hover: {
                borderColor: "primary.default",
                bgColor: "unset",
                color: "primary.default",
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
                color: "text.subtextPlaceholder.dark",
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
                color: "text.subtextPlaceholder.dark",
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
