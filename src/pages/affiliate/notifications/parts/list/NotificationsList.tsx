import { Box, Flex, VStack } from '@chakra-ui/react'
import AppEmptyPage from 'components/common/empty/AppEmptyPage'
import { producerRequestService } from 'lib/apis/affiliate/shopServices'
import { appDeveloment } from 'lib/utils/app/variable'
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
            {isLoading ? <NotificationsSkeleton /> : data?.data?.data.length ? (
                <VStack align={"stretch"}>
                    {data?.data?.data.map((el: any, key: number) => {
                        const element = el?.publisherShop[0]
                        const product = el?.product[0]
                        const sku = el?.sku[0]

                        return (
                            <Flex key={key} gap={3} borderTop="1px solid #262626" padding={"20px 0"} >
                                <Box width={"20%"}>
                                    <ShopsProfile
                                        shopname=''
                                        link={`https://${appDeveloment ? 'dev' : ''}.droplinked.io/${element.name}`}
                                        avatar={element.logo}
                                        title={element.name}
                                        social={{
                                            facebook: element?.facebookURL,
                                            instagram: element?.instagramURL,
                                            tiktok: element?.tiktokURL,
                                            discord: element?.discordURL,
                                            linkedin: element?.linkedinURL,
                                            twitter: element?.twitterURL,
                                            web: element?.webURL,
                                        }}
                                    />
                                </Box>
                                <Box width={"70%"}>
                                    <AffiliateDetailCard
                                        image={product?.media && product?.media[0].url}
                                        title={product?.title}
                                        decript={el?.productCollection[0]?.title}
                                        options={[
                                            {
                                                caption: "Quantity",
                                                value: sku?.quantity
                                            },
                                            {
                                                caption: "Commision",
                                                value: sku?.recordData?.commision
                                            },
                                        ]}
                                        price={`${sku?.price} ${product?.priceUnit || ""}`}
                                        earning={`${el?.earning} ${sku?.recordData?.currency}`}
                                    />
                                </Box>
                                <Box width={["15%", "10%"]}><NotificationsButtons refetch={() => mutate()} shop={el} /></Box>
                            </Flex>
                        )
                    })}
                </VStack>
            ) : <AppEmptyPage title="No Notifications Yet!" />
            }
        </>
    )
}

export default NotificationsList