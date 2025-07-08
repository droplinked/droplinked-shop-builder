import { Flex, Menu, MenuButton, MenuList, useDisclosure } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from "react"
import { styles } from '../styles'
import { SelectMenuItem } from './SelectMenuItem'
import { SelectMenuProps } from '../types'

export default function SelectMenuDesktop({
    items,
    showCheckbox,
    multiple,
    value,
    onChange,
    placeholder,
    fullWidth
}: SelectMenuProps) {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const handleChange = (itemValue: string) => {
        if (!onChange) return

        if (multiple) {
            const currentValues = Array.isArray(value) ? value : []
            const newValue = currentValues.includes(itemValue)
                ? currentValues.filter(v => v !== itemValue)
                : [...currentValues, itemValue]
            onChange(newValue.length ? newValue : null)
        } else {
            onChange(value === itemValue ? null : itemValue)
        }
    }

    return (
        <Menu isOpen={isOpen} onClose={onClose}>
            <MenuButton onClick={onOpen}>
                <Flex {...styles.menuButton} justifyContent="space-between" alignItems="center" cursor="pointer" {...fullWidth && { width: "100%" }}>
                    <AppTypography color="#fff" fontSize={14} fontWeight={400}>
                        {placeholder}
                    </AppTypography>
                    <AppIcons.SelectChevronDown />
                </Flex>
            </MenuButton>
            <MenuList {...styles.menuList} display="flex" flexDirection="column">
                {items.map((item) => (
                    <SelectMenuItem
                        key={item.value}
                        item={item}
                        showCheckbox={showCheckbox}
                        isSelected={multiple
                            ? Array.isArray(value) && value.includes(item.value)
                            : value === item.value
                        }
                        onChange={() => handleChange(item.value)}
                    />
                ))}
            </MenuList>
        </Menu>
    )
}
