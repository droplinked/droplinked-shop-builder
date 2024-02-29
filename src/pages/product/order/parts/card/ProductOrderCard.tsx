import { Box, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

interface IProps {
    title: any
    children: any
}
function ProductOrderCard({ children, title }: IProps) {
    return (
        <AppCard boxProps={{ padding: "50px 60px" }}>
            <VStack align="stretch" spacing="30px">
                <AppTypography fontSize="16px" color="#C2C2C2">{title}</AppTypography>
                <Box>{children}</Box>
            </VStack>
        </AppCard>
    )
}

export default ProductOrderCard