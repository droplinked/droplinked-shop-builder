import { Box, Flex, Image as Img, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import AlertProduct from '../../../alert/AlertProduct'

function NftImageUploaded() {
    const { loading, state: { media }, methods: { updateState } } = useContext(productContext)
    const [SizeImage, setSizeImage] = useState(null)

    function getImageFileSize(imageUrl) {
        return fetch(imageUrl)
            .then((response) => response.blob())
            .then((blob) => {
                const fileSizeKB = Math.round(blob.size / 1024);
                return fileSizeKB;
            })
            .catch((error) => {
                console.error('Failed to fetch image:', error);
            });
    }

    function getFileNameFromUrl(url) {
        const path = decodeURI(url);
        const lastSlashIndex = path.lastIndexOf('/');
        const fileNameWithExtension = path.substring(lastSlashIndex + 1);
        const splits = fileNameWithExtension.split('.')
        const fileName = splits[0].substring(0, 3) + '...' + splits[0].substring(3, 6) + '.' + splits[splits.length - 1];
        return fileName;
    }

    useEffect(() => {
        getImageFileSize(media[0].url).then((sizeKB) => setSizeImage(sizeKB));
    }, [media])


    return (
        <VStack align="stretch" spacing="20px">
            <Flex justifyContent="space-between" alignItems='center'>
                <VStack align="stretch">
                    <FieldLabel label='Product Tokening AssetImage' isRequired loading={loading} />
                    <AppTypography size='14px' color="#808080">
                        {media.length ? 'it could be the image file you wanna create NFT for, or only a cover for your main product' : 'it could be the image file you wanna create NFT for, or only a cover for your main product'}
                    </AppTypography>
                </VStack>
                <Box><BasicButton variant='outline' onClick={() => updateState('media', [])} sizes='medium'>Upload Again</BasicButton></Box>
            </Flex>
            <Flex gap="20px" justifyContent="space-between" alignItems="center">
                <Flex gap="20px" alignItems="center">
                    <Img src={media[0].thumbnail} borderRadius="8px" width="47px" />
                    <VStack align="stretch">
                        <AppTypography size="14px">{getFileNameFromUrl(media[0].url)}</AppTypography>
                        <AlertProduct text='Once you publish your product this image will be tokenized as NFT and can not be changed' />
                    </VStack>
                </Flex>
                <AppTypography size="12px" color="#C2C2C2">{SizeImage} KB</AppTypography>
            </Flex>
        </VStack>
    )
}

export default NftImageUploaded