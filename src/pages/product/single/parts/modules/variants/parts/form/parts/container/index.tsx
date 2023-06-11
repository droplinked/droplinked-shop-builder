import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useMemo } from 'react'
import TextBoxVariantForm from './parts/textbox/textBoxVariantForm'
import variontFormContext from '../../context'
import ErrorLabel from 'components/common/form/errorLabel/errorLabel'
import AppTypography from 'components/common/typography/AppTypography'
import AppSelectBox from 'components/common/form/select/AppSelectBox'

function VariantMakeForm({ caption, property }) {
    const { form } = useContext(variontFormContext)

    const content = useMemo(() => {
        if (property) {
            return (
                <VStack align={"stretch"}>
                    <Box>
                        <AppSelectBox
                            name={caption}
                            onChange={(e) => form.setFieldValue(caption, e.target.value)}
                            value={form.values[caption]}
                            style={{ backgroundColor: "#1c1c1c" }}
                            {...!form.values[caption] && { placeholder: "Select Property" }}
                            items={property.items.map((el: any) => ({
                                value: el.value,
                                caption: el.value
                            }))}
                            border={"1px solid"}
                            borderColor={form.errors[caption] ? "red.200" : "transparent"}
                        />
                    </Box>
                    {form.errors[caption] ? <Box><ErrorLabel message={form.errors[caption]} /></Box> : null}
                </VStack>
            )
        }

        switch (caption) {
            case "Price":
                return <TextBoxVariantForm field={"price"} />

            case "Quantity":
                return <TextBoxVariantForm field={"quantity"} />

            case "External ID":
                return <TextBoxVariantForm field={"externalID"} />

            case "Delivery boxing":
                return (
                    <VStack align={"stretch"}>
                        <HStack alignItems="center">
                            <HStack
                                w="100%"
                                bg="mainLayer"
                                borderRadius="8px"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <TextBoxVariantForm tiny field={"length"} />
                                <TextBoxVariantForm tiny field={"height"} />
                                <TextBoxVariantForm tiny field={"width"} />
                                <TextBoxVariantForm tiny field={"weight"} />
                            </HStack>
                            <Text ml="12px" fontSize="14px" fontWeight="500" color="darkGray">
                                inch/oz
                            </Text>
                        </HStack>
                    </VStack>
                )

            default:
                <span></span>
                break;
        }
    }, [caption, property, form])
    return (
        <HStack>
            <Box width={"30%"}><AppTypography size='14px'>{caption}</AppTypography></Box>
            <Box width={"70%"}>{content}</Box>
        </HStack>
    )
}

export default VariantMakeForm