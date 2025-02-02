import { useMediaQuery } from '@chakra-ui/react'
import React from "react"
import MultiSelectMenuDesktop from './desktop/MultiSelectMenuDesktop'
import MultiSelectMenuMobile from './mobile/MultiSelectMenuMobile'
import { MultiSelectMenuProps } from './types'

export default function MultiSelectMenu(props: MultiSelectMenuProps) {
    const [isSmallerThan768] = useMediaQuery("(max-width: 768px)")

    if (isSmallerThan768) {
        return <MultiSelectMenuMobile {...props} />
    }

    return (
        <MultiSelectMenuDesktop {...props} />
    )
}
