import { Text, Box } from "@chakra-ui/react"
import { useOrder } from "../../../context/order/OrdersContext"
import { ORDER_TYPES } from "../../../constant/order.types"
import { useMemo, useState } from "react"

import OrderComponent from "./orderComponent/OrderComponent"
import Order from "../../../components/shared/Order/Order-component"
import Dropdown from "../../../components/shared/Dropdown/Dropdown-component"

export default function IncomingOrderPage() {

    const [filter, setFilter] = useState("All")
    const { orders } = useOrder()

    const setTypesArray = () => {
        let arr = []
        for (const type in ORDER_TYPES)
            arr.push({ id: ORDER_TYPES[type], value: ORDER_TYPES[type] })
        arr.push({ id: "All", value: "All" })
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
                <Box w='40%' mb='40px'>
                    <Dropdown
                        value={filter}
                        pairArray={typesArray}
                        placeholder={'Filter'}
                        change={(e) => { setFilter(e.target.value) }}
                    />
                </Box>

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
                            if (order.status == filter)
                                return <Order key={i} order={order} />
                        })}
                    </>
                }



            </Box>
        </Box>
    )
}