import { Box, Flex, SimpleGrid, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import AppImage from 'components/common/image/AppImage'
import AppModal, { IAppModal } from 'components/common/modal/AppModal'
import { productContext } from 'pages/product/single/context'
import React from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

interface IProps extends IAppModal {
    image: string
    index: number
}

function CoversModal({ close, open, image, index }: IProps) {
    const { state: { media, sku }, methods: { updateState } } = useContext(productContext)
    const [Image, setImage] = useState('')

    useEffect(() => image && setImage(image), [image])

    const setImg = useCallback((value: string) => setImage(value), [])

    const save = useCallback(() => {
        const refactor = sku.map((el, key) => (key === index ? {
            ...el,
            image: Image
        } : el))
        updateState("sku", refactor)
        close()
    }, [index, Image, sku])

    return (
        <AppModal title='Variant Cover' size="4xl" close={close} open={open}>
            <VStack align="stretch" spacing="40px">
                <SimpleGrid columns={4} spacing={6}>
                    {media.length && media.map((el: any, key: number) => (
                        <Box key={key} border={`4px solid ${Image === el.url ? '#2BCFA1' : 'transparent'}`} borderRadius="8px" overflow="hidden"><AppImage cursor="pointer" onClick={() => setImg(el.url)} src={el.url} width="100%" /></Box>
                    ))}
                </SimpleGrid>
                <Flex justifyContent="space-between">
                    <Box><BasicButton variant='outline' onClick={close}>Discard</BasicButton></Box>
                    <Box><BasicButton onClick={save}>Save</BasicButton></Box>
                </Flex>
            </VStack>
        </AppModal>
    )
}

export default CoversModal