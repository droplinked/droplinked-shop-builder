import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import productPageContext, { IproductPageState, productPageState } from "./context";
import productPageModel from "./model";
import ProductDetails from "./parts/details/ProductDetails";
import ProductPageLoading from "./parts/loading/ProductPageLoading";
import ProductSlider from "./parts/slider/ProductSlider";
import { IGetSingleProductCommunity } from "lib/apis/product/interfaces";
import { getSingleProductCommunityService } from "lib/apis/product/productServices";
import { useProfile } from "functions/hooks/useProfile/useProfile";

function AffiliateProductsSinglePage() {
    const { profile } = useProfile();
    const { mutateAsync, isLoading } = useMutation((params: IGetSingleProductCommunity) => getSingleProductCommunityService(params));
    const params = useParams();
    const [States, setStates] = useState<IproductPageState>(productPageState);
    const { getFirstOption, findSkuAsOption } = productPageModel;

    const updateState = (key: string, value: any) => setStates((prev: IproductPageState) => ({ ...prev, [key]: value }));

    const initialOptions = (data: any) => {
        const fist_option = getFirstOption(data?.skuIDs[0]);
        setStates((prev) => ({
            ...prev,
            option: {
                ...prev.option,
                color: fist_option?.color,
                size: fist_option?.size,
                custom_variants: productPageModel.getCustomVariants(data?.skuIDs).map((cv) => ({ key: cv.name, value: cv.values[0].value })),
            },
        }));
    };

    // Get product as productId in route
    const fetch = useCallback(async () => {
        try {
            if (!params?.slug) throw Error("Please provide product");
            const data = await mutateAsync({ slug: params?.slug, user: Boolean(profile?._id) });
            setStates((prev) => ({ ...prev, product: data?.data?.data }));
            initialOptions(data?.data?.data);
        } catch (error) {}
    }, [params?.slug]);

    useEffect(() => {
        if (params.slug) fetch();
    }, [params?.slug]);

    // Get sku as options
    useEffect(() => {
        const { color, size, custom_variants } = States.option;
        const variantOptions = custom_variants.reduce((acc, cv) => ({ ...acc, [cv.key]: cv.value }), {});
        const sku =
            States?.product?.product_type === "DIGITAL"
                ? States?.product?.skuIDs[0]
                : findSkuAsOption({ options: { ...(color && { color: color }), ...(size && { size: size }), ...variantOptions }, skuIDs: States.product?.skuIDs });
        setStates((prev) => ({
            ...prev,
            sku: sku,
            ...(sku?.image && { image: sku?.image }),
        }));
    }, [States.option, States.product]);

    return (
        <productPageContext.Provider value={{ states: States, methods: { updateState } }}>
            {isLoading ? (
                <ProductPageLoading />
            ) : (
                <Flex direction={"column"} gap={{ base: "24px", md: "64px" }} py={8}>
                    <Flex direction={{ base: "column", md: "row" }} gap={{ base: "24px", md: "56px" }}>
                        <Box width={{ base: "100%", md: "40%" }}>
                            <ProductSlider />
                        </Box>
                        <Box width={{ base: "100%", md: "60%" }}>
                            <ProductDetails />
                        </Box>
                    </Flex>
                </Flex>
            )}
        </productPageContext.Provider>
    );
}

export default AffiliateProductsSinglePage;
