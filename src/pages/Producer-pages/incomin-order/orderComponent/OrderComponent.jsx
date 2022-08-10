import { Text, Box, Flex, useDisclosure, Stack, Skeleton, Image, keyframes } from "@chakra-ui/react"
import { useOrder } from "../../../../context/order/OrdersContext"
import { convetToCustomFormat } from "../../../../utils/date.utils/convertDate"
import { ORDER_TYPES } from "../../../../constant/order.types"

import OrderModal from "../OrderModal/OrderModal"

const animationKeyframes = keyframes`
0% { color: #8053ff; }
40% { color: #fff; }
80% { color: #8053ff; }
100% { color: #8053ff; }
`;

//const animation = `${animationKeyframes} 1.5s linear infinite`;
const animation = `${animationKeyframes} 2s ease infinite`;


export default function OrderComponent({ order }) {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const { seenOrder } = useOrder()



    let totalQuantity = order.items.map(item => item.quantity).reduce((total, quan) => { return total + quan }, 0)


    const openOrder = () => {
        if (!order.seenByProducer) seenOrder(order._id)
        onOpen()
    }
   

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
            case ORDER_TYPES.REFUNDED:
                return "Canceled"
            case ORDER_TYPES.WAITING_FOR_PAYMENT:
                return "Waiting for payment"
            default:
                return ""
        }
    }

    return (
        <Box
        
            border='3px solid #d4d4d486'
            borderRadius='30px'
            p='15px 20px'
            cursor='pointer'
            _hover={{
                border:'3px solid #8053ff'
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
                            Date: {convetToCustomFormat(order.createdAt)}
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
                        Quantity: {totalQuantity} item
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
                            animation={(order.status == ORDER_TYPES.WAITING_FOR_CONFIRMATION) && animation}
                        >
                            {statusText()}
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