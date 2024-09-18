import { Box, Divider, Flex } from "@chakra-ui/react";
import AppTypography from "components/common/typography/AppTypography";
import { useContext, useMemo } from "react";
import productPageContext from "../../context";
import React from "react";
import BasicButton from "components/common/BasicButton/BasicButton";
import { useMutation } from "react-query";
import { IimportAffiliateProduct } from "lib/apis/product/interfaces";
import { importAffiliateProductService } from "lib/apis/product/productServices";
import productPageModel from "../../model";
import AppIcons from "assest/icon/Appicons";
import { AppAccordion, AppAccordionItem, AppAccordionTrigger, AppAccordionChevron, AppAccordionPanel } from "components/redesign/accordion/AppAccordion";

function ProductDetails() {
    const {
        states: { product, sku },
    } = useContext(productPageContext);
    const { mutateAsync, isLoading } = useMutation((params: IimportAffiliateProduct) => importAffiliateProductService(params));
    const sizes = useMemo(() => productPageModel.getOptions({ skuIDs: product?.skuIDs, type: "size" }), [product]);
    const variants = useMemo(() => productPageModel.getCustomVariants(product?.skuIDs), [product]);
    const colors = useMemo(() => productPageModel.getOptions({ skuIDs: product?.skuIDs, type: "color" }), [product]);
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" gap="48px" alignSelf="stretch">
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap="4px" alignSelf="stretch">
                <AppTypography color="#FFF" fontFamily="Inter" fontSize="28px" fontStyle="normal" fontWeight="500" lineHeight="40px">
                    {product?.title}
                </AppTypography>
            </Box>
            <AppTypography color="#FFF" fontFamily="Inter" fontSize="36px" fontStyle="normal" fontWeight="700" lineHeight="52px" price>
                {sku?.price.toFixed(2)}
            </AppTypography>
            {colors.length ? (
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="16px" alignSelf="stretch">
                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="500" lineHeight="24px">
                        Color
                    </AppTypography>
                    <Flex display="flex" alignItems="flex-start" alignContent="flex-start" gap="16px" alignSelf="stretch" flexWrap="wrap">
                        {colors.map((el, key) => (
                            <Flex border={"1px solid #292929"} rounded={"8px"} padding={"8px"}>
                                <Box key={key} width="32px" height="32px" cursor="pointer" borderRadius="4px" background={el?.value} />
                            </Flex>
                        ))}
                    </Flex>
                </Box>
            ) : null}
            {sizes.length ? (
                <Box display="flex" flexDirection="column" alignItems="flex-start" gap="16px" alignSelf="stretch">
                    <AppTypography color="#FFF" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="500" lineHeight="24px">
                        Size
                    </AppTypography>
                    <Flex display="flex" alignItems="flex-start" alignContent="flex-start" gap="16px" alignSelf="stretch" flexWrap="wrap">
                        {sizes.map((el: any, key: number) => {
                            return (
                                <Box display="flex" padding="12px 16px" justifyContent="center" alignItems="center" gap="8px" borderRadius="8px" border="1px solid #292929">
                                    <AppTypography key={key} color="#FFF" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                                        {el.caption}
                                    </AppTypography>
                                </Box>
                            );
                        })}
                    </Flex>
                </Box>
            ) : null}
            {variants.length
                ? variants?.map((variant_group, key: number) => (
                      <Box display="flex" flexDirection="column" alignItems="flex-start" gap="16px" alignSelf="stretch">
                          <AppTypography color="#FFF" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="500" lineHeight="24px">
                              {variant_group?.name}
                          </AppTypography>
                          <Flex display="flex" alignItems="flex-start" alignContent="flex-start" gap="16px" alignSelf="stretch" flexWrap="wrap">
                              {variant_group?.values?.map((value_of_custom_variant_group) => {
                                  return (
                                      <Box display="flex" padding="12px 16px" justifyContent="center" alignItems="center" gap="8px" borderRadius="8px" border="1px solid #292929">
                                          <AppTypography key={key} color="#FFF" fontFamily="Inter" fontSize="16px" fontStyle="normal" fontWeight="400" lineHeight="24px">
                                              {value_of_custom_variant_group.caption}
                                          </AppTypography>
                                      </Box>
                                  );
                              })}
                          </Flex>
                      </Box>
                  ))
                : null}
            <BasicButton isLoading={isLoading} isDisabled={isLoading} width={"full"} onClick={async () => await mutateAsync({ productId: product?._id })}>
                Import Product
            </BasicButton>
            <Divider width={"full"} borderColor={"#292929"} />
            <AppAccordion width={"full"}>
                <AppAccordionItem itemId="0">
                    <AppAccordionTrigger width={"full"}>
                        <Box display="flex" width={"full"} justifyContent="space-between" alignItems="center" alignSelf="stretch">
                            <Box display="flex" alignItems="center" gap="16px">
                                <AppIcons.SidebarBlog />
                                <AppTypography color="#FFF" fontFamily="Inter" fontSize="20px" fontStyle="normal" fontWeight="500" lineHeight="32px">
                                    Description
                                </AppTypography>
                            </Box>
                            <AppAccordionChevron width={"24px"} height={"24px"} strokeWidth={"2"} />
                        </Box>
                    </AppAccordionTrigger>
                    <AppAccordionPanel paddingTop={"24px"}>
                        <AppTypography
                            color="#FFF"
                            fontFamily="Inter"
                            fontSize="16px"
                            fontStyle="normal"
                            fontWeight="400"
                            lineHeight="24px"
                            alignSelf={"stretch"}
                            dangerouslySetInnerHTML={{ __html: product?.description }}
                        />
                    </AppAccordionPanel>
                </AppAccordionItem>
            </AppAccordion>
        </Box>
    );
}

export default ProductDetails;
