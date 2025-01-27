import { Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import React from 'react'

function ProductDetails({ product }: { product: any }) {
    const { media, title } = product
    const imageURL = (media.find(m => m.isMain === "true") ?? media[0]).thumbnail

    return (
        <Flex
            mt={4}
            alignItems="center"
            gap={4}
            border="1px solid #292929"
            borderRadius={12}
            padding={4}
            bgColor="#1C1C1C"
        >
            <AppImage
                width={12}
                height={12}
                borderRadius={6}
                src={imageURL}
                alt="Product Image"
            />
            <Text fontWeight={700} color="white">{title}</Text>
        </Flex>
    )
}

export default ProductDetails