import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppCard from 'components/common/card/AppCard'
import AppTypography from 'components/common/typography/AppTypography'
import { IrecordedShopService } from 'lib/apis/shop/interfaces'
import { recordedShopService } from 'lib/apis/shop/shopServices'
import React, { useEffect } from 'react'
import { useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import AffiliateProduct from '../parts/product/AffiliateProduct'
import SocialAffliate from '../parts/social/SocialAffliate'
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
                            <Box><Image src={shop?.logo} width="80px" height={"80px"} borderRadius={"100%"} /></Box>
                            <Box><AppTypography color="#2EC99E" size='24px' weight='bolder'>{shop?.name}</AppTypography></Box>
                            {/* <Box><Text color="#FFF" fontSize={"1xl"}>{faker.company.catchPhrase()}</Text></Box> */}
                            <SocialAffliate social={{
                                facebook: shop?.facebookURL,
                                instagram: shop?.instagramURL,
                                tiktok: shop?.tiktokURL,
                                discord: shop?.discordURL,
                                linkedin: shop?.linkedinURL,
                                twitter: shop?.twitterURL,
                                web: shop?.webURL,
                            }} size={16} />
                        </VStack>
                    </AppCard>

                    <AppCard>
                        <VStack paddingBottom={10} spacing={16} align={"stretch"}>
                            <Box><ShopsFilter /></Box>
                            <Flex flexWrap={"wrap"} gap="2%" rowGap={7}>
                                {shop?.products && shop.products.map((el: any, key: number) => (
                                    <Box key={key} width={["23.5%", "15%"]}>
                                        <AffiliateProduct blockchain={el.skuIDs.length ? el.skuIDs[0].recordData.recordNetwork : ""} link={`${shop?.name}/${el?._id}`} image={el.media && el.media[0].url} title={el?.title} />
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