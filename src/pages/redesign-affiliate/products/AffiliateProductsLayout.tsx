import React, { useState } from "react";
import { VStack, Box, HStack, Input, Select, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, Text, Checkbox, Flex } from "@chakra-ui/react";
import { useQuery } from "react-query";
import AppIcons from "assest/icon/Appicons";
import AppTypography from "components/common/typography/AppTypography";
import { AppAccordion, AppAccordionChevron, AppAccordionItem, AppAccordionPanel, AppAccordionTrigger } from "components/redesign/accordion/AppAccordion";
import { ProductContext, ProductContextType, IAffiliateProductsCategory } from "./affiliate.products.context";
import AffiliateProductsList from "./AffiliateProductsList";
import { IGetProductsCommunityService } from "lib/apis/product/interfaces";
import { productCategoryervices } from "lib/apis/product/productServices";

const AffiliateProductsLayout = () => {
    const { data: categories, isLoading, error } = useQuery<IAffiliateProductsCategory[], Error>("categories", () => productCategoryervices().then((response) => response.data.data));

    const [filters, setFilters] = useState<IGetProductsCommunityService>({
        limit: 20,
        page: 1,
        title: undefined,
        categoryIds: [],
        subCategoryIds: undefined,
        lowestPrice: 0,
        highestPrice: 1000,
        lowestCommission: 0,
        highestCommission: 100,
        sort: undefined,
    });

    const handleFilterChange = (key: keyof IGetProductsCommunityService, value: any) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const contextValue: ProductContextType = {
        categories: categories || [],
        isLoading,
        error: error ? error.message : null,
        filters,
        setFilters: handleFilterChange,
    };

    return (
        <ProductContext.Provider value={contextValue}>
            <VStack align={"stretch"} width={"full"} spacing={"24px"}>
                {/* <Box
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
                            <AppIcons.AffiliateProductsArrow width={"24px"} height={"24px"} />
                        </HStack>
                    </Box>
                </Box> */}
                <Flex alignItems="flex-start" gap="24px">
                    <Box flexShrink={0} width="288px">
                        <AppAccordion multiCollapse={true} display={"flex"} flexDir={"column"} gap={"24px"}>
                            <AppAccordionItem
                                display="flex"
                                padding="24px"
                                flexDirection="column"
                                alignItems="flex-start"
                                alignSelf="stretch"
                                borderRadius="8px"
                                border="1.5px solid #292929"
                                background="#1C1C1C"
                                itemId="1"
                            >
                                <AppAccordionTrigger>
                                    <AppTypography color="white" fontFamily="Inter" fontSize="16px" fontWeight="700" lineHeight="24px" textAlign="left">
                                        Type
                                    </AppTypography>
                                    <AppAccordionChevron />
                                </AppAccordionTrigger>
                                <AppAccordionPanel paddingTop={"24px"}>
                                    <Flex gap={"16px"} flexDir={"column"}>
                                        {contextValue?.categories?.map((category) => (
                                            <Checkbox
                                                sx={{
                                                    ".chakra-checkbox__control": { border: "1px solid #616161", width: "20px", height: "20px" },
                                                    ".chakra-checkbox__control[data-checked]": { backgroundColor: "#2BCFA1", color: "#292929", borderColor: "#2BCFA1" },
                                                    svg: {
                                                        strokeWidth: "1.5px !important",
                                                    },
                                                }}
                                                onChange={(e) => {
                                                    handleFilterChange(
                                                        "categoryIds",
                                                        filters?.categoryIds?.includes(e?.target?.value)
                                                            ? filters?.categoryIds?.filter((category) => category !== e?.target?.value)
                                                            : [...filters?.categoryIds, e?.target?.value]
                                                    );
                                                }}
                                                value={category?._id}
                                                size="md"
                                                alignItems="flex-start"
                                                colorScheme="green"
                                                multiple
                                                stroke={"1.5px"}
                                                isChecked={filters?.categoryIds?.includes(category?._id)}
                                            >
                                                <AppTypography color="#FFF" fontFamily="Inter" fontSize="14px" fontStyle="normal" fontWeight="400" lineHeight="20px">
                                                    {category?.title}
                                                </AppTypography>
                                            </Checkbox>
                                        ))}
                                    </Flex>
                                </AppAccordionPanel>
                            </AppAccordionItem>
                            <AppAccordionItem
                                display="flex"
                                padding="24px"
                                flexDirection="column"
                                alignItems="flex-start"
                                alignSelf="stretch"
                                borderRadius="8px"
                                border="1.5px solid #292929"
                                background="#1C1C1C"
                                defaultOpen
                                itemId="2"
                            >
                                <AppAccordionTrigger>
                                    <AppTypography color="white" fontFamily="Inter" fontSize="16px" fontWeight="700" lineHeight="24px" textAlign="left">
                                        Price
                                    </AppTypography>
                                    {/* <AppAccordionChevron /> */}
                                </AppAccordionTrigger>
                                <AppAccordionPanel paddingTop={"24px"}>
                                    <HStack width={"full"} spacing={"8px"}>
                                        <Box display="flex" padding="12px 16px" alignItems="center" gap="8px" borderRadius="8px" border={`1.5px solid ${filters?.lowestPrice ? "#2BCFA1" : "#292929"}`}>
                                            <AppIcons.AffiliateProductsDollar />
                                            <Input
                                                fontSize="14px"
                                                fontWeight="400"
                                                color="#FFFFFF"
                                                height={"auto"}
                                                padding={"0px"}
                                                spellCheck="false"
                                                border="none"
                                                _hover={{}}
                                                _focusVisible={{}}
                                                _placeholder={{ color: "#7B7B7B" }}
                                                value={filters.lowestPrice}
                                                placeholder="0"
                                                onChange={(e) => !isNaN(parseFloat(e?.target?.value)) && handleFilterChange("lowestPrice", parseFloat(e.target.value))}
                                                onKeyDown={(e) => {
                                                    if (e.key === "+" || e.key === "-" || e.key === "e") e.preventDefault();
                                                }}
                                            />
                                        </Box>
                                        <AppIcons.AffiliateProductsSeparator />
                                        <Box
                                            display="flex"
                                            padding="12px 16px"
                                            alignItems="center"
                                            gap="8px"
                                            borderRadius="8px"
                                            border={`1.5px solid ${filters?.highestPrice ? "#2BCFA1" : "#292929"}`}
                                        >
                                            <AppIcons.AffiliateProductsDollar />
                                            <Input
                                                type="number"
                                                fontSize="14px"
                                                fontWeight="400"
                                                width={"full"}
                                                color="#FFFFFF"
                                                height={"auto"}
                                                padding={"0px"}
                                                spellCheck="false"
                                                border="none"
                                                _hover={{}}
                                                _focusVisible={{}}
                                                _placeholder={{ color: "#7B7B7B" }}
                                                value={filters.highestPrice}
                                                placeholder="1000"
                                                onChange={(e) => !isNaN(parseFloat(e?.target?.value)) && handleFilterChange("highestPrice", parseFloat(e.target.value))}
                                                onKeyDown={(e) => {
                                                    if (e.key === "+" || e.key === "-" || e.key === "e") e.preventDefault();
                                                }}
                                            />
                                        </Box>
                                    </HStack>
                                </AppAccordionPanel>
                            </AppAccordionItem>
                            <AppAccordionItem
                                display="flex"
                                padding="24px"
                                flexDirection="column"
                                alignItems="flex-start"
                                alignSelf="stretch"
                                borderRadius="8px"
                                border="1.5px solid #292929"
                                background="#1C1C1C"
                                defaultOpen
                                itemId="3"
                            >
                                <AppAccordionTrigger>
                                    <AppTypography color="white" fontFamily="Inter" fontSize="16px" fontWeight="700" lineHeight="24px" textAlign="left">
                                        Commission
                                    </AppTypography>
                                    {/* <AppAccordionChevron /> */}
                                </AppAccordionTrigger>
                                <AppAccordionPanel paddingTop={"24px"}>
                                    <HStack width={"full"} spacing={"8px"}>
                                        <Box
                                            display="flex"
                                            padding="12px 16px"
                                            alignItems="center"
                                            gap="8px"
                                            borderRadius="8px"
                                            border={`1.5px solid ${filters?.lowestCommission ? "#2BCFA1" : "#292929"}`}
                                        >
                                            <AppIcons.AffiliateProductsPercent />
                                            <Input
                                                type="number"
                                                fontSize="14px"
                                                fontWeight="400"
                                                color="#FFFFFF"
                                                height={"auto"}
                                                padding={"0px"}
                                                spellCheck="false"
                                                border="none"
                                                _hover={{}}
                                                _focusVisible={{}}
                                                _placeholder={{ color: "#7B7B7B" }}
                                                value={filters.lowestCommission}
                                                placeholder="0"
                                                onChange={(e) => !isNaN(parseFloat(e?.target?.value)) && handleFilterChange("lowestCommission", parseFloat(e.target.value))}
                                                onKeyDown={(e) => {
                                                    if (e.key === "+" || e.key === "-" || e.key === "e") e.preventDefault();
                                                }}
                                            />
                                        </Box>
                                        <AppIcons.AffiliateProductsSeparator />
                                        <Box
                                            display="flex"
                                            padding="12px 16px"
                                            alignItems="center"
                                            gap="8px"
                                            borderRadius="8px"
                                            border={`1.5px solid ${filters?.highestCommission ? "#2BCFA1" : "#292929"}`}
                                        >
                                            <AppIcons.AffiliateProductsPercent />
                                            <Input
                                                type="number"
                                                fontSize="14px"
                                                fontWeight="400"
                                                width={"full"}
                                                color="#FFFFFF"
                                                height={"auto"}
                                                padding={"0px"}
                                                spellCheck="false"
                                                border="none"
                                                _hover={{}}
                                                _focusVisible={{}}
                                                _placeholder={{ color: "#7B7B7B" }}
                                                value={filters.highestCommission}
                                                placeholder="100"
                                                onChange={(e) => !isNaN(parseFloat(e?.target?.value)) && handleFilterChange("highestCommission", parseFloat(e.target.value))}
                                                onKeyDown={(e) => {
                                                    if (e.key === "+" || e.key === "-" || e.key === "e") e.preventDefault();
                                                }}
                                            />
                                        </Box>
                                    </HStack>
                                </AppAccordionPanel>
                            </AppAccordionItem>
                        </AppAccordion>
                    </Box>
                    <VStack width={"full"} spacing={"24px"}>
                        <HStack justifyContent={"space-between"} width={"full"} alignItems={"center"}>
                            <Flex
                                display="flex"
                                width="300px"
                                padding="12px 16px"
                                align-items="center"
                                justifyContent={"center"}
                                gap="8px"
                                border="1.5px solid #292929"
                                backgroundColor={"#1C1C1C"}
                                borderRadius="8"
                            >
                                <AppIcons.Search height={"full"} />
                                <Input
                                    fontSize="16px"
                                    fontWeight="400"
                                    color="#7B7B7B"
                                    height={"auto"}
                                    padding={"0px"}
                                    spellCheck="false"
                                    border="none"
                                    _hover={{}}
                                    _focusVisible={{}}
                                    _placeholder={{ color: "#7B7B7B" }}
                                    value={filters.title}
                                    placeholder="Search"
                                    onChange={(e) => handleFilterChange("title", e.target.value)}
                                />
                            </Flex>
                            {/* <Select width="200px" bgColor="#1C1C1C" onChange={(e) => handleFilterChange("sort", e.target.value)}>
                                <option value={"LOWEST_PRICE"}>Lowest Price</option>
                                <option value={"HEIGHEST_PRICE"}>Heighst Price</option>
                                <option value={"LOWEST_COMMISSION"}>Lowest Commission</option>
                                <option value={"HEIGHEST_COMMISSION"}>Heighst Commission</option>
                            </Select> */}
                        </HStack>
                        <AffiliateProductsList />
                    </VStack>
                </Flex>
            </VStack>
        </ProductContext.Provider>
    );
};

export default AffiliateProductsLayout