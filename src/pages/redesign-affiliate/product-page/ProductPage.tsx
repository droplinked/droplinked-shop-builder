import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ProductDetails from "./parts/details/ProductDetails";
import ProductPageLoading from "./parts/loading/ProductPageLoading";
import ProductSlider from "./parts/slider/ProductSlider";
import { getSingleProductCommunityService } from "lib/apis/product/productServices";
import { useProfile } from "functions/hooks/useProfile/useProfile";

function AffiliateProductsSinglePage() {
    const { profile } = useProfile();
    const params = useParams<{ slug: string }>();

    const { data: productData, isLoading } = useQuery(["product", params.slug], () => getSingleProductCommunityService({ slug: params.slug, user: Boolean(profile?._id) }), {
        enabled: !!params.slug,
        select: (data) => data?.data?.data,
    });

    if (isLoading) return <ProductPageLoading />;

    return (
        <Flex alignItems="center" justifyContent="center" width="full">
            <Flex direction={{ base: "column", lg: "row" }} gap={{ base: "24px", lg: "56px" }} width="full">
                <Box width={{ base: "100%", lg: "40%" }}>
                    <ProductSlider product={productData} />
                </Box>
                <Box width={{ base: "100%", lg: "60%" }}>
                    <ProductDetails product={productData} />
                </Box>
            </Flex>
        </Flex>
    );
}

export default AffiliateProductsSinglePage;
