import { Box, Flex, SimpleGrid, VStack, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import React, { useState } from "react";
import AffiliateItem, { LAffiliateItem } from "../_components/AffiliateItems";
import { useQuery } from "react-query";
import { getNewShopsService } from "lib/apis/shop/shopServices";
import { getHotProducts, getNewProducts } from "lib/apis/product/productServices";
import AppImage from "components/common/image/AppImage";
import { Link } from "react-router-dom";

type DateTypes = { label: "Today"; value: "today" } | { label: "This week"; value: "week" } | { label: "This month"; value: "month" };

const AffiliateMarket = () => {
    const dates_constant: DateTypes[] = [
        { label: "Today", value: "today" },
        { label: "This week", value: "week" },
        { label: "This month", value: "month" },
    ];
    const [date, setDate] = useState({ label: "Today", value: "today" });

    const { data: newShops, isLoading: isLoadingNewShops } = useQuery({ queryKey: ["new-shops-service"], queryFn: getNewShopsService });
    const { data: newProducts, isLoading: isLoadingNewProducts } = useQuery({ queryKey: ["new-products"], queryFn: getNewProducts });
    const { data: hotProducts, isLoading: isLoadingHotProducts } = useQuery({ queryKey: ["hot-products"], queryFn: getHotProducts });

    return (
        <VStack spacing={"36px"}>
            <VStack
                alignItems="center"
                width="full"
                justifyContent="center"
                height="360px"
                background="radial-gradient(305.12% 110.25% at 13.65% 81.01%, #182522 1.56%, rgba(48, 48, 48, 0.08) 23.53%, rgba(46, 73, 63, 0.42) 44.64%, #171717 79.55%, #000 100%), linear-gradient(rgba(255, 255, 255, 0.16) .1em, transparent .1em), linear-gradient(90deg, rgba(255, 255, 255, 0.16) .1em, transparent .1em), #060606"
                backgroundPosition="center, 0 0, 0 0"
                backgroundSize="cover, 3em 3em, 3em 3em"
                backgroundRepeat="no-repeat, repeat, repeat"
                borderRadius="8px"
                border="1.5px solid #292929"
            >
                <VStack display="inline-flex" flexDirection="column" alignItems="center" spacing="16px">
                    <AppTypography color="#FFF" textAlign="center" fontFamily="Poppins" fontSize="32px" fontStyle="normal" fontWeight="400" lineHeight="48px">
                        Unlock Savings
                    </AppTypography>
                    <AppTypography color="#FFF" textAlign="center" fontFamily="Poppins" fontSize="48px" fontStyle="normal" fontWeight="700" lineHeight="64px">
                        Explore Top Affiliate Picks!
                    </AppTypography>
                </VStack>
            </VStack>
            <VStack width="full" flexDirection="column" alignItems="flex-start" spacing="48px">
                {/* New Products section */}
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                    <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
                        <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">
                            New Products
                        </AppTypography>
                        <Link to={"/dashboard/affiliate/products"}>
                            <AppTypography color="#179EF8" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="500" lineHeight="24px" textDecorationLine="underline">
                                See all
                            </AppTypography>
                        </Link>
                    </Box>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 2, xl: 3, "2xl": 4 }} spacing={"24px"} width="full">
                        {isLoadingNewProducts
                            ? Array(4)
                                  .fill(0)
                                  .map((_, index) => (
                                      <Box
                                          key={`skeleton-${index}`}
                                          display={{
                                              base: index < 1 ? "block" : "none",
                                              sm: index < 2 ? "block" : "none",
                                              md: index < 2 ? "block" : "none",
                                              lg: index < 2 ? "block" : "none",
                                              xl: index < 3 ? "block" : "none",
                                              "2xl": index < 4 ? "block" : "none",
                                          }}
                                      >
                                          <LAffiliateItem />
                                      </Box>
                                  ))
                            : newProducts?.data?.data?.map((product, index) => (
                                  <Box
                                      key={product.slug}
                                      display={{
                                          base: index < 1 ? "block" : "none",
                                          sm: index < 2 ? "block" : "none",
                                          md: index < 2 ? "block" : "none",
                                          lg: index < 2 ? "block" : "none",
                                          xl: index < 3 ? "block" : "none",
                                          "2xl": index < 4 ? "block" : "none",
                                      }}
                                  >
                                      <AffiliateItem
                                          slug={product.slug}
                                          name={product.title}
                                          price={product.skus?.[0]?.price}
                                          commission={product.commission}
                                          image={product.media?.find((urls) => urls?.isMain)?.thumbnail || product.media?.[0]?.thumbnail || product.media?.[0]?.url}
                                          ownerName={product?.ownerShops?.name}
                                          logo={product.ownerShops?.logo}
                                      />
                                  </Box>
                              ))}
                    </SimpleGrid>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                    <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
                        <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">
                            New Merchants
                        </AppTypography>
                        <Link to={"/dashboard/affiliate/stores"}>
                            <AppTypography cursor={"pointer"} color="#179EF8" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="500" lineHeight="24px" textDecorationLine="underline">
                                See all
                            </AppTypography>
                        </Link>
                    </Box>
                    <Box display="flex" alignItems="space-between" width={"full"} gap="24px">
                        {isLoadingNewShops
                            ? Array(4)
                                  .fill(0)
                                  .map((_, index) => (
                                      <Box key={`skeleton-${index}`} display="flex" alignItems="center" gap="16px" flex="1 0 0" borderRadius="8px">
                                          <SkeletonCircle size="10" />
                                          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                                              <Skeleton height="24px" width="120px" mb="4px" />
                                              <Skeleton height="20px" width="80px" />
                                          </Box>
                                      </Box>
                                  ))
                            : newShops?.data?.data?.map((shop) => (
                                  <Link
                                      key={shop._id}
                                      to={`/dashboard/affiliate/stores/${shop?._id}`}
                                      style={{ display: "flex", flex: "1 0 0", alignItems: "center", cursor: "pointer", gap: "16px", borderRadius: "8px" }}
                                  >
                                      <AppImage className="polygon-image" src={shop?.logo} />
                                      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                                          <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="700" lineHeight="24px">
                                              {shop?.name}
                                          </AppTypography>
                                          <AppTypography color="#F5F7FA99" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                              Merchant
                                          </AppTypography>
                                      </Box>
                                  </Link>
                              ))}
                    </Box>
                </Box>
                {(isLoadingHotProducts || hotProducts?.data?.data?.length) && (
                    <Box display="flex" flexDirection="column" alignItems="flex-start" gap="24px" alignSelf="stretch">
                        <Box display="flex" justifyContent="space-between" alignItems="center" alignSelf="stretch">
                            <AppTypography color="#F5F7FA" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">
                                Hot Products
                            </AppTypography>
                            <Flex gap={"12px"}>
                                {dates_constant?.map((date_constant) => (
                                    <Box
                                        key={date_constant?.value}
                                        cursor="pointer"
                                        onClick={() => setDate({ label: date_constant?.label, value: date_constant?.value })}
                                        backgroundColor={date_constant?.value === date?.value ? "#2BCFA1" : "#292929"}
                                        display="flex"
                                        padding="6px 16px"
                                        justifyContent="center"
                                        alignItems="center"
                                        gap="10px"
                                        borderRadius="100px"
                                    >
                                        <AppTypography
                                            textAlign="center"
                                            fontFamily="Inter"
                                            fontSize="14px"
                                            fontStyle="normal"
                                            fontWeight="500"
                                            lineHeight="20px"
                                            color={date_constant?.value === date?.value ? "#000" : "#7B7B7B"}
                                        >
                                            {date_constant?.label}
                                        </AppTypography>
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                        <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 2, xl: 3, "2xl": 4 }} spacing={"24px"} width="full">
                            {isLoadingHotProducts
                                ? Array(4)
                                      .fill(0)
                                      .map((_, index) => (
                                          <Box
                                              key={`skeleton-${index}`}
                                              display={{
                                                  base: index < 1 ? "block" : "none",
                                                  sm: index < 2 ? "block" : "none",
                                                  md: index < 2 ? "block" : "none",
                                                  lg: index < 2 ? "block" : "none",
                                                  xl: index < 3 ? "block" : "none",
                                                  "2xl": index < 4 ? "block" : "none",
                                              }}
                                          >
                                              <LAffiliateItem />
                                          </Box>
                                      ))
                                : hotProducts?.data?.data?.map((product, index) => (
                                      <Box
                                          key={product.slug}
                                          display={{
                                              base: index < 1 ? "block" : "none",
                                              sm: index < 2 ? "block" : "none",
                                              md: index < 2 ? "block" : "none",
                                              lg: index < 2 ? "block" : "none",
                                              xl: index < 3 ? "block" : "none",
                                              "2xl": index < 4 ? "block" : "none",
                                          }}
                                      >
                                          <AffiliateItem
                                              slug={product.slug}
                                              name={product.title}
                                              price={product.skus?.[0]?.price}
                                              commission={product.commission}
                                              image={product.media?.find((urls) => urls?.isMain)?.thumbnail || product.media?.[0]?.thumbnail || product.media?.[0]?.url}
                                              ownerName={product?.ownerShops?.name}
                                              logo={product.ownerShops?.logo}
                                          />
                                      </Box>
                                  ))}
                        </SimpleGrid>
                    </Box>
                )}
            </VStack>
        </VStack>
    );
};

export default AffiliateMarket;
