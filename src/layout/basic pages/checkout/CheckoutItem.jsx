import { Box, Flex, Text, Image, ButtonGroup, IconButton, Button, Input, AspectRatio } from "@chakra-ui/react"
// import {  AddIcon, MinusIcon } from '@chakra-ui/icons'
import { AiOutlineDelete } from "react-icons/ai";

export default function CheckoutItem({ product }) {



   // console.log(product)

    return (
        <Flex
            w="100%"
            p='5px'
            bgColor="#333"
            h="auto"
            mb="10px"
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
        >

            <Flex
                w="50%"
                flexDirection="row"
            >
                <Image
                    src={product.product.media[0].url}
                    alt='product image'
                    w="80px"
                    h="80px"
                    mr="20px"
                />
                <Flex
                    flexDirection="column"
                    align="start"
                >
                    <Text
                        color="#fff"
                        fontWeight="600"
                        fontSize={{ base: "16px", md: "18px" }}
                    >
                        {product.product.title}
                    </Text>

                    <Text
                        color="#ddd"
                        fontWeight="500"
                        fontSize={{ base: "14px", md: "13px" }}
                    >
                        {product.product.description}
                    </Text>
                </Flex>

            </Flex>

            <Flex
                w={{base:'100%' , md:"45%"}}
                mr="20px"
                h={{ base: "60px", md: "80px" }}
                alignItems="center"
                justifyContent="space-between">

                <Text
                    color="#fff"
                    fontWeight="600"
                    fontSize="18"
                >
                    $ {product.price}
                </Text>

                <ButtonGroup size="md" isAttached variant='outline'>
                    <IconButton
                        aria-label='delete'
                        icon={<AiOutlineDelete color="#fd4545" size="sm" />}
                        _hover={{ bgColor: "none", borderColor: "#8053ff" }}
                        _focus={{ bgColor: "none", borderColor: "#8053ff" }}
                    //   _active={{bgColor: "none", borderColor: "#8053ff"}}
                    />

                    <Input
                        value={product.quantity}
                        borderRadius="0px"
                        cursor="pointer"
                        w="80px"
                        textAlign="center"
                        color="#fff"
                        fontSize="20px"
                        fontWeight="600"
                        _hover={{ bgColor: "none", borderColor: "#8053ff" }}
                        _focus={{ bgColor: "none", borderColor: "#8053ff" }}

                    />
                    <Button
                        color="#fff"
                        fontSize="20px"
                        fontWeight="600"
                        _hover={{ bgColor: "none", borderColor: "#8053ff" }}
                        _focus={{ bgColor: "none", borderColor: "#8053ff" }}
                    //  _active={{bgColor: "none", borderColor: "#8053ff"}}
                    >Submit</Button>
                </ButtonGroup>

            </Flex>

        </Flex>
    )
}