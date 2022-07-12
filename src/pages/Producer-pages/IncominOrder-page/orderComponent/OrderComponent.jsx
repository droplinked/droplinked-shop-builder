import { Text, Box, Flex, useDisclosure, Stack, Skeleton, Image } from "@chakra-ui/react"
import { useState, useEffect } from "react"
//import { AiOutlineFieldTime } from "react-icons/ai";
import { useOrder } from "../../../../sevices/hooks/useOrders"
import { BasicURL } from "../../../../sevices/functoinal-service/CallApiService"

import axios from 'axios'
import OrderModal from "../OrderModal/OrderModal"

export default function OrderComponent({ order }) {

    const [orderProducts, setOrderProducts] = useState([])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { seenOrder } = useOrder()


    useEffect(async () => {
        let productsId = order.items.map(item => item.productID)
        let products = await getProductsArray(productsId)
        setOrderProducts(products)
    }, [])

    // calculaate date of order
    const getOrderTime = () => {
        let timeOfOrder = new Date(order.createdAt).getTime()
        let now = new Date().getTime()
        let time = (now - timeOfOrder) / (1000 * 3600 * 24);

        if (time > 1) {
            return `${parseInt(time)} day`
        } else {
            return `${parseInt(time * 24)} hours`
        }
    }

    let totalQuantity = order.items.map(item => item.quantity).reduce((total, quan) => { return total + quan }, 0)


    const openOrder = () => {
        if (!order.seenByProducer) seenOrder(order._id)
        onOpen()
    }

    const getProductsArray = async (productsId) => {
        let promises = [];
        for (let i = 0; i < productsId.length; i++) {
            promises.push(axios.get(`${BasicURL}/product/${productsId[i]}`));
        }
        let results = await Promise.all(promises);
        results = results.map((e) => e.data.data);

        return results
    }


    return (
        <Box
            border='1px'
            borderColor={(order.seenByProducer) ? "#aaa" : "#8053ff"}
            borderRadius='16px'
            p='15px 20px'
        >
            {(orderProducts.length > 0)
                ?
                <>
                    <Flex justifyContent='space-between'  >
                        <Text
                            color='#fff'
                            fontSize={{ base: "12px", md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "10px", md: '10px' }}
                        >
                            Order time : {getOrderTime()} ago
                        </Text>

                        {(!order.seenByProducer) &&
                            <Text
                                color='#8053ff'
                                fontSize={{ base: "12px", md: '16px' }}
                                fontWeight='600'
                                mb={{ base: "10px", md: '20px' }}
                            >
                                Unseen
                            </Text>
                        }

                    </Flex>

                    <Text
                        color='#fff'
                        fontSize={{ base: "12px", md: '14px' }}
                        fontWeight='600'
                        mb={{ base: "10px", md: '20px' }}
                    >
                        Merch quantity : {totalQuantity} Merch
                    </Text>

                    <Flex
                    mb='10px'
                    >
                        {orderProducts.map((product, i) => {
                            return <Image
                                w={{base:'60px' , md:"90px"}}
                                h={{base:'60px' , md:"90px"}}
                                borderRadius="8px"
                                mr='20px'
                                src={product.media[0].url} />
                        })}
                    </Flex>

                    <Flex
                        w='100%'
                        justifyContent='space-between'
                    >
                        <Text
                            color='#fff'
                            fontSize={{ base: "20px", md: '26px' }}
                            fontWeight='600'
                        >
                            Total price : $ {order.totalPrice}
                        </Text>
                        <Text
                            color='#fff'
                            fontSize={{ base: "16px", md: '20px' }}
                            fontWeight='600'
                            my="auto"
                            h="100%"
                            px={{ base: '10px', md: "20px" }}
                            cursor='pointer'
                            _hover={{
                                color: '#8053ff'
                            }}
                            onClick={openOrder}
                        >
                            View order
                        </Text>
                    </Flex>
                </>
                :
                <Stack>
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
            }
            {(orderProducts.length > 0) &&
                < OrderModal ProducList={orderProducts} order={order} isOpen={isOpen} onClose={onClose} />
            }
        </Box>
    )
}