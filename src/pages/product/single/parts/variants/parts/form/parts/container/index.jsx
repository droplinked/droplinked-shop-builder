import { Box, Flex, HStack, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import VariantMakeFormStyles from './styles-component'

function VariantMakeForm({ caption, form }) {
    const { FieldInput, TinyInput, GrayLine } = VariantMakeFormStyles

    const content = useMemo(() => {
        switch (caption) {
            case "Price":
                return (
                    <InputGroup>
                        <FieldInput bg="mainLayer"
                            {...form("price", { required: true })}
                            width={"100%"}
                            placeholder="Price"
                            type="number" // onChange={changePrice} // value={sku.price}
                        />
                        <InputRightElement h="100%" width="10%" children={
                            <Flex px={6} align="center" h="100%" borderLeft="1px solid" borderColor="line" color="lightGray">ETH</Flex>
                        }
                        />
                    </InputGroup>
                )
                break;

            case "Quantity":
                return (
                    <FieldInput bg="mainLayer"
                        width={"100%"}
                        {...form("quantity", { required: true })}
                        placeholder="Quantity"
                        type="number"
                    // onChange={changePrice}
                    // value={sku.price}
                    />
                )
                break;

            case "External ID":
                return (
                    <FieldInput
                        bg="mainLayer"
                        width={"100%"}
                        {...form("externalID", { required: true, })}
                        placeholder="External ID"
                        type="number"
                    // onChange={changePrice} 
                    // value={sku.price}
                    />
                )
                break;

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
                                {...form("length", { required: true })}
                            // onChange={changeLength}
                            // value={sku.dimensions.length}
                            />
                            <GrayLine />
                            <TinyInput
                                placeholder="Height"
                                {...form("height", { required: true })}
                                type="number"
                            // onChange={changeHeight}
                            // value={sku.dimensions.height}
                            />
                            <GrayLine />
                            <TinyInput
                                placeholder="Width"
                                {...form("width", { required: true })}
                                type="number"
                            // onChange={changeWidth}
                            // value={sku.dimensions.width}
                            />
                            <GrayLine />
                            <TinyInput
                                placeholder="Weight"
                                {...form("weight", { required: true })}
                                type="number"
                            // onChange={changeWeight}
                            // value={sku.weight}
                            />
                        </Flex>
                        <Text ml="12px" fontSize="20px" fontWeight="500" color="darkGray">
                            inch/oz
                        </Text>
                    </HStack>
                )
                break;

            default:
                <span>n</span>
                break;
        }
    }, [caption])
    return (
        <HStack>
            <Box width={"30%"}><Text fontSize={"larger"}>{caption}</Text></Box>
            <Box width={"70%"}>{content}</Box>
        </HStack>
    )
}

export default VariantMakeForm