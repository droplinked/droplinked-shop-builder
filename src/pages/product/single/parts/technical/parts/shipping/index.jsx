import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import InputFieldComponent from 'components/shared/input-field-component/InputFieldComponent'
import { OptionComponent, SelectComponent } from 'modals/rule-modal/RuleModal-style'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import SkeletonProduct from '../../../skeleton/SkeletonProduct'

function Shipping() {
    const { state: { shippingPrice, shippingType }, methods: { updateState } } = useContext(productContext)

    return (
        <VStack align={"stretch"} width={"100%"}>
            <Box>
                <Text fontSize={"16px"} color="#FFF">Shipping</Text>
            </Box>
            <SkeletonProduct>
                <HStack>
                    <SelectComponent value={shippingType} onChange={(e) => updateState('shippingType', e.target.value)}>
                        <OptionComponent value={"EASY_POST"}>Easy post</OptionComponent>
                        <OptionComponent value={"CUSTOM"}>Custom</OptionComponent>
                    </SelectComponent>

                    {shippingType === "CUSTOM" && (
                        <InputFieldComponent
                            type="number"
                            placeholder="Shipping price"
                            value={shippingPrice}
                            onChange={(e) => parseInt(e.target.value) >= 0 && updateState("shippingPrice", e.target.value ? parseFloat(e.target.value) : '')}
                        />
                    )}
                </HStack>
            </SkeletonProduct>
        </VStack>
    )
}

export default Shipping