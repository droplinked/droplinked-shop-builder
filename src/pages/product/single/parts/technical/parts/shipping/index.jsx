import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import AppSelectBox from 'components/shared/form/select/AppSelectBox'
import AppInput from 'components/shared/form/textbox/AppInput'
import InputFieldComponent from 'components/shared/input-field-component/InputFieldComponent'
import { OptionComponent, SelectComponent } from 'modals/rule-modal/RuleModal-style'
import { productContext } from 'pages/product/single/context'
import React, { useContext } from 'react'
import SkeletonProduct from '../../../skeleton/SkeletonProduct'

function Shipping() {
    const { state: { shippingPrice, shippingType }, methods: { updateState }, loading } = useContext(productContext)

    return (
        <VStack align={"stretch"} width={"100%"}>
            <HStack alignItems={"end"}>
                <AppSelectBox
                    label='Shipping'
                    value={shippingType}
                    loading={loading}
                    onChange={(e) => updateState('shippingType', e.target.value)}
                    items={[
                        {
                            caption: "Easy post",
                            value: "EASY_POST"
                        },
                        {
                            caption: "Custom",
                            value: "CUSTOM"
                        }
                    ]}
                />

                {shippingType === "CUSTOM" && (
                    <AppInput
                        type="number"
                        loading={loading}
                        placeholder="Shipping price"
                        value={shippingPrice}
                        onChange={(e) => parseInt(e.target.value) >= 0 && updateState("shippingPrice", e.target.value ? parseFloat(e.target.value) : '')}
                    />
                )}
            </HStack>
        </VStack>
    )
}

export default Shipping