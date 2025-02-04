import { Checkbox, Flex, MenuItem } from "@chakra-ui/react"
import { styles } from "../styles"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"

export function DesktopMenuItem({ label, value, isSelected, onSelect }) {
    const handleSelectItem = () => {
        if (isSelected) {
            onSelect(null)
        } else {
            onSelect(value)
        }
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
