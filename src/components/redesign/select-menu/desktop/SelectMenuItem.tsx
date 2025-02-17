import { Checkbox, Flex, MenuItem } from "@chakra-ui/react"
import AppTypography from "components/common/typography/AppTypography"
import React from "react"
import { styles } from "../styles"
import { SelectItem } from "../types"

interface SelectMenuItemProps {
    item: SelectItem
    showCheckbox: boolean
    isSelected: boolean
    onChange: () => void
}

export function SelectMenuItem({ item, showCheckbox, isSelected, onChange }: SelectMenuItemProps) {
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
            onClick={onChange}
            {...styles.menuItem}
            borderRadius={"8px"}
            backgroundColor={isSelected ? "#292929" : "transparent"}
        >
            <Flex gap={3} alignItems="center" width={"100%"}>
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
        </MenuItem>
    )
}
