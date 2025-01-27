import { AppButtonProps } from "components/redesign/button/Button"

export interface ButtonGridProp extends AppButtonProps {
    caption: string
}

export interface ButtonGridProps {
    buttons?: Array<ButtonGridProp>
}