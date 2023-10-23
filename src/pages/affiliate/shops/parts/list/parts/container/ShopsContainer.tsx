import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import React from 'react'
import ShopsMore from './parts/more/ShopsMore'
import ShopsProfile from '../../../../../parts/pofile/ShopsProfile'
import ShopsProduct from './parts/products/ShopsProduct'
import { shopsContainerContext } from './context'
import AppTypography from 'components/common/typography/AppTypography'
import BasicButton from 'components/common/BasicButton/BasicButton'

interface Iprops {
    shop: any
}

function ShopsContainer({ shop }: Iprops) {
    return (
        <shopsContainerContext.Provider value={{ shop }}>
            <VStack align="stretch" backgroundColor="#141414" spacing="24px" borderRadius="8px" padding="24px">
                <Flex justifyContent="space-between">
                    <Flex gap="18px">
                        <Image src={shop?.logo} width="32px" height="32px" borderRadius="100%" />
                        <AppTypography size="14px" color="#2BCFA1">{shop?.name}</AppTypography>
                    </Flex>
                    <BasicButton sizes='medium'>Follow</BasicButton>
                </Flex>
                <Flex gap={[3, 5]}>
                    <Box width={"85%"}><ShopsProduct /></Box>
                    {shop.products.length >= 6 && <Box width={"15%"}><ShopsMore /></Box>}
                </Flex>
            </VStack>
        </shopsContainerContext.Provider>
    )
}

export default ShopsContainer