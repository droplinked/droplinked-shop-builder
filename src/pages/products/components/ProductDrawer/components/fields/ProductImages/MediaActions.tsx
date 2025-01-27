import { Button, Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import useProductForm from 'pages/products/hooks/useProductForm'
import { ProductMedia } from 'pages/products/utils/types'
import React from 'react'

function MediaActions({ image }: { image: ProductMedia }) {
    const { url, isMain } = image
    const { values, setFieldValue } = useProductForm()
    const isMainImage = [true, 'true'].includes(isMain)

    function setDefaultImage() {
        if (isMainImage) return
        const updatedMedia = values.media.map(media => ({
            ...media,
            isMain: media.url === url
        }))
        setFieldValue('media', updatedMedia)
    }

    function removeImage() {
        if (values.media.length <= 1) return
        const updatedMedia = values.media.filter(media => media.url !== url)
        if (isMainImage) updatedMedia[0].isMain = true
        setFieldValue('media', updatedMedia)
    }

    return (
        <Flex gap={1}>
            <Button onClick={setDefaultImage}>
                {isMainImage ? <AppIcons.OutlinedStar /> : <AppIcons.GrayOutlineStar />}
            </Button>
            <Button onClick={removeImage}>
                <AppIcons.RedTrash width={20} height={20} />
            </Button>
        </Flex>
    )
}

export default MediaActions