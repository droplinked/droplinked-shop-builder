import { Box, HStack, Select, Text, VStack } from '@chakra-ui/react'
import React, { useContext, useMemo } from 'react'
import classes from './style.module.scss'
import TextBoxVariantForm from './parts/textbox/textBoxVariantForm'
import variontFormContext from '../../context'
import ErrorLabel from 'components/shared/form/errorLabel/errorLabel'
import AppTypography from 'components/shared/typography/AppTypography'
import AppSelectBox from 'components/shared/form/select/AppSelectBox'

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
                            placeholder='Select option'
                            style={{ backgroundColor: "#1c1c1c" }}
                            
                            items={property.items.map(el => ({
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
                return <TextBoxVariantForm placeholder="Price" field={"price"} />

            case "Quantity":
                return <TextBoxVariantForm placeholder="Quantity" field={"quantity"} />

            case "External ID":
                return <TextBoxVariantForm placeholder="External ID" field={"externalID"} />

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
                                spa
                            >
                                <TextBoxVariantForm placeholder="Length" tiny field={"length"} />
                                <TextBoxVariantForm placeholder="Height" tiny field={"height"} />
                                <TextBoxVariantForm placeholder="Width" tiny field={"width"} />
                                <TextBoxVariantForm placeholder="Weight" tiny field={"weight"} />
                            </HStack>
                            <Text ml="12px" fontSize="14px" fontWeight="500" tiny color="darkGray">
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