import { HStack } from '@chakra-ui/react'
import Select from 'components/redesign/select/AppSelect'
import React from 'react'

export interface IFiltersDataGridItems {
    placeHolder: string
    onClick: (value: any) => void
    filterItems: Array<{
        title: string
        value: string,
    }>
}

export interface IFiltersDatagrid {
    items: Array<IFiltersDataGridItems>
}

function FiltersDataGrid({ items }: IFiltersDatagrid) {
    return (
        <HStack spacing={8} alignItems="center">
            {items.map((item: IFiltersDataGridItems, key) => (
                <Select
                    key={key}
                    items={item.filterItems}
                    labelAccessor='title'
                    valueAccessor='value'
                    selectProps={{
                        width: "200px",
                        bgColor: "#1C1C1C",
                        placeholder: item.placeHolder,
                        onChange: (e) => item.onClick(e.target.value)
                    }}
                />
            ))}
        </HStack>
    )
}

export default FiltersDataGrid