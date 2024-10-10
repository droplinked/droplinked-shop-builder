import { Box, Flex, SimpleGrid, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppImage from 'components/common/image/AppImage'
import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import { productContext } from 'pages/product/single/context'
import React, { useCallback, useContext, useEffect, useState } from 'react'

interface IProps extends IAppModal {
    image: string
    index: number
}

function CoversModal({ close, open, image, index }: IProps) {
    const { state: { media, sku }, methods: { updateState } } = useContext(productContext)
    const [selectedImage, setSelectedImage] = useState('')

    const save = useCallback(() => {
        const refactor = sku.map((el, key) => (key === index ? {
            ...el,
            image: selectedImage
        } : el))
        updateState("sku", refactor)
        close()
    }, [index, selectedImage, sku])

    useEffect(() => image && setSelectedImage(image), [image])

    return (
        <AppModal title='Variant Cover' size="4xl" close={close} open={open}>
            <VStack align="stretch" spacing="40px">
                <SimpleGrid
                    columns={4}
                    spacing={6}
                    height={"400px"}
                    overflowY={"auto"}
                    paddingRight={media.length > 4 ? 2 : 0}
                    sx={{ "&::-webkit-scrollbar-track": { bgColor: "#1c1c1c" } }}
                >
                    {media.length && media.map((img: any, key: number) => (
                        <Box
                            key={key}
                            height={"200px"}
                            border={`4px solid ${selectedImage === img.url ? '#2BCFA1' : 'transparent'}`}
                            borderRadius="8px"
                            overflow="hidden"
                        >
                            <AppImage
                                src={img.url}
                                width={"100%"}
                                height={"100%"}
                                objectFit={"cover"}
                                cursor="pointer"
                                onClick={() => setSelectedImage(img.url)}
                            />
                        </Box>
                    ))}
                </SimpleGrid>
                <Flex justifyContent="space-between">
                    <BasicButton variant='outline' onClick={close}>Discard</BasicButton>
                    <BasicButton onClick={save}>Save</BasicButton>
                </Flex>
            </VStack>
        </AppModal>
    )
}

export default CoversModal