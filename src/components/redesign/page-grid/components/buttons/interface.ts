import { AppButtonProps } from "components/redesign/button/Button"

export interface IDataGridButton extends AppButtonProps {
    caption: string
}

export interface IDataGridButtons {
    buttons?: Array<IDataGridButton>
}