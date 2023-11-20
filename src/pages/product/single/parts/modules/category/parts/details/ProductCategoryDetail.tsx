import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function ProductCategoryDetail() {
    return (
        <Flex alignItems="center" gap="15px">
            <Box>
                <Image src={faker.image.abstract()} width="40px" />
            </Box>
            <VStack align="stretch">
                <AppTypography fontSize='14px'>{faker.commerce.productName()}</AppTypography>
                <AppTypography fontSize='14px'>{faker.commerce.price()}</AppTypography>
            </VStack>
        </Flex>
    )
}

export default ProductCategoryDetail