import { Checkbox, Flex } from "@chakra-ui/react"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"
import { styles } from "../styles"
import useCreditStore from "pages/credits-and-activity/stores/CreditStore"

export function MobileMenuItem({ label, value }) {
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
        <Flex
            key={value}
            onClick={handleSelectItem}
            {...styles.menuItem}
            py="10px"
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