import { ButtonProps } from "@chakra-ui/react"
export type BasicButtonStylesTypes = "solid" | "outline" | "ghost" | "link" | "unstyled"

const BasicButtonStyles = ({
    solid: (): ButtonProps => {
        return {
            color: "#084836",
            bgColor: "#2EC99E",
            border: "2px solid #2EC99E",
            _hover: {
                bgColor: "#2EC99E",
                opacity: "0.8"
            }

        }
    },

    outline: (): ButtonProps => {
        return {
            color: "#FFF",
            bgColor: "#1c1c1c",
            border: "2px solid #292929 !important",
            _hover: {
                bgColor: "#1c1c1c",
                opacity: "0.8"
            }
        }
    },

    link: (): ButtonProps => {
        return {
            color: "#FFF",
            bgColor: "none",
            border: "none !important",
            _hover: {
                bgColor: "none",
                opacity: "0.8"
            }
        }
    },

    ghost: (): ButtonProps => {
        return {
            color: "#fff",
            bgColor: "#292929",
            border: "none !important",
            _hover: {
                bgColor: "#292929",
                opacity: "0.8"
            }
        }
    }
})

export default BasicButtonStyles
