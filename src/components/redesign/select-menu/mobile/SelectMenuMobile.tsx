import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import Drawer from 'components/common/Drawer/Drawer'
import React from 'react'
import { SelectMenuProps } from '../types'
import { MobileMenuItem } from './MobileMenuItem'
import MobileModeButton from './MobileModeButton'

export default function SelectMenuMobile({
    items,
    showCheckbox = true,
    multiple = false,
    value = multiple ? [] : null,
    onChange,
    placeholder = "Select",
    mobileModeIcon,
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
            onClose()
        }
    }

    return (
        <Box width="100%">
            <MobileModeButton
                mobileModeIcon={mobileModeIcon}
                onOpen={onOpen}
                placeholder={placeholder}
                fullWidth={fullWidth}
            />

            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title={placeholder}
                placement="bottom"
                drawerHeaderStyle={{ padding: 0, px: 4, py: 4, paddingBottom: 4, gap: 4, mb: 0.5 }}
                headingStyle={{ fontSize: 14, fontWeight: 700, color: "#FFF" }}
            >
                <Flex p={4} flexDirection="column" gap={2}>
                    {items.map((item) => (
                        <MobileMenuItem
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
                </Flex>
            </Drawer>
        </Box>
    )
}
