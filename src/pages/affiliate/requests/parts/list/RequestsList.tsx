import { Box, Flex, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppBadge from 'components/shared/badge/AppBadge'
import AffiliateDetailCard from 'pages/affiliate/parts/detail/affiliateDetailCard'
import React from 'react'

function RequestsList() {
    return (
        <VStack align={"stretch"}>
            {[1, 1, 1, 1, 1].map((el, key) => (
                <Flex key={key} justifyContent={"space-between"} borderTop="1px solid #262626" padding={"20px 0"}>
                    <Box>
                        <AffiliateDetailCard
                            image={faker.image.image()}
                            title={faker.commerce.productName()}
                            decript={faker.company.name()}
                            options={[
                                {
                                    caption: "size",
                                    value: "xl"
                                },
                                {
                                    caption: "Quantity",
                                    value: "40/120"
                                },
                                {
                                    caption: "Commision",
                                    value: "%20"
                                },
                            ]}
                            price="12 ETH"
                            earning='12 ETH'
                        />
                        </Box>
                    <Box><AppBadge text={"accepted"} /></Box>
                </Flex>
            ))}
        </VStack>
    )
}

export default RequestsList