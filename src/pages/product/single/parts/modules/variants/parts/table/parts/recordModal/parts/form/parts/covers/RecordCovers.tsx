import { Box, Image, SimpleGrid, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from 'react'
import recordContext from '../../../../context'

function RecordCovers() {
    const { product, updateState, state: { image } } = useContext(recordContext)

    return (
        <VStack align="stretch">
            <AppTypography fontSize="16px">NFT Token Cover</AppTypography>
            <SimpleGrid columns={5} spacing="13px">
                {product?.media ? product?.media.map((el: any, key: number) => (
                    <Box borderRadius="11px" cursor="pointer" onClick={() => updateState('image', el.url)} overflow="hidden" border={`5px solid ${image === el.url ? '#2BCFA1' : 'transparent'}`} key={key}><Image src={el.thumbnail} width="100%" /></Box>
                )) : null}
            </SimpleGrid>
        </VStack>
    )
}

export default RecordCovers