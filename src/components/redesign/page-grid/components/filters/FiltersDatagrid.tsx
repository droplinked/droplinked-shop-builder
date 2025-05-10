import { HStack } from '@chakra-ui/react'
import AppSelect from 'components/redesign/select/AppSelect'
import React from 'react'
import { IFiltersDataGrid, IFiltersDataGridItems } from './interface'

function FiltersDataGrid({ items }: IFiltersDataGrid) {
    return (
        <HStack spacing={8} alignItems="center">
            {items.map((item: IFiltersDataGridItems, key) => (
                <AppSelect
                    key={key}
                    items={item.filterItems}
                    labelAccessor='title'
                    valueAccessor='value'
                    selectProps={{
                        width: "200px",
                        bgColor: "neutral.gray.1000",
                        placeholder: item.placeHolder,
                        onChange: (e) => item.onClick(e.target.value)
                    }}
                />
            ))}
        </HStack>
    )
}

export default FiltersDataGrid