import { ButtonProps } from "@chakra-ui/react"

export interface IDataGridButtonsitems {
    caption: string
    onClick?: Function
    to?: string
    buttonProps?: ButtonProps
}

export interface IDataGridButtons {
    buttons?: Array<IDataGridButtonsitems>
}