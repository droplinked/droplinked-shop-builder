import { Text, Box, Flex, useDisclosure, Stack, Skeleton, Image, keyframes } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useOrder } from "../../../../context/order/OrdersContext"
import { getProduct } from "../../../../api/public/Product-api"
import { convetToCustomFormat } from "../../../../utils/date.utils/convertDate"
import { ORDER_TYPES } from "../../../../constant/order.types"

import OrderModal from "../OrderModal/OrderModal"

const animationKeyframes = keyframes`
0% { border:2px solid #8053ff; }
50% { border:2px solid #aaa; }
100% { border:2px solid #8053ff; }
`;

const animation = `${animationKeyframes} 1.5s linear infinite`;

// borderColor={(order.seenByProducer) ? "#aaa" : "#8053ff"}

export default function OrderComponent({ order }) {



   // const [orderProducts, setOrderProducts] = useState([])

    const { isOpen, onOpen, onClose } = useDisclosure()
    const { seenOrder } = useOrder()


    // useEffect(async () => {
    //     let productsId = order.items.map(item => item.productID)
    //     let products = await getProductsArray(productsId)
    //     setOrderProducts(products)
    // }, [])


    // calculaate date of order
    // const getOrderTime = () => {
    //     let timeOfOrder = new Date(order.createdAt).getTime()
    //     let now = new Date().getTime()
    //     let time = (now - timeOfOrder) / (1000 * 3600 * 24);

    //     if (time > 1) {
    //         return `${parseInt(time)} day`
    //     } else {
    //         return `${parseInt(time * 24)} hours`
    //     }
    // }

    let totalQuantity = order.items.map(item => item.quantity).reduce((total, quan) => { return total + quan }, 0)


    const openOrder = () => {
        if (!order.seenByProducer) seenOrder(order._id)
        onOpen()
    }

    // const getProductsArray = async (productsId) => {
    //     let promises = [];
    //     for (let i = 0; i < productsId.length; i++) {
    //         let res = await getProduct(productsId[i])
    //         promises.push(res);
    //     }
    //     return promises
    // }

    const statusText = () => {
        switch (order.status) {
            case ORDER_TYPES.WAITING_FOR_CONFIRMATION:
                return "Waiting for confirmation"
            case ORDER_TYPES.CANCELED:
                return 'Canceled'
            case ORDER_TYPES.SENT:
                return "Sent"
            case ORDER_TYPES.PROCESSING:
                return 'Processing'
            default:
                return ""
        }
    }

    return (
        <Box
            border='2px'
            borderColor='#aaa'
            borderRadius='16px'
            p='15px 20px'
            cursor='pointer'
            animation={(order.status == ORDER_TYPES.WAITING_FOR_CONFIRMATION) && animation}
            _hover={{
                borderColor: '#8053ff'
            }}
            onClick={openOrder}
        >
            {(order.items.length > 0)
                ?
                <>
                    {/* date and total price */}
                    <Flex justifyContent='space-between'  >
                        <Text
                            color='#fff'
                            fontSize={{ base: "12px", md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "10px", md: '10px' }}
                        >
                            Order date: {convetToCustomFormat(order.createdAt)}
                        </Text>
                        <Text
                            color='#fff'
                            fontSize={{ base: "14px", md: '16px' }}
                            fontWeight='600'
                        >
                            Total price: ${order.totalPrice}
                        </Text>
                    </Flex>
                    {/* date and total price */}

                    <Text
                        color='#fff'
                        fontSize={{ base: "12px", md: '14px' }}
                        fontWeight='600'
                        mb={{ base: "10px", md: '20px' }}
                    >
                        Quantity: {totalQuantity} Item
                    </Text>

                    {/* images */}
                    <Flex
                        mb='10px'
                    >
                        {order.items.map((item, i) => {
                            if (i < 4)
                                return <Image
                                    key={i}
                                    w={{ base: '60px', md: "90px" }}
                                    h={{ base: '60px', md: "90px" }}
                                    borderRadius="8px"
                                    mr='20px'
                                    src={item.product.media[0].url} />
                        })}
                    </Flex>
                    {/* images */}

                    {/* status */}
                    <Flex
                        w='100%'
                        justifyContent='space-between'
                    >
                        <Text
                            color='#fff'
                            fontSize={{ base: "12px", md: '18px' }}
                            fontWeight='600'
                            my="auto"
                            h="100%"
                            cursor='pointer'
                            onClick={openOrder}
                        >
                            Status: {statusText()}
                        </Text>
                    </Flex>
                    {/* status */}
                </>
                :
                <Stack>
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
            }
             {(order.items.length > 0) &&
                < OrderModal order={order} isOpen={isOpen} onClose={onClose} />
            } 
        </Box>
    )
}