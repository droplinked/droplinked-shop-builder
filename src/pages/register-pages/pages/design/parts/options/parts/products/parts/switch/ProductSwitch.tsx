import { HStack, VStack } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function ProductSwitch() {
    return (
        <VStack align="stretch" spacing="24px">
            <HStack spacing="15px" alignItems="flex-start">
                <AppSwitch />
                <VStack align="stretch" spacing="0">
                    <AppTypography size="14px" color="#C2C2C2" weight='bolder'>Activate list title</AppTypography>
                    <AppTypography size="14px" color="#C2C2C2">???</AppTypography>
                </VStack>
            </HStack>
            <AppInput name='' placeholder='Example' />
        </VStack>
    )
}

export default ProductSwitch