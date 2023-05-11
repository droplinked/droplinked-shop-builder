import { Box, Flex, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppBadge from 'components/shared/badge/AppBadge'
import { publisherRequestService } from 'lib/apis/affiliate/shopServices'
import AffiliateDetailCard from 'pages/affiliate/parts/detail/affiliateDetailCard'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'

function RequestsList() {
    const { mutate, isLoading, data } = useMutation(() => publisherRequestService())

    useEffect(() => mutate(), [])

    return (
        <VStack align={"stretch"}>
            {data?.data?.data ? data?.data?.data.map((el, key) => (
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
            )) : ""}
        </VStack>
    )
}

export default RequestsList