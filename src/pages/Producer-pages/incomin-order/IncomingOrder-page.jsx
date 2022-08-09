import { Text, Box } from "@chakra-ui/react"
import { useOrder } from "../../../context/order/OrdersContext"

import OrderComponent from "./orderComponent/OrderComponent"

export default function IncomingOrderPage() {

    const { orders } = useOrder()

    return (
        <Box
            w='100%'
            px={{ base: "20px", md: "80px" }}
        >
            <Box
                w='100%'
                maxW='700px'
                m='auto'
            >
                <Text
                    color='white'
                    fontSize={{ base: "30px", md: '40px' }}
                    fontWeight='600'
                    textAlign='center'
                    mb='40px'
                >
                    Incoming orders
                </Text>

                {orders.map((ord, i) => {
                    return (
                        <Box key={i} mb='30px'>
                            <OrderComponent order={ord} />
                        </Box>
                    )
                })}

            </Box>
        </Box>
    )
}