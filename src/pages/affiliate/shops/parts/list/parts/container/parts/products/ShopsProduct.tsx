import { Box, Flex, HStack, Stack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AffiliateProduct from 'pages/affiliate/parts/product/AffiliateProduct'
import React from 'react'

function ShopsProduct() {
    return (
        <Flex gap={5} height="100%">
            {[1, 1, 1, 1].map((el, key) => (
                <Box key={key} width="25%">
                    <AffiliateProduct image={faker.image.image()} title={faker.commerce.productName()} />
                </Box>
            ))}
        </Flex>
    )
}

export default ShopsProduct