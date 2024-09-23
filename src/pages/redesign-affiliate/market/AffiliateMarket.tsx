import { Box, Flex, SimpleGrid, VStack } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React, { useState } from "react";
import AffiliateItem, { LAffiliateItem } from "../_components/AffiliateItems";
import { useQuery } from "react-query";
import { getNewShopsService } from "lib/apis/shop/shopServices";
import { getHotProducts, getNewProducts } from "lib/apis/product/productServices";
import AppImage from "components/common/image/AppImage";
import { Link } from "react-router-dom";

const dates_constant = [
    { label: "Today", value: "today" },
    { label: "This week", value: "week" },
    { label: "This month", value: "month" },
];

const SectionHeader = ({ title, linkText, linkTo }) => (
    <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
        <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">{title}</AppTypography>
        <Link to={linkTo}><AppTypography color="#179EF8" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="500" lineHeight="24px" textDecorationLine="underline">{linkText}</AppTypography></Link>
    </Box>
);

const ProductGrid = ({ isLoading, products }) => (
    <SimpleGrid columns={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4, "2xl": 4 }} spacing={"24px"} width="full">
        {isLoading 
            ? Array(4).fill(0).map((_, index) => (<Box key={`skeleton-${index}`} display={{ base: index < 1 ? "block" : "none", sm: index < 1 ? "block" : "none", md: index < 2 ? "block" : "none", lg: index < 3 ? "block" : "none", xl: index < 4 ? "block" : "none", "2xl": index < 4 ? "block" : "none" }}><LAffiliateItem /></Box>))
            : products?.map((product, index) => (<Box key={product.slug} display={{ base: index < 1 ? "block" : "none", sm: index < 1 ? "block" : "none", md: index < 2 ? "block" : "none", lg: index < 3 ? "block" : "none", xl: index < 4 ? "block" : "none", "2xl": index < 4 ? "block" : "none" }}><AffiliateItem slug={product.slug} name={product.title} price={product.skus?.[0]?.price} commission={product.commission} image={product.media?.find((urls) => urls?.isMain)?.thumbnail || product.media?.[0]?.thumbnail || product.media?.[0]?.url} ownerName={product?.ownerShops?.name} logo={product.ownerShops?.logo}/></Box> ))}
    </SimpleGrid>
);

const AffiliateMarket = () => {
    const [date, setDate] = useState({ label: "Today", value: "today" });
    const { data: newShops, isLoading: isLoadingNewShops } = useQuery({ queryKey: ["new-shops-service"], queryFn: getNewShopsService });
    const { data: newProducts, isLoading: isLoadingNewProducts } = useQuery({ queryKey: ["new-products"], queryFn: getNewProducts });
    const { data: hotProducts, isLoading: isLoadingHotProducts } = useQuery({ queryKey: ["hot-products"], queryFn: getHotProducts });

    return (
        <VStack spacing={"36px"}>
            <VStack alignItems="center" width="full" justifyContent="center" height="360px" background="radial-gradient(305.12% 110.25% at 13.65% 81.01%, #182522 1.56%, rgba(48, 48, 48, 0.08) 23.53%, rgba(46, 73, 63, 0.42) 44.64%, #171717 79.55%, #000 100%), linear-gradient(rgba(255, 255, 255, 0.16) .1em, transparent .1em), linear-gradient(90deg, rgba(255, 255, 255, 0.16) .1em, transparent .1em), #060606" backgroundPosition="center, 0 0, 0 0" backgroundSize="cover, 3em 3em, 3em 3em" backgroundRepeat="no-repeat, repeat, repeat" borderRadius="8px" border="1.5px solid #292929">
                <VStack display="inline-flex" flexDirection="column" alignItems="center" spacing="16px">
                    <AppTypography color="#FFF" textAlign="center" fontFamily="Poppins" fontSize="32px" fontStyle="normal" fontWeight="400" lineHeight="48px">Unlock Savings</AppTypography>
                    <AppTypography color="#FFF" textAlign="center" fontFamily="Poppins" fontSize="48px" fontStyle="normal" fontWeight="700" lineHeight="64px">Explore Top Affiliate Picks!</AppTypography>
                </VStack>
            </VStack>
            <VStack width="full" flexDirection="column" alignItems="flex-start" spacing="48px">
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                    <SectionHeader title="New Products" linkText="See all" linkTo="/dashboard/affiliate/products" />
                    <ProductGrid isLoading={isLoadingNewProducts} products={newProducts?.data?.data} />
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                    <SectionHeader title="New Merchants" linkText="See all" linkTo="/dashboard/affiliate/stores" />
                    <SimpleGrid columns={{ base: 3, sm: 3, md: 3, lg: 4, xl: 5, "2xl": 5 }} spacing={"24px"} width="full">
                        {isLoadingNewShops
                            ? Array(4).fill(0).map((_, index) => (<Box key={`skeleton-${index}`} display={{ base: index < 3 ? "flex" : "none", sm: index < 3 ? "flex" : "none", md: index < 3 ? "flex" : "none", lg: index < 4 ? "flex" : "none", xl: index < 5 ? "flex" : "none", "2xl": index < 5 ? "flex" : "none" }} alignItems="center" gap="16px" flex="1 0 0" borderRadius="8px"><LAffiliateItem /></Box>))
                            : newShops?.data?.data?.map((shop, index) => (
                                  <Box key={shop._id} display={{ base: index < 3 ? "block" : "none", sm: index < 3 ? "block" : "none", md: index < 3 ? "block" : "none", lg: index < 4 ? "block" : "none", xl: index < 5 ? "block" : "none", "2xl": index < 5 ? "block" : "none" }}>
                                      <Link to={`/dashboard/affiliate/stores/${shop?._id}`} style={{ display: "flex", flex: "1 0 0", alignItems: "center", cursor: "pointer", gap: "16px", borderRadius: "8px" }}>
                                          <AppImage rounded="full" width={"56px"} height={"56px"} src={shop?.logo} />
                                          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                                              <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="700" lineHeight="24px">{shop?.name}</AppTypography>
                                              <AppTypography color="#F5F7FA99" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">Merchant</AppTypography>
                                          </Box>
                                      </Link>
                                  </Box>
                              ))}
                    </SimpleGrid>
                </Box>
                {(isLoadingHotProducts || hotProducts?.data?.data?.length) && (
                    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                        <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
                            <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">Hot Products</AppTypography>
                            <Flex gap={"12px"}>
                                {dates_constant?.map((date_constant) => (
                                    <Box key={date_constant?.value} cursor="pointer" onClick={() => setDate({ label: date_constant?.label, value: date_constant?.value })} backgroundColor={date_constant?.value === date?.value ? "#2BCFA1" : "#292929"} display="flex" padding="6px 16px" justifyContent="center" alignItems="center" gap="10px" borderRadius="100px">
                                        <AppTypography textAlign="center" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="500" lineHeight="20px" color={date_constant?.value === date?.value ? "#000" : "#7B7B7B"}>{date_constant?.label}</AppTypography>
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                        <ProductGrid isLoading={isLoadingHotProducts} products={hotProducts?.data?.data} />
                    </Box>
                )}
            </VStack>
        </VStack>
    );
};

export default AffiliateMarket;