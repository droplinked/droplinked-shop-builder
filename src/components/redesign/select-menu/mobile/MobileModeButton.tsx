import { Flex } from '@chakra-ui/react'
import React from 'react'
import { styles } from '../styles'
import AppTypography from 'components/common/typography/AppTypography'
import AppIcons from 'assets/icon/Appicons'

export default function MobileModeButton({ mobileModeIcon, onOpen, placeholder }) {
    return (
        <Flex
            {...styles.menuButton}
            onClick={onOpen}
            justifyContent="space-between"
            alignItems="center"
            cursor="pointer"
            {...mobileModeIcon && { padding: "10px" }}
        >
            {
                mobileModeIcon ?
                    mobileModeIcon
                    : <>
                        <AppTypography color="#7b7b7b" fontSize={14} fontWeight={400}>
                            {placeholder}
                        </AppTypography>
                        <AppIcons.SelectChevronDown />
                    </>
            }
        </Flex>
    )
}
