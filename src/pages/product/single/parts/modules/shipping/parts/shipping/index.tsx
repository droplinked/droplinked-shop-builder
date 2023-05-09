import { Box, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react'
import FieldLabel from 'components/shared/form/fieldLabel/FieldLabel'
import AppInput from 'components/shared/form/textbox/AppInput'
import AppSkeleton from 'components/shared/skeleton/AppSkeleton'
import { productContext } from 'pages/product/single/context'
import { BlackBox, TextLabelBold } from 'pages/register-pages/RegisterPages-style'
import React, { useContext } from 'react'

function Shipping() {
    const { state: { shippingPrice, shippingType }, methods: { updateState }, loading } = useContext(productContext)

    return (
        <VStack align={"stretch"} width={"100%"} spacing={8}>
            <VStack align={"stretch"}>
                <FieldLabel isRequired label='Shipping Method' />
                <RadioGroup
                    value={shippingType}
                    onChange={(value) => updateState('shippingType', value)}
                >
                    <VStack align={"stretch"}>
                        <Box>
                            <AppSkeleton isLoaded={loading}>
                                <BlackBox padding={5}>
                                    <Radio size='md' value='CUSTOM' alignItems="flex-start" colorScheme='green'>
                                        <VStack align='stretch' paddingLeft={2} spacing={2}>
                                            <TextLabelBold>Self Managed</TextLabelBold>
                                            <Text fontSize="sm" color="lightGray">
                                                Order will be managed by ma. <a href='' target={"_blank"}>Learn more</a>
                                            </Text>
                                        </VStack>
                                    </Radio>
                                </BlackBox>
                            </AppSkeleton>
                        </Box>
                        <Box>
                            <AppSkeleton isLoaded={loading}>
                                <BlackBox padding={5}>
                                    <Radio size='md' value='EASY_POST' alignItems="flex-start" colorScheme='green'>
                                        <VStack align='stretch' paddingLeft={2} spacing={2}>
                                            <TextLabelBold>EASY Post</TextLabelBold>
                                            <Text fontSize="sm" color="lightGray">
                                                EASY post will help you to deliver your product in the safe and fastest way possible.
                                            </Text>
                                        </VStack>
                                    </Radio>
                                </BlackBox>
                            </AppSkeleton>
                        </Box>
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
                    placeholder="$ 0"
                    value={shippingPrice}
                    onChange={(e) => parseFloat(e.target.value) && updateState("shippingPrice", e.target.value ? parseFloat(e.target.value) : '')}
                />
            )}
        </VStack>
    )
}

export default Shipping