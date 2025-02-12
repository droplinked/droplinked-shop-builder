export interface SelectItem {
    label: string
    labelDescription?: string
    value: string
}

export interface SelectMenuProps {
    items: SelectItem[]
    showCheckbox?: boolean
    multiple?: boolean
    value?: string | string[] | null
    onChange?: (value: string | string[] | null) => void
    placeholder?: string
    mobileModeIcon?: React.ReactNode
    showSelectedAsPlaceholder?: boolean
}
