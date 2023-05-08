import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react'
import AppCard from 'components/shared/card/AppCard'
import { IrecordedShopService } from 'lib/apis/shop/interfaces'
import { recordedShopService } from 'lib/apis/shop/shopServices'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import AffiliateProduct from '../parts/product/AffiliateProduct'
import ShopsFilter from '../shops/parts/filter/ShopsFilter'
import SingleShopSkeleton from './parts/skeleton/SingleShopSkeleton'

function Shop() {
    const { mutate, data, isLoading } = useMutation((params: IrecordedShopService) => recordedShopService(params))
    const params = useParams()
    const shop = data?.data?.data ? data?.data?.data[0] : null

    useEffect(() => {
        mutate({ shopName: params.shopName })
    }, [params.shopName])

    return (
        <>
            {isLoading ? <SingleShopSkeleton /> : shop ? (
                <VStack align={"stretch"}>
                    <AppCard>
                        <VStack spacing={4}>
                            <Box><Image src={shop?.logo} width="100px" height={"100px"} borderRadius={"100%"} /></Box>
                            <Box><Text fontFamily={"aven"} color="#2EC99E" fontSize={"2xl"}>{shop?.name}</Text></Box>
                            {/* <Box><Text color="#FFF" fontSize={"1xl"}>{faker.company.catchPhrase()}</Text></Box> */}
                        </VStack>
                    </AppCard>

                    <AppCard>
                        <VStack paddingBottom={10} spacing={16} align={"stretch"}>
                            <Box><ShopsFilter /></Box>
                            <Flex flexWrap={"wrap"} gap="2%" rowGap={7}>
                                {shop?.products && shop.products.map((el: any, key: number) => (
                                    <Box width={["23.5%", "15%"]}>
                                        <AffiliateProduct link={`${shop?.name}/${el?._id}`} image={el.media && el.media[0].url} title={el?.title} />
                                    </Box>
                                ))}
                            </Flex>
                        </VStack>
                    </AppCard>
                </VStack>
            ) : "Empty"}
        </>
    )
}

export default Shop