import { Checkbox, Flex, MenuItem } from "@chakra-ui/react"
import AppTypography from "components/common/typography/AppTypography"
import useCreditStore from "pages/credits-and-activity/stores/CreditStore"
import React from "react"
import { styles } from "../styles"

export function DesktopMenuItem({ label, value }) {
    const { selectedFilter } = useCreditStore()
    const isSelected = value === selectedFilter
    const updateCreditState = useCreditStore(state => state.updateCreditState)

    const handleSelectItem = () => {
        updateCreditState('selectedFilter', isSelected ? null : value)
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
