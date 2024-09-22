import { Box, Flex, Link, VStack } from "@chakra-ui/react";
import AppIcons from "assest/icon/Appicons";
import AppImage from "components/common/image/AppImage";
import AppTypography from "components/common/typography/AppTypography";
import { getNewShopsService, getShopCommunityProfile } from "lib/apis/shop/shopServices";
import AffiliateItem, { LAffiliateItem } from "pages/redesign-affiliate/_components/AffiliateItems";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const AffiliateStoresProfile = () => {
    const params = useParams();
    const { data, isLoading: isLoadingStore } = useQuery({ queryKey: ["new-shops", params?.shopId], queryFn: () => getShopCommunityProfile({ shopId: params?.shopId }) });
    const storeProfile = data?.data?.data;
    return (
        <Box display="flex" width="full" flexDirection="column" alignItems="center" gap="24px">
            <Box display="flex" width="full" flexDirection="column" alignItems="center" gap="24px">
                <VStack align={"stretch"} width={"full"}>
                    <AppImage
                        objectFit={"cover"}
                        width="full"
                        height={"360px"}
                        src="https://upload-file-droplinked.s3.amazonaws.com/22b2a2e43dcf9d76c43ad427cd8f72a4a0db5dab76be1e1545140721aba0e018.jpg"
                    />
                    <Box width={"132px"} height={"132px"} padding={"16px"} backgroundColor={"#141414"} rounded={"full"} marginTop={"-66px"} marginLeft={"16px"}>
                        <AppImage src={storeProfile?.logo} rounded={"full"} />
                    </Box>
                </VStack>
                <Box display="flex" padding="0px 36px 0px 24px" justifyContent="space-between" alignItems="flex-start" alignSelf="stretch">
                    <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="24px" fontStyle="normal" fontWeight="600" lineHeight="36px">
                        {storeProfile?.name}
                    </AppTypography>
                    <Flex gap={"12px"} alignItems={"center"}>
                        {storeProfile?.tiktokURL && storeProfile?.tiktokURL !== "" && (
                            <Link href={storeProfile?.tiktokURL}>
                                <AppIcons.TikTok />
                            </Link>
                        )}
                        {storeProfile?.instagramURL && storeProfile?.instagramURL !== "" && (
                            <Link href={storeProfile?.instagramURL}>
                                <AppIcons.InstagramIcon />
                            </Link>
                        )}
                        {storeProfile?.twitterURL && storeProfile?.twitterURL !== "" && (
                            <Link href={storeProfile?.twitterURL}>
                                <AppIcons.TwitterIcon />
                            </Link>
                        )}
                    </Flex>
                </Box>
            </Box>
            <Flex flexWrap={"wrap"} width={"full"} flexDir={"row"} justifyContent={"flex-start"} alignItems={"flex-start"} gap={"16px"}>
                {!isLoadingStore ? (
                    storeProfile?.products?.map((product: any) => (
                        <AffiliateItem
                            key={product.slug}
                            slug={product.slug}
                            name={product.title}
                            price={product.skus?.[0]?.price}
                            commission={product.commission}
                            image={product.media?.find((urls) => urls?.isMain)?.thumbnail || product.media?.[0]?.thumbnail || product.media?.[0]?.url}
                            ownerName={product.ownerShops?.name}
                            logo={product.ownerShops?.logo}
                        />
                    ))
                ) : (
                    <Flex flexWrap={"wrap"} flexDir={"row"} justifyContent={"space-between"} marginTop={"24px"} alignItems={"flex-start"} gap={"16px"}>
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <LAffiliateItem key={index} />
                            ))}
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default AffiliateStoresProfile;
