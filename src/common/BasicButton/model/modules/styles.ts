import { ButtonProps } from "@chakra-ui/react"
export type BasicButtonStylesTypes = "solid" | "outline" | "ghost" | "link" | "unstyled"

export default class BasicButtonStyles {
    static solid = (): ButtonProps => {
        return {
            color: "#084836",
            bgColor: "#2EC99E",
            border: "2px solid #2EC99E",
            _hover: {
                borderColor: "#2EC99E",
                bgColor: "unset",
                color: "primary",
            }
        }
    }

    static outline = (): ButtonProps => {
        return {
            color: "#FFF",
            bgColor: "1c1c1c",
            border: "2px solid #292929 !important",
            _hover: {
                borderColor: "#5D5D5D !important",
                bgColor: "unset",
                color: "#offText",
            }
        }
    }

    static link = (): ButtonProps => {
        return {
            color: "#FFF",
            bgColor: "none",
            border: "none !important",
            _hover: {
                bgColor: "unset",
                color: "#offText",
            }
        }
    }

    static ghost = (): ButtonProps => {
        return {
            color: "#FFF",
            bgColor: "#292929",
            border: "none !important",
            _hover: {
                bgColor: "#292929",
                color: "#FFF",
            }
        }
    }

}