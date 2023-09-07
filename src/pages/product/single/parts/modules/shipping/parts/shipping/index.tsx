import { Box, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/common/form/fieldLabel/FieldLabel'
import AppInput from 'components/common/form/textbox/AppInput'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import { productContext } from 'pages/product/single/context'
import { BlackBox, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useContext } from 'react'

function Shipping() {
    const { state: { shippingPrice, shippingType }, methods: { updateState }, loading } = useContext(productContext)

    const shippings = [
        {
            title: 'Self Managed',
            value: 'CUSTOM',
            description: 'You will handle shipping operations internally.'
        },
        {
            title: 'EASY Post',
            value: 'EASY_POST',
            description: (
                <>
                    EASY Post takes responsibility to deliver your customer orders. <a style={{ color: "#2EC99E" }} href='' target={"_blank"}>Learn more</a>
                </>
            )
        }
    ]

    return (
        <VStack align={"stretch"} width={"100%"} spacing={8}>
            <VStack align={"stretch"}>
                <FieldLabel isRequired label='Shipping Method' />
                <RadioGroup
                    value={shippingType}
                    onChange={(value) => updateState('shippingType', value)}
                >
                    <VStack align={"stretch"}>
                        {shippings.map((el, key) => (
                            <Box key={key}>
                                <AppSkeleton isLoaded={loading}>
                                    <BlackBox padding={5}>
                                        <Radio size='md' value={el.value} alignItems="flex-start" colorScheme='green'>
                                            <VStack align='stretch' paddingLeft={2} spacing={2}>
                                                <TextLabelBold>{el.title}</TextLabelBold>
                                                <Text fontSize="sm" color="lightGray">{el.description}</Text>
                                            </VStack>
                                        </Radio>
                                    </BlackBox>
                                </AppSkeleton>
                            </Box>
                        ))}
                    </VStack>
                </RadioGroup>
            </VStack>
            {shippingType === "CUSTOM" && (
                <AppInput
                    type="number"
                    loading={loading}
                    name="cost"
                    isRequired
                    label='Shipping Cost'
                    placeholder="$ 0.00"
                    value={shippingPrice}
                    onChange={(e) => parseFloat(e.target.value) && updateState("shippingPrice", e.target.value ? parseFloat(e.target.value) : '')}
                />
            )}
        </VStack>
    )
}

export default Shipping