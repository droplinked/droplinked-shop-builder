import { Text, Box, Flex, useDisclosure, } from "@chakra-ui/react"
//import { AiOutlineFieldTime } from "react-icons/ai";
import { useOrder } from "../../../../sevices/hooks/useOrders"

import OrderModal from "../OrderModal/OrderModal"

export default function OrderComponent({ order }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { seenOrder } = useOrder()

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

    let totalMerchs = order.items.map(item => item.quantity).reduce((total, quan) => { return total + quan }, 0)


    const openOrder = () => {
        if(!order.seenByProducer)seenOrder(order._id)
        onOpen()
    }


    return (
        <Box
            border='1px'
            borderColor={(order.seenByProducer) ? "#aaa" : "#8053ff"}
            borderRadius='16px'
            p='15px 20px'
        >
            <Flex justifyContent='space-between'  >
                <Text
                    color='#fff'
                    fontSize={{ base: "12px", md: '14px' }}
                    fontWeight='600'

                    mb={{ base: "10px", md: '20px' }}
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
                Merch quantity : {totalMerchs} Merch
            </Text>
            <Flex
                w='100%'
                justifyContent='space-between'
            >
                <Text
                    color='#fff'
                    fontSize={{ base: "20px", md: '26px' }}
                    fontWeight='600'
                >
                    Total price : $ ?
                </Text>
                <Text
                    color='#fff'
                    fontSize={{ base: "16px", md: '20px' }}
                    fontWeight='600'
                    my="auto"
                    h="100%"
                    px={{ base: '10px', md: "20px" }}
                    cursor='pointer'
                    borderBottom='1px'
                    borderColor={(order.seenByProducer) ? "#aaa" : "#8053ff"}
                    _hover={{
                        border: '1px',
                        borderColor: '#8053ff',
                        borderRadius: '8px',
                        color: '#8053ff'
                    }}
                    onClick={openOrder}
                >
                    View order
                </Text>
            </Flex>

            <OrderModal isOpen={isOpen} onClose={onClose} />

        </Box>
    )
}