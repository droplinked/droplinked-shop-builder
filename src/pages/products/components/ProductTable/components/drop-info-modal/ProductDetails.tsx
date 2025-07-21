import { Flex, Text } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'

function ProductDetails({ product }: { product: any }) {
    const { t } = useLocaleResources('products');
    const { media, title } = product
    const imageURL = (media.find(m => m.isMain === "true") ?? media[0]).thumbnail

    return (
        <Flex
            mt={4}
            alignItems="center"
            gap={4}
            border="1px solid"
            borderColor="neutral.gray.800"
            borderRadius={12}
            padding={4}
            bgColor="neutral.gray.1000"
        >
            <AppImage
                width={12}
                height={12}
                borderRadius={6}
                src={imageURL}
                alt={t('DropInfoModal.productDetails.alt')}
            />
            <Text fontWeight={700} color="white">{title}</Text>
        </Flex>
    )
}

export default ProductDetails