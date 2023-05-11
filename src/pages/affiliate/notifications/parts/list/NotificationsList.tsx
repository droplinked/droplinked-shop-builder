import { Box, Flex, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import { producerRequestService } from 'lib/apis/affiliate/shopServices'
import AffiliateDetailCard from 'pages/affiliate/parts/detail/affiliateDetailCard'
import ShopsProfile from 'pages/affiliate/parts/pofile/ShopsProfile'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import NotificationsButtons from './parts/buttons/NotificationsButtons'
import NotificationsSkeleton from './parts/skeleton/NotificationsSkeleton'

function NotificationsList() {
    const { mutate, isLoading, data } = useMutation(() => producerRequestService())

    useEffect(() => mutate(), [])

    return (
        <>
            {isLoading ? <NotificationsSkeleton /> : (
                <VStack align={"stretch"}>
                    {data?.data?.data && data?.data?.data.map((el, key) => {
                        const element = el?.publisherShop[0]
                        const product = el?.product[0]
                        const sku = el?.sku[0]

                        return (
                            <Flex key={key} gap={3} borderTop="1px solid #262626" padding={"20px 0"} >
                                <Box width={"20%"}>
                                    <ShopsProfile
                                        shopname=''
                                        avatar={element.logo}
                                        title={element.name}
                                        social={{
                                            facebook: "",
                                            instagram: element.instagramURL,
                                            pintrest: "",
                                            snapchat: "",
                                            twitter: element.twitterURL,
                                        }}
                                    />
                                </Box>
                                <Box width={"70%"}>
                                    <AffiliateDetailCard
                                        image={product?.media && product.media[0].url}
                                        title={product?.title}
                                        decript={faker.company.name()}
                                        options={[
                                            {
                                                caption: "Quantity",
                                                value: sku.quantity
                                            },
                                            {
                                                caption: "Commision",
                                                value: sku?.recordData?.commision
                                            },
                                        ]}
                                        price={`${sku.price} ${product.priceUnit}`}
                                        earning='12 ETH'
                                    />
                                </Box>
                                <Box width={["15%", "10%"]}><NotificationsButtons refetch={() => mutate()} shop={el} /></Box>
                            </Flex>
                        )
                    })}
                </VStack>
            )
            }
        </>
    )
}

export default NotificationsList