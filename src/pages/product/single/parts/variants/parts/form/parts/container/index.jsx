import { Box, Flex, HStack, Select, Text, VStack } from '@chakra-ui/react'
import React, { useCallback, useContext, useMemo } from 'react'
import VariantMakeFormStyles from './styles-component'
import classes from './style.module.scss'
import VariantMakeFormModel from './model'
import TextBoxVariantForm from './parts/textbox/textBoxVariantForm'
import variontFormContext from '../../context'
import ErrorLabel from 'components/shared/form/errorLabel/errorLabel'

function VariantMakeForm({ caption, property }) {
    const { form, state } = useContext(variontFormContext)
    const { GrayLine } = VariantMakeFormStyles
    const { defaultValueProperty } = VariantMakeFormModel

    // Get default value dynamic property field
    const getDefaultValue = useCallback((caption) => {
        if (!state || !Object.keys(state).length) return ''
        return defaultValueProperty({ caption, property: state.options })
    }, [state, property])

    const content = useMemo(() => {
        if (property) {
            return (
                <VStack align={"stretch"}>
                    <Box>
                        <Select
                            className={classes.select}
                            variant='unstyled'
                            onChange={(e) => form.setFieldValue(caption, e.target.value)}
                            value={form.values[caption]}
                            placeholder='Select option'
                            border={"1px solid"}
                            borderColor={form.errors[caption] ? "red.200" : "transparent"}
                        >
                            {property.items.map((el, key) => (
                                <option key={key} id={property.value} value={el.value}>{el.value}</option>
                            ))}
                        </Select>
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
                            <Text ml="12px" fontSize="20px" fontWeight="500" tiny color="darkGray">
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
            <Box width={"30%"}><Text fontSize={"larger"}>{caption}</Text></Box>
            <Box width={"70%"}>{content}</Box>
        </HStack>
    )
}

export default VariantMakeForm