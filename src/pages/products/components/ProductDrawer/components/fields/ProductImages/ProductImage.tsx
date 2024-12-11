import { Flex } from '@chakra-ui/react'
import AppImage from 'components/common/image/AppImage'
import { ProductMedia } from 'pages/products/utils/formSchema'
import React from 'react'
import MediaActions from './MediaActions'
import MediaDetails from './MediaDetails'

export default function ProductImage({ image }: { image: ProductMedia }) {
    return (
        <Flex
            justifyContent="space-between"
            alignItems="center"
            borderRadius={8}
            border="1px solid #292929"
            padding={3}
            pr={5}
        >
            <Flex alignItems="center" gap={4}>
                <AppImage width={14} height={14} borderRadius={8} src={image.thumbnail} />
                <MediaDetails image={image} />
            </Flex>
            <MediaActions image={image} />
        </Flex>
    )
}