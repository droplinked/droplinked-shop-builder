import { Box, Flex, HStack, InputGroup, InputRightElement, Select, Text } from '@chakra-ui/react'
import React, { useCallback, useMemo } from 'react'
import VariantMakeFormStyles from './styles-component'
import classes from './style.module.scss'
import VariantMakeFormModel from './model'

function VariantMakeForm({ caption, form, property, state }) {
    const { FieldInput, TinyInput, GrayLine } = VariantMakeFormStyles
    const { defaultValueProperty } = VariantMakeFormModel

    // Get default value dynamic property field
    const getDefaultValue = useCallback((caption) => {
        if (!state || !Object.keys(state).length) return ''
        return defaultValueProperty({ caption, property: state.options })
    }, [state, property])

    const content = useMemo(() => {
        if (property) {
            return (
                <Select
                    className={classes.select}
                    variant='unstyled'
                    {...form(`properties[${caption}]`)}
                    defaultValue={getDefaultValue(caption)}
                    placeholder='Select option'
                >
                    {property.items.map((el, key) => (
                        <option key={key} id={property.value} value={el.value}>{el.value}</option>
                    ))}
                </Select>
            )
        }

        switch (caption) {
            case "Price":
                return (
                    <InputGroup>
                        <FieldInput bg="mainLayer"
                            {...form("price")}
                            width={"100%"}
                            defaultValue={state?.price}
                            placeholder="Price"
                            type="number"
                        />
                        <InputRightElement h="100%" width="10%" children={
                            <Flex px={6} align="center" h="100%" borderLeft="1px solid" borderColor="line" color="lightGray">ETH</Flex>
                        }
                        />
                    </InputGroup>
                )

            case "Quantity":
                return (
                    <FieldInput bg="mainLayer"
                        width={"100%"}
                        {...form("quantity")}
                        defaultValue={state?.quantity}
                        placeholder="Quantity"
                        type="number"
                    />
                )

            case "External ID":
                return (
                    <FieldInput
                        bg="mainLayer"
                        width={"100%"}
                        {...form("externalID")}
                        defaultValue={state?.externalID}
                        placeholder="External ID"
                        type="text"
                    />
                )

            case "Delivery boxing":
                return (
                    <HStack alignItems="center">
                        <Flex
                            w="100%"
                            bg="mainLayer"
                            p="8px 24px"
                            borderRadius="8px"
                            justifyContent="space-between"
                            alignItems="center"
                            h="100%"
                        >
                            <TinyInput
                                placeholder="Length"
                                type="number"
                                {...form("length")}
                                defaultValue={state?.dimensions?.length}
                            />
                            <GrayLine />
                            <TinyInput
                                placeholder="Height"
                                {...form("height")}
                                type="number"
                                defaultValue={state?.dimensions?.height}
                            />
                            <GrayLine />
                            <TinyInput
                                placeholder="Width"
                                {...form("width")}
                                type="number"
                                defaultValue={state?.dimensions?.width}
                            />
                            <GrayLine />
                            <TinyInput
                                placeholder="Weight"
                                {...form("weight")}
                                type="number"
                                defaultValue={state?.weight}
                            />
                        </Flex>
                        <Text ml="12px" fontSize="20px" fontWeight="500" color="darkGray">
                            inch/oz
                        </Text>
                    </HStack>
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