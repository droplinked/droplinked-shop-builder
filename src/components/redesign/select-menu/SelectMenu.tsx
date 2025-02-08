import { useMediaQuery } from '@chakra-ui/react'
import React from "react"
import SelectMenuDesktop from './desktop/SelectMenuDesktop'
import SelectMenuMobile from './mobile/SelectMenuMobile'
import { SelectMenuProps } from './types'

export default function SelectMenu({
    items,
    showCheckbox = false,
    multiple = false,
    value = multiple ? [] : null,
    onChange,
    placeholder = "Select",
    mobileModeIcon
}: SelectMenuProps) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    if (isSmallerThan768) {
        return <SelectMenuMobile
            items={items}
            showCheckbox={showCheckbox}
            multiple={multiple}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            mobileModeIcon={mobileModeIcon}
        />
    }

    return (
        <SelectMenuDesktop
            items={items}
            showCheckbox={showCheckbox}
            multiple={multiple}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    )
}
