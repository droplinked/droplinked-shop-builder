import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function ModalHeader() {
    return (
        <Flex direction="column" gap={6}>
            <AppTypography fontSize={16} fontWeight={500} color="#fff">Reorder Products</AppTypography>

            <Flex direction="column" gap={3}>
                <AppTypography fontSize={14} color="#fff">
                    Rearrange products by dragging and dropping them to set their display order in your store. You can also select and move multiple items at once.
                </AppTypography>

                <Flex alignItems="center" gap={2}>
                    <AppIcons.InfoIcon />
                    <AppTypography color="#c2c2c2">This sets the default view, but users can sort as they wish.</AppTypography>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ModalHeader