import { Badge, HStack, Image, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList";
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';
import React from "react";

export const OrderProducts = (({ products }: { products: any[] }) => {
    const { t } = useLocaleResources('products')
    
    return (
        <>
          {products.map((product, index) => (
            <VStack key={index} align="start" spacing="4" p="6">
              <HStack spacing="4" w="full" align="start">
                <Image boxSize="48px" rounded="lg" p="2" src={product?.image || "https://via.placeholder.com/48x48"} alt="Product" />
                <Text fontSize="sm" fontWeight="medium" color="white">
                  {product?.title}
                </Text>
              </HStack>
              <Wrap spacing="2" w="full">
                {Object.entries(product.options || {}).map(([key, option]: any, idx) => (
                  <WrapItem key={idx}>
                    <Badge px="4" py="1" rounded="full" border="1px" borderColor="#282828" textTransform="none" background="transparent">
                      <DotSeparatedList>
                         <Text color="#7b7b7b" fontSize="sm">
                          {key}
                        </Text>
                        <Text color="white" fontSize="sm">
                          {option.caption}
                        </Text>
                      </DotSeparatedList>
                    </Badge>
                  </WrapItem>
                ))}
                <WrapItem>
                  <Badge px="4" py="1" rounded="full" border="1px" borderColor="#282828" textTransform="none" background="transparent">
                    <DotSeparatedList>
                      <Text color="#7b7b7b" fontSize="sm">
                        {t('orderProducts.quantity')}
                      </Text>
                      <Text color="white" fontSize="sm"> 
                        {product.quantity}
                      </Text>
                    </DotSeparatedList>
                  </Badge>
                </WrapItem>
              </Wrap>
            </VStack>
          ))}
        </>
      );
});
  