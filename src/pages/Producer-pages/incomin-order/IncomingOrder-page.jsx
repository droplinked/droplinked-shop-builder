import { Text, Box , Flex } from "@chakra-ui/react"
import { useOrder } from "../../../context/order/OrdersContext"
import { ORDER_TYPES } from "../../../constant/order.types"
import { useMemo, useState } from "react"

import Order from "../../../components/shared/Order/Order-component"
import Dropdown from "../../../components/shared/Dropdown/Dropdown-component"

export default function IncomingOrderPage() {

    const [filter, setFilter] = useState("All")
    const { orders } = useOrder()

    const setTypesArray = () => {
        const arr = [
            { id: "All", value: "All" },
            { id: ORDER_TYPES.WAITING_FOR_CONFIRMATION, value: "Waiting for confirmation" },,
            { id: ORDER_TYPES.PROCESSING, value: "Processing" },
            { id: ORDER_TYPES.SENT, value: "Sent" },
            { id: ORDER_TYPES.CANCELED, value: "Canceled" },
        ]
        return arr
    }

    let typesArray = useMemo(() => setTypesArray(), []);


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
                <Flex w='100%' justifyContent='center'>
                <Box w={{base:'100%' , md:'40%'}} mb='40px'>
                    <Dropdown
                        value={filter}
                        pairArray={typesArray}
                        placeholder={filter}
                        change={(e) => { setFilter(e.target.value) }}
                    />
                </Box>
                </Flex>

                {(filter == "All")
                    ?
                    <>
                        {orders.map((order, i) => {
                            if (order.status == ORDER_TYPES.WAITING_FOR_CONFIRMATION)
                                return (
                                    <Box key={i} mb='30px'>
                                        <Order order={order} />
                                    </Box>
                                )
                        })}
                        {orders.map((order, i) => {
                            if ((order.status != (ORDER_TYPES.WAITING_FOR_CONFIRMATION) && order.status != (ORDER_TYPES.WAITING_FOR_PAYMENT)))
                                return (
                                    <Box key={i} mb='30px'>
                                        <Order order={order} />
                                    </Box>
                                )
                        })}
                    </>
                    :
                    <>
                        {orders.map((order, i) => {
                            if (order.status == ORDER_TYPES.REFUNDED) {
                                if (filter == ORDER_TYPES.CANCELED)
                                    return <Order key={i} order={order} />
                            } else {
                                if (order.status == filter)
                                    return <Order key={i} order={order} />
                            }
                        })}
                    </>
                }



            </Box>
        </Box>
    )
}