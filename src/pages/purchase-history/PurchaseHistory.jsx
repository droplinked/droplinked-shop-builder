import { useToasty } from "../../context/toastify/ToastContext"
import { useEffect, useState, useMemo } from "react";
import { Text, Box , Flex } from "@chakra-ui/react"
import { getOrdersHistory } from '../../api/base-user/OrderHistory-api'
import { sortArrayBaseCreateTime } from "../../utils/sort.utils/sort.utils"
import { ORDER_TYPES } from "../../constant/order.types"
import { mergeWaitingOrders } from "./purchase-order-utils"


import Dropdown from "../../components/shared/Dropdown/Dropdown-component"
import Loading from "../../components/shared/loading/Loading"
import Order from "../../components/shared/Order/Order-component"

export default function PurchasHistoryPage() {

    const [orders, setorders] = useState(null)
    const [filter, setFilter] = useState("All")

    const { successToast, errorToast } = useToasty();



    //get payment status
    let params = (new URL(document.location)).searchParams;
    let status = params.get('redirect_status') // null or string

    const setTypesArray = () => {
        const arr = [
            { id: "All", value: "All" },
            { id: ORDER_TYPES.WAITING_FOR_CONFIRMATION, value: "Waiting for confirmation" },
            { id: ORDER_TYPES.WAITING_FOR_PAYMENT, value: "Waiting for payment" },
            { id: ORDER_TYPES.PROCESSING, value: "Processing" },
            { id: ORDER_TYPES.SENT, value: "Sent" },
            { id: ORDER_TYPES.CANCELED, value: "Canceled" },
            { id: ORDER_TYPES.REFUNDED, value: "Refunded" },
        ]
        return arr
    }

    let typesArray = useMemo(() => setTypesArray(), []);
    // setTypesArray();

    useEffect(() => {
        // if its backurl from stripe show successToast
        if (status == 'succeeded') successToast("Payment successful")
        if (status == 'failed') errorToast("Payment canceled")
        getPurchseList()
    }, [])


    const getPurchseList = async () => {
        let result = await getOrdersHistory()
        result = mergeWaitingOrders(result)
        result = sortArrayBaseCreateTime(result)
        if (result != null) {
            setorders(result)
        }
    }

    return (<>
        {(orders == null)
            ?
            <Loading />
            :
            <>
                {(orders.length == 0)
                    ?
                    <Text color='white' w='100%' textAlign='center' fontSize='20px' fontWeight='600'>No Order</Text>
                    :
                    <Box w='100%' px={{ base: "20px", md: "80px" }}>
                        <Box w='100%' maxW='700px' m='auto'>
                            <Text
                                color='white'
                                fontSize={{ base: "30px", md: '40px' }}
                                fontWeight='600'
                                textAlign='center'
                                mb='40px'
                            >
                                Purchase history
                            </Text>

                            <Flex w='100%' justifyContent='center'>
                                <Box w={{ base: '100%', md: '40%' }} mb='40px'>
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
                                        if (order.status == ORDER_TYPES.WAITING_FOR_PAYMENT)
                                            return <Order key={i} order={order} />
                                    })}
                                    {orders.map((order, i) => {
                                        if (order.status != ORDER_TYPES.WAITING_FOR_PAYMENT)
                                            return <Order key={i} order={order} />
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
                }
            </>
        }

    </>)
}