export interface IFiltersDataGridItems {
    placeHolder: string
    onClick: (value: any) => void
    filterItems: Array<{
        title: string
        value: string,
    }>
}

export interface IFiltersDataGrid {
    items: Array<IFiltersDataGridItems>
}