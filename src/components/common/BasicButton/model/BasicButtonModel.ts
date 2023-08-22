import { ButtonProps, StyleProps, ThemeComponents } from "@chakra-ui/react"
import BasicButtonSizes from "./modules/sizes"
import BasicButtonStyles, { BasicButtonStylesTypes } from "./modules/styles"

export type sizesButton = "small" | "medium" | "large"

export interface IsizesHandel {
    button: StyleProps
    text: "16px" | "12px" | "10px"
}

interface Istyles {
    variant: BasicButtonStylesTypes
}

const sizes = BasicButtonSizes
const styles = BasicButtonStyles

const BasicButtonModel = ({
    stylesHandel: ({ variant }: Istyles): ButtonProps => {
        switch (variant) {
            case "solid":
                return styles.solid()
            case "outline":
                return styles.outline()
            case "link":
                return styles.link()
            case "ghost":
                return styles.ghost()
            default:
                return styles.solid()
        }

    },

    sizesHandel: (size: sizesButton): IsizesHandel => {
        switch (size) {
            case "large":
                return sizes.large()
            case "medium":
                return sizes.medium()
            case "small":
                return sizes.small()

            default:
                return sizes.large()
        }
    }
})

export default BasicButtonModel