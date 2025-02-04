import { Box, Flex, HStack } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { useProfile } from "functions/hooks/useProfile/useProfile";
import { InvoiceQueryParams } from "lib/apis/invoice/interfaces";
import { getShopsCommunityService } from "lib/apis/shop/shopServices";
import React, { useState } from "react";
import { useInfiniteQuery } from "react-query";
import AffiliateStoreFilters from "./AffiliateStoreFilters";
import AffiliateStoresTable from "./AffiliateStoresTable";

export const INVOICES_QUERY_KEY = "invoiceList";

function AffiliateStores() {
    const [storesFilters, setstoresFilters] = useState<InvoiceQueryParams>({ page: 1, limit: 15 });
    const { shop } = useProfile();
    const fetchStores = async ({ pageParam = 1 }) => {
        const response = await getShopsCommunityService({ ...storesFilters, page: pageParam });
        return response?.data?.data;
    };
    const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [INVOICES_QUERY_KEY, { ...storesFilters, shopId: shop._id }],
        queryFn: fetchStores,
        getNextPageParam: (pagination, pages) => {
            return pagination?.hasNextPage ? pages.length + 1 : undefined;
        },
    });
    const stores = data?.pages?.flatMap((page) => page?.data) || [];
    return (
        <>
            <Box
                display="flex"
                width="full"
                padding="48px 64px"
                flexDirection="column"
                alignItems="flex-start"
                gap="10px"
                borderRadius="8px"
                border="1.5px solid #292929"
                objectFit={"cover"}
                background="linear-gradient(93deg, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.75) 25%, rgba(0, 0, 0, 0.00) 100%), url(https://upload-file-droplinked.s3.amazonaws.com/22b2a2e43dcf9d76c43ad427cd8f72a4a0db5dab76be1e1545140721aba0e018.jpg) lightgray 50% / cover no-repeat"
            >
                <Box width={"full"} display="flex" flexDirection="column" alignItems="flex-start" gap="36px" alignSelf="stretch">
                    <AppTypography color="#FFF" fontSize="24px" maxW={{ base: "70%", md: "50%" }} fontStyle="normal" fontWeight="400" lineHeight="36px">
                        Showcase and sell your products in the most awesome affiliate marketplace
                    </AppTypography>
                    <HStack spacing={"8px"} alignItems={"center"} justifyContent={"center"}>
                        <AppTypography color="#2BCFA1" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="700" lineHeight="32px">
                            Become an Affiliate Partner
                        </AppTypography>
                        {/* <AppIcons.AffiliateProductsArrow width={"24px"} height={"24px"} /> */}
                    </HStack>
                </Box>
            </Box>
            <Flex mt={9} direction={"column"} gap={6}>
                <AffiliateStoreFilters updateInvoiceFilters={setstoresFilters} />
                <AffiliateStoresTable stores={stores} isLoading={isFetching} dataLength={stores.length} hasMore={hasNextPage} next={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />
            </Flex>
        </>
    );
}

export default AffiliateStores;
