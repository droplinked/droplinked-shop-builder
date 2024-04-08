import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function ProductTileEmptyBox() {
    return (
        <Flex justifyContent="center" align="center" gap={1}>
            <AppIcons.InfoIcon />
            <AppTypography color="#C2C2C2">You don’t have any product tile.</AppTypography>
        </Flex>
    )
}

export default ProductTileEmptyBox