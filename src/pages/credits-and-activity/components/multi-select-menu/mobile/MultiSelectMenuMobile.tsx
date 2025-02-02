import { Box, Checkbox, Flex, useDisclosure } from '@chakra-ui/react'
import Drawer from 'components/common/Drawer/Drawer'
import React from 'react'
import { styles } from '../styles'
import AppTypography from 'components/common/typography/AppTypography'
import AppIcons from 'assest/icon/Appicons'
import { MultiSelectMenuProps } from '../types'

function MobileMenuItem({ label, value, isSelected, onSelect }) {
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
        <Flex
            key={value}
            onClick={handleSelectItem}
            {...styles.menuItem}
            py={"10px"}
            gap={2}
            justifyContent="start"
            alignItems="center"
        >
            <Checkbox
                isChecked={isSelected}
                {...getCheckboxStyles(isSelected)}
            />
            <AppTypography color="#FFF" fontSize={14} fontWeight={400}>
                {label}
            </AppTypography>
        </Flex>
    )
}

export default function MultiSelectMenuMobile({ items, selectedItems, onSelect }: MultiSelectMenuProps) {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <Box width={"100%"}>
            <Flex {...styles.menuButton} onClick={onOpen} justifyContent="space-between" alignItems="center" cursor="pointer">
                <AppTypography color="#7b7b7b" fontSize={14} fontWeight={400}>
                    Type
                </AppTypography>
                <AppIcons.SelectChevronDown />
            </Flex>

            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                title="Type"
                placement="bottom"
                drawerHeaderStyle={{ padding: 0, px: 4, py: 4, paddingBottom: 4, gap: 4, mb: 0.5 }}
                headingStyle={{ fontSize: 14, fontWeight: 700, color: "#FFF" }}
            >
                <Flex p={4} flexDirection={"column"} gap={2}>
                    {items.map(({ label, value }) => {
                        const isSelected = selectedItems.includes(value);
                        return (
                            <MobileMenuItem
                                key={value}
                                label={label}
                                value={value}
                                isSelected={isSelected}
                                onSelect={onSelect}
                            />
                        )
                    })}
                </Flex>
            </Drawer>
        </Box>
    )
}
