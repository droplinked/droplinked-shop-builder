import { Checkbox, Flex } from "@chakra-ui/react"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"
import { styles } from "../styles"
import { SelectItem } from "../types"

interface MobileMenuItemProps {
    item: SelectItem
    showCheckbox: boolean
    isSelected: boolean
    onChange: () => void
}

export function MobileMenuItem({
    item,
    showCheckbox,
    isSelected,
    onChange
}: MobileMenuItemProps) {
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
            onClick={onChange}
            {...styles.menuItem}
            py="10px"
            gap={2}
            justifyContent="start"
            alignItems="center"
            borderRadius={"8px"}
            backgroundColor={isSelected ? "#292929" : "transparent"}
        >
            {showCheckbox && (
                <Checkbox
                    isChecked={isSelected}
                    {...getCheckboxStyles(isSelected)}
                />
            )}
            <Flex justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
                <AppTypography
                    color={"#FFF"}
                    fontSize={14}
                    fontWeight={400}
                >
                    {item.label}
                </AppTypography>

                {item.labelDescription && (
                    <AppTypography
                        color={"#7B7B7B"}
                        fontSize={12}
                        fontWeight={400}
                    >
                        {item.labelDescription}
                    </AppTypography>
                )}
            </Flex>
        </Flex>
    )
}
