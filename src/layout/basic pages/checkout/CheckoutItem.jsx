import { Box, Flex, Text, Image, ButtonGroup, HStack, Button ,Input } from "@chakra-ui/react"
// import {  AddIcon, MinusIcon } from '@chakra-ui/icons'
import { AiFillCloseCircle } from "react-icons/ai";

export default function CheckoutItem({ product }) {



    console.log(product)
    return (
        <Flex
            w="100%"
            p='5px'
            bgColor="#333"
            h="80px"
            mb="10px"
            justifyContent="space-between"
        >

            <Flex
                w="60%"
            >
                <Image
                    src={product.product.media[0].url}
                    alt='product image'
                    mr="10px"
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
                </Flex>
            </Flex>

            <Flex w="40%" justifyContent="space-between">
                <Flex
                    h="100%"
                    alignItems="center"
                >
                    <ButtonGroup w="100" isAttached variant='outline'>
                        <Button
                            color="#fff"
                            _hover={{ bgColor: "none", borderColor: "#8053ff", color: "#8053ff" }}
                        >+</Button>
                        <Button
                            color="#fff"
                            _hover={{ bgColor: "none", borderColor: "#fff" }}
                        >{product.quantity}</Button>
                        <Button
                            color="#fff"
                            _hover={{ bgColor: "none", borderColor: "#8053ff", color: "#8053ff" }}
                        >+</Button>
                    </ButtonGroup> 
                </Flex>
                <Flex
                    h="100%"
                    alignItems="center"
                    cursor={"pointer"}
                >
                    <AiFillCloseCircle
                        color="#ea5050"
                        size="25px"
                    />
                </Flex>
            </Flex>

        </Flex>
    )
}