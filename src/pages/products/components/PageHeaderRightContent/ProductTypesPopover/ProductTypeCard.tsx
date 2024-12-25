import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import React from 'react'
import { ProductTypeObj } from './ProductTypes'

function ProductTypeCard({ icon, title, description, productType }: ProductTypeObj) {
    const updateProductPageState = useProductPageStore(e => e.updateProductPageState)

    return (
        <Flex
            width="100%"
            direction="column"
            padding={4}
            border="1px solid transparent"
            borderRadius={8}
            cursor="pointer"
            transition="all 400ms ease-in-out"
            _hover={{
                borderColor: "#292929",
                background: "#1C1C1C"
            }}
            onClick={() => updateProductPageState("selectedProductType", productType)}
        >
            <Center
                w="56px"
                h="56px"
                bg="#262626"
                borderRadius={8}
            >
                {icon}
            </Center>
            <Flex mt={4} alignItems="center" gap={2}>
                <Heading as="h3" fontSize={18} fontWeight={700} color="white">{title}</Heading>
            </Flex>
            <Text mt={1} fontSize={14} color="#7B7B7B">{description}</Text>
        </Flex>
    )
}

export default ProductTypeCard