import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import Pagination from 'components/common/datagrid/parts/pagination/Pagination'
import AppEmptyPage from 'components/common/empty/AppEmptyPage'
import AppImage from 'components/common/image/AppImage'
import AppTypography from 'components/common/typography/AppTypography'
import { IproducerRequestService } from 'lib/apis/affiliate/interfaces'
import { producerRequestService } from 'lib/apis/affiliate/shopServices'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useMutation } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import NotificationsButtons from './parts/buttons/NotificationsButtons'
import NotificationsSkeleton from './parts/skeleton/NotificationsSkeleton'
import IconBlockchain from 'components/common/iconBlockchain/IconBlockchain';
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import requestsModel from 'pages/affiliate/requests/parts/list/model'

function NotificationsList() {
    const [searchParams] = useSearchParams()
    const { mutate, isLoading, data } = useMutation((params: IproducerRequestService) => producerRequestService(params))
    const list = data?.data?.data
    const page = useMemo(() => searchParams.get("page"), [searchParams]) || 1
    const { getVariant } = requestsModel

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
                        const variant = getVariant(sku)

                        return (
                            <VStack key={key} align="stretch" backgroundColor="#141414" spacing="22px" borderRadius="8px" padding="20px">
                                <Flex alignItems="center" gap="4px">
                                    <AppTypography fontSize="12px" paddingRight="10px" color="#808080">From:</AppTypography>
                                    <Image src={element.logo} width="14px" height="14px" borderRadius="100%" />
                                    <AppTypography fontSize="12px" color="#2BCFA1">{element.name}</AppTypography>
                                </Flex>
                                <Flex paddingLeft="44px" gap={3} justifyContent="space-between" >
                                    <Box>
                                        <VStack align="stretch" spacing="12px">
                                            <Flex justifyContent="space-between" gap="12px">
                                                <AppImage src={product?.media.find(el => el.isMain === 'true')?.thumbnail} width="44px" height="44px" borderRadius="8px" />
                                                <VStack align="stretch">
                                                    <Box>
                                                        <Flex alignItems="center" gap="10px">
                                                            {product?.title && (
                                                                <>
                                                                    <AppTypography fontSize="14px">{product?.title}</AppTypography>
                                                                    <AppTypography fontSize="14px">-</AppTypography>
                                                                </>
                                                            )}
                                                            <Flex alignItems="center" gap="6px">
                                                                {variant?.color && <Box width="12px" height="12px" borderRadius="100%" backgroundColor={variant?.color.value}></Box>}
                                                                {variant?.size && <AppTypography fontSize="12px">{variant?.size.caption}</AppTypography>}
                                                            </Flex>
                                                        </Flex>
                                                    </Box>
                                                    <Flex gap="32px" color="#808080">
                                                        <AppTypography fontSize="12px">Requested Quantity: {el?.quantity || "---"}</AppTypography>
                                                        <AppTypography fontSize="12px">Price: {`${sku?.price} ${product?.priceUnit || ""}`}</AppTypography>
                                                        <AppTypography fontSize="12px">Commission: {sku?.recordData?.commision + '%'}</AppTypography>
                                                    </Flex>
                                                </VStack>
                                            </Flex>
                                            <Flex alignItems="center" gap="8px" color="#808080">
                                                <IconBlockchain blockchain={el?.network} props={{ width: "12px", height: "12px" }} />
                                                <AppTypography position="relative" top="2px" fontSize="10px" display="flex">
                                                    Dropped on <AppTypography padding="0 3px" fontSize="10px" fontWeight='bold'>{capitalizeFirstLetter(el?.network)}</AppTypography> blockchain
                                                </AppTypography>
                                            </Flex>
                                        </VStack>
                                    </Box>
                                    <Box><NotificationsButtons refetch={() => fetch()} shop={el} /></Box>
                                </Flex>
                            </VStack>
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