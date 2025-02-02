
export interface MenuItem {
    label: string
    value: string
}

export interface MultiSelectMenuProps {
    items: MenuItem[]
    selectedItems: string[]
    onSelect: (selectedItems: string[]) => void
}