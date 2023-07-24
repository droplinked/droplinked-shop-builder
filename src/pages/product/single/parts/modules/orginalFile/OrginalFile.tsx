import { Box, HStack, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function OrginalFile() {
    const { loading } = useContext(productContext)

    return (
        <VStack align="stretch">
            <AppSkeleton isLoaded={loading}>
                <FieldLabel label='Original file Url' isRequired loading={loading} />
            </AppSkeleton>
            <AppSkeleton isLoaded={loading}>
                <HStack backgroundColor="#141414" padding="2px" borderRadius="8px">
                    <Box backgroundColor="#292929" padding="15px 20px" borderRadius="8px 0 0 8px"><AppTypography size='14px' color="#C2C2C2">https://</AppTypography></Box>
                    <Box><AppTypography size='14px' color="#808080">www.example.com/original-artwork-123</AppTypography></Box>
                </HStack>
            </AppSkeleton>
            <AppTypography size='14px' color="#808080">Customers will receive this link with your message after completing the purchase.</AppTypography>
        </VStack>
    )
}

export default OrginalFile