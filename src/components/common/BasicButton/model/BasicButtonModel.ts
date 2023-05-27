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

export default class BasicButtonModel {
    private static sizes = BasicButtonSizes
    private static styles = BasicButtonStyles

    static stylesHandel = ({ variant }: Istyles): ButtonProps => {
        switch (variant) {
            case "solid":
                return this.styles.solid()
            case "outline":
                return this.styles.outline()
            case "link":
                return this.styles.link()
            case "ghost":
                return this.styles.ghost()
            default:
                return this.styles.solid()
        }

    }

    static sizesHandel = (size: sizesButton): IsizesHandel => {
        switch (size) {
            case "large":
                return this.sizes.large()
            case "medium":
                return this.sizes.medium()
            case "small":
                return this.sizes.small()

            default:
                return this.sizes.large()
        }
    }
}