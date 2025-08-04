import { Center, Flex, Heading, Text } from '@chakra-ui/react'
import useProductPageStore from 'pages/products/stores/ProductPageStore'
import { ProductTypeOption } from 'pages/products/utils/types'
import React from 'react'

function ProductTypeCard({ icon, title, description, productType }: ProductTypeOption) {
    const updateProductPageState = useProductPageStore(s => s.updateProductPageState)
    const isDisabled = productType === "EVENT"

    const handleSelect = () => {
        if (isDisabled) return
        updateProductPageState("selectedProductType", productType)
    }

    return (
        <Flex
            width="100%"
            direction={{ base: "row", md: "column" }}
            alignItems="flex-start"
            gap={4}
            border="1px solid transparent"
            borderRadius={8}
            padding={{ base: 2, md: 4 }}
            transition="all 400ms ease-in-out"
            opacity={isDisabled ? 0.6 : 1}
            cursor={isDisabled ? "not-allowed" : "pointer"}
            _hover={isDisabled ? {} : {
                borderColor: "neutral.gray.800",
                background: "neutral.gray.1000"
            }}
            onClick={handleSelect}
        >
            <Center
                flexShrink={0}
                w={{ base: "48px", md: "56px" }}
                aspectRatio={1}
                bg="neutral.gray.850"
                borderRadius={8}
            >
                {icon}
            </Center>

            <Flex direction="column" gap={1} textAlign="left">
                <Heading
                    as="h3"
                    fontSize={{ base: 16, md: 18 }}
                    fontWeight={700}
                    color="text.white"
                >
                    {title}
                </Heading>
                <Text fontSize={14} color="text.subtext.placeholder.dark">
                    {description}
                </Text>
            </Flex>
        </Flex>
    )
}

export default ProductTypeCard