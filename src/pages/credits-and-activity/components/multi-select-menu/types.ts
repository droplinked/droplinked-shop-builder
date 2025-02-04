import { ITransactionType } from "lib/apis/credit/interfaces"

export interface MenuItem {
    label: string
    value: string
}

export interface MultiSelectMenuProps {
    items: MenuItem[]
    selectedItems: ITransactionType
    onSelect: (selectedItems: ITransactionType) => void
}