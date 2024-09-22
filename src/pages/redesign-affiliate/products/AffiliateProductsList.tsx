import React, { useContext } from "react";
import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfiniteQuery } from "react-query";
import { getProductsCommunityService } from "lib/apis/product/productServices";
import AffiliateItem, { LAffiliateItem } from "../_components/AffiliateItems";
import { ProductContext } from "./affiliate.products.context";

const AffiliateProductsList = () => {
    const { filters } = useContext(ProductContext);

    const fetchProducts = async ({ pageParam = 1 }) => {
        const response = await getProductsCommunityService({ ...filters, page: pageParam });
        return response?.data?.data;
    };

    const { data, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
        queryKey: ["products-affiliate", filters],
        queryFn: fetchProducts,
        getNextPageParam: (pagination, pages) => {
            return pagination?.hasNextPage ? pages.length + 1 : undefined;
        },
    });

    if (isLoading)
        return (
            <Flex flexWrap={"wrap"} flexDir={"row"} justifyContent={"space-between"} marginTop={"24px"} alignItems={"flex-start"} gap={"16px"}>
                {Array(4)
                    .fill(0)
                    .map((_, index) => (
                        <LAffiliateItem />
                    ))}
            </Flex>
        );
    if (isError) return <Text>Error loading products</Text>;

    return (
        <Box color={"white"}>
            <InfiniteScroll
                dataLength={data?.pages.flatMap((page) => page?.data)?.length || 0}
                next={fetchNextPage}
                hasMore={!!hasNextPage}
                loader={
                    <Flex flexWrap={"wrap"} flexDir={"row"} justifyContent={"space-between"} marginTop={"24px"} alignItems={"flex-start"} gap={"16px"}>
                        {Array(4)
                            .fill(0)
                            .map((_, index) => (
                                <LAffiliateItem />
                            ))}
                    </Flex>
                }
            >
                <Flex flexWrap={"wrap"} flexDir={"row"} justifyContent={"space-between"} alignItems={"flex-start"} gap={"16px"}>
                    {data?.pages
                        ?.flatMap((page) => page?.data)
                        ?.map((product: any) => (
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
                        ))}
                </Flex>
            </InfiniteScroll>
        </Box>
    );
};

export default AffiliateProductsList;
