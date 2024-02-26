import { Box, Flex, VStack } from '@chakra-ui/react'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSwitch from 'components/common/swich'
import AppTypography from 'components/common/typography/AppTypography'
import { productContext } from 'pages/product/single/context'
import React, { useContext, useState } from 'react'

function PrepurchaseDataGathering() {
    const { state: { pre_purchase_data_fetch }, methods: { updateState } } = useContext(productContext)
    const [visibleInput, setInputVisibility] = useState(false)

    return (
        <Flex direction={"column"} gap={"60px"}>
            <Flex gap={3}>
                <Box><AppSwitch onChange={(e) => setInputVisibility(e.target.checked)} isChecked={visibleInput} /></Box>
                <VStack align='stretch' color="#C2C2C2" spacing={1}>
                    <AppTypography fontSize='14px' fontWeight='bold'>pre-purchase data gathering</AppTypography>
                    <AppTypography fontSize='14px'>Write a question to gather comment or specific information from customers before purchase!</AppTypography>
                </VStack>
            </Flex>

            {visibleInput &&
                <AppInput
                    name="pre-purchase data gathering"
                    placeholder="christmas cat mug"
                    value={pre_purchase_data_fetch.title}
                    onChange={({ target: { value } }) => updateState("pre_purchase_data_fetch", { title: value, active: !!value })}
                />
            }
        </Flex>
    )
}

export default PrepurchaseDataGathering