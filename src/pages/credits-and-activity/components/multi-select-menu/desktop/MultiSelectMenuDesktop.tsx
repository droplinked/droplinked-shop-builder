import { Flex, Menu, MenuButton, MenuList, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from "react"
import { styles } from '../styles'
import { DesktopMenuItem } from './DesktopMenuItem'

interface Props {
    items: {
        label: string
        value: string
    }[]
}

export default function MultiSelectMenuDesktop({ items }: Props) {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <Menu isOpen={isOpen} onClose={onClose}>
            <MenuButton onClick={onOpen} ml={"auto"}>
                <Flex {...styles.menuButton} justifyContent="space-between" alignItems="center" cursor="pointer">
                    <AppTypography color="text.subtext.placeholder.dark" fontSize={14} fontWeight={400}>
                        Type
                    </AppTypography>
                    <AppIcons.SelectChevronDown />
                </Flex>
            </MenuButton>
            <MenuList {...styles.menuList} display="flex" flexDirection="column">
                {items.map(({ label, value }) => {
                    return (
                        <DesktopMenuItem
                            key={value}
                            label={label}
                            value={value}
                        />
                    )
                })}
            </MenuList>
        </Menu>
    )
}
