import { HStack, Text, VStack } from "@chakra-ui/react";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from "react";

export const ProductFooter = ({ product }) => {
    const { t } = useLocaleResources('products')
    
    return (
        <VStack p="6" spacing="4" align="start">
            <HStack justify="space-between" w="full">
                <Text fontSize="sm" color={"text.subtext.placeholder.dark"}>
                    {t('productFooter.soldItems')}
                </Text>
                <Text fontSize="sm" color="white">
                    {product?.soldItems || "0"}
                </Text>
            </HStack>
            <HStack justify="space-between" w="full">
                <Text fontSize="sm" color={"text.subtext.placeholder.dark"}>
                    {t('productFooter.totalSale')}
                </Text>
                <HStack spacing="1">
                    <Text fontSize="sm" color="white" fontWeight="medium">
                        ${product?.totalSale || "0"}
                    </Text>
                    <Text fontSize="sm" color={"text.subtext.placeholder.light"}>
                        USD
                    </Text>
                </HStack>
            </HStack>
        </VStack>
    );
}
