import { Box, Flex, VStack } from '@chakra-ui/react'
import Pagination from 'components/common/datagrid/parts/pagination/Pagination'
import AppEmptyPage from 'components/common/empty/AppEmptyPage'
import { IproducerRequestService } from 'lib/apis/affiliate/interfaces'
import { producerRequestService } from 'lib/apis/affiliate/shopServices'
import { appDeveloment } from 'lib/utils/app/variable'
import AffiliateDetailCard from 'pages/affiliate/parts/detail/affiliateDetailCard'
import ShopsProfile from 'pages/affiliate/parts/pofile/ShopsProfile'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import NotificationsButtons from './parts/buttons/NotificationsButtons'
import NotificationsSkeleton from './parts/skeleton/NotificationsSkeleton'

function NotificationsList() {
    const [searchParams] = useSearchParams()
    const { mutate, isLoading, data } = useMutation((params: IproducerRequestService) => producerRequestService(params))
    const list = data?.data?.data
    const page = useMemo(() => searchParams.get("page"), [searchParams]) || 1

    const fetch = useCallback(() => mutate({ page }), [page, searchParams])

    useEffect(() => fetch(), [page])

    return (
        <>
            {isLoading ? <NotificationsSkeleton /> : list?.data.length ? (
                <VStack align={"stretch"}>
                    {list?.data.map((el: any, key: number) => {
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
                                        image={product?.thumb || product?.media.find(el => el.isMain === 'true')?.url}
                                        title={product?.title}
                                        decript={el?.productCollection[0]?.title}
                                        options={[
                                            {
                                                caption: "Quantity",
                                                value: el?.quantity || "---"
                                            },
                                            {
                                                caption: "Commision",
                                                value: sku?.recordData?.commision + '%'
                                            },
                                        ]}
                                        price={`${sku?.price} ${product?.priceUnit || ""}`}
                                        earning={el?.producerEarning}
                                    />
                                </Box>
                                <Box width={["15%", "10%"]}><NotificationsButtons refetch={() => fetch()} shop={el} /></Box>
                            </Flex>
                        )
                    })}
                    <Pagination current={list?.currentPage} lastPage={list?.totalPages || 1} nextPage={list?.nextPage} prevPage={list?.previousPage} />
                </VStack>
            ) : <AppEmptyPage title="No Notifications Yet!" />
            }
        </>
    )
}

export default NotificationsList