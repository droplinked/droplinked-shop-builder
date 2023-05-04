import { Box, Flex, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import AffiliateDetailCard from 'pages/affiliate/parts/detail/affiliateDetailCard'
import ShopsProfile from 'pages/affiliate/parts/pofile/ShopsProfile'
import React from 'react'

function NotificationsList() {
    return (
        <VStack align={"stretch"}>
            {[1, 1, 1, 1, 1].map((el, key) => (
                <Flex key={key} gap={3} borderTop="1px solid #262626" padding={"20px 0"}>
                    <Box width={"20%"}>
                        <ShopsProfile
                            avatar={faker.image.avatar()}
                            title={faker.commerce.productName()}
                        />
                    </Box>
                    <Box width={"70%"}>
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
                    <Box width={["15%", "10%"]}>
                        <VStack align={"stretch"}>
                            <Box><BasicButton width="100%" maxWidth="150px">Accept</BasicButton></Box>
                            <Box><BasicButton width="100%" maxWidth="150px" cancelType>Deny</BasicButton></Box>
                        </VStack>
                    </Box>
                </Flex>
            ))}
        </VStack>
    )
}

export default NotificationsList