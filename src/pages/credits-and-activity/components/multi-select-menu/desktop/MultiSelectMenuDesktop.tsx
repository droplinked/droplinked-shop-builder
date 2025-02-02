import { Checkbox, Flex, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from "react"
import { styles } from '../styles'
import { MultiSelectMenuProps } from '../types'

function DesktopMenuItem({ label, value, isSelected, onSelect }) {
    const handleSelectItem = () => {
        onSelect(value)
    }

    const getCheckboxStyles = (isSelected: boolean) => ({
        ...styles.checkbox,
        __css: {
            span: {
                borderRadius: "6px",
                display: "flex",
                ...(isSelected && {
                    background: "#2BCFA1 !important",
                    borderColor: "#2BCFA1 !important"
                })
            }
        }
    })

    return (
        <MenuItem
            key={value}
            onClick={handleSelectItem}
            {...styles.menuItem}
        >
            <Flex gap={3} alignItems="center">
                <Checkbox
                    isChecked={isSelected}
                    {...getCheckboxStyles(isSelected)}
                />
                <AppTypography color="#FFF" fontSize={16} fontWeight={400}>
                    {label}
                </AppTypography>
            </Flex>
        </MenuItem>
    )
}

export default function MultiSelectMenuDesktop({ items, selectedItems, onSelect }: MultiSelectMenuProps) {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <Menu isOpen={isOpen} onClose={onClose} closeOnSelect={false}>
            <MenuButton onClick={onOpen}>
                <Flex {...styles.menuButton} justifyContent="space-between" alignItems="center" cursor="pointer">
                    <AppTypography color="#7b7b7b" fontSize={14} fontWeight={400}>
                        Type
                    </AppTypography>
                    <AppIcons.SelectChevronDown />
                </Flex>
            </MenuButton>
            <MenuList {...styles.menuList} display="flex" flexDirection="column">
                {items.map(({ label, value }) => {
                    const isSelected = selectedItems.includes(value);
                    return (
                        <DesktopMenuItem
                            key={value}
                            label={label}
                            value={value}
                            isSelected={isSelected}
                            onSelect={onSelect}
                        />
                    );
                })}
            </MenuList>
        </Menu >
    )
}
