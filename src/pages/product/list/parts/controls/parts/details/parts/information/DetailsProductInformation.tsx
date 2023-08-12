import { Box, Flex, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function DetailsProductInformation() {
    const data = [
        {
            caption: 'Sold Items',
            value: <AppTypography size='14px' weight='bolder'>---</AppTypography>
        },
        {
            caption: 'Earnings',
            value: <AppTypography size='14px' weight='bolder'>---</AppTypography>
        }
    ]

    return (
        <VStack align="stretch" spacing="15px">
            {data.map((el, key) => (
                <Flex key={key}>
                    <Box width="25%"><AppTypography size='14px'>{el.caption}</AppTypography></Box>
                    <Box>{el.value}</Box>
                </Flex>
            ))}
        </VStack>
    )
}

export default DetailsProductInformation