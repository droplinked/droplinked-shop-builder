import { useMediaQuery } from '@chakra-ui/react'
import React from "react"
import MultiSelectMenuDesktop from './desktop/MultiSelectMenuDesktop'
import MultiSelectMenuMobile from './mobile/MultiSelectMenuMobile'

interface FilterItem {
    label: string
    value: string
}

export default function MultiSelectMenu({ filterItems }: { filterItems: FilterItem[] }) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    if (isSmallerThan768) {
        return <MultiSelectMenuMobile items={filterItems} />
    }

    return (
        <MultiSelectMenuDesktop items={filterItems} />
    )
}
