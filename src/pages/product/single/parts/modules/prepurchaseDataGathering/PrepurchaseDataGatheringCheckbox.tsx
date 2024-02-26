import { Box, Flex, VStack } from '@chakra-ui/react'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'

function PrepurchaseDataGatheringCheckbox() {
    const { state: { pre_purchase_data_fetch }, methods: { updateState } } = useContext(productContext)

    return (
        <Flex gap={3}>
            <Box><AppSwitch onChange={(e) => updateState('pre_purchase_data_fetch', e.target.checked)} isChecked={pre_purchase_data_fetch} /></Box>
            <VStack align='stretch' color="#C2C2C2" spacing={1}>
                <AppTypography fontSize='14px' fontWeight='bold'>pre-purchase data gathering</AppTypography>
                <AppTypography fontSize='14px'>Write a question to gather comment or specific information from customers before purchase!</AppTypography>
            </VStack>
        </Flex>
    )
}

export default PrepurchaseDataGatheringCheckbox