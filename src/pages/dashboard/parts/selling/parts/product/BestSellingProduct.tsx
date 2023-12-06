import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function BestSellingProduct() {
    return (
        <Flex alignItems="center" gap="16px">
            <Image src={faker.image.image()} width="48px" height="48px" borderRadius="4px" />
            <VStack align="stretch">
                <AppTypography fontSize="14px" fontWeight="600">{faker.lorem.sentence(5)}</AppTypography>
                <Flex alignItems="center" gap="6px">
                    <Box backgroundColor="rgba(43, 207, 161, 0.25)" borderRadius="100px" padding="3px 8px"><AppTypography color="#2BCFA1">$123.21</AppTypography></Box>
                    <Box backgroundColor="rgba(156, 78, 255, 0.25)" borderRadius="100px" padding="3px 8px"><AppTypography color="#C59CFF">$23.21</AppTypography></Box>
                </Flex>
            </VStack>
        </Flex>
    )
}

export default BestSellingProduct