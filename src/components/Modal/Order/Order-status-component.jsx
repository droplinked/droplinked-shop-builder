import { Box, Flex } from "@chakra-ui/react"
import { ORDER_TYPES } from "../../../constant/order.types"
import { useProfile } from "../../../context/profile/ProfileContext"

import BasicButton from "../../shared/BasicButton/BasicButton"



const OrderStatus = ({ orderStatus , loading ,cancelOnClick ,openProccessModal }) => {

    const { isCustomer } = useProfile();

    const orderText = () => {

        switch (orderStatus) {
            case ORDER_TYPES.WAITING_FOR_PAYMENT:
                return "Waiting for payment"
            case ORDER_TYPES.WAITING_FOR_CONFIRMATION:
                return "Waiting for confirmation"
            case ORDER_TYPES.CANCELED:
                return "Order canceled"
            case ORDER_TYPES.REFUNDED:
                return "Order canceled"
            case ORDER_TYPES.SENT:
                return "Order sent"
        }
    }

    const processButtonText = () => {
        switch (orderStatus) {
            case ORDER_TYPES.WAITING_FOR_CONFIRMATION:
                return "Start proccessing"
            case ORDER_TYPES.PROCESSING:
                return "Send order"
            case ORDER_TYPES.SENT:
                return "Sent"
        }
    }



    return (
        <>
            {(isCustomer())
                ?
                <Box fontSize={{ base: "20px", md: '24px' }} fontWeight='600' color='#8053ff' textAlign='center' w='100%'>
                    {orderText()}
                </Box>
                :
                <>
                    {(orderStatus == ORDER_TYPES.WAITING_FOR_CONFIRMATION || orderStatus == ORDER_TYPES.PROCESSING)
                        ?

                        <Flex justifyContent="space-between" w='100%'>
                            <Box w='40%'>
                                <BasicButton bgColor='#fa6653' click={cancelOnClick} disabled={loading}> Cancel order</BasicButton>
                            </Box>
                            <Box w='40%'>
                                <BasicButton click={openProccessModal} disabled={loading} >{processButtonText()}</BasicButton>
                            </Box>
                        </Flex>
                        :
                        <>
                            {(orderStatus == ORDER_TYPES.CANCELED || orderStatus == ORDER_TYPES.REFUNDED) &&
                                <Box fontSize={{ base: "20px", md: '24px' }} fontWeight='600' color='#8053ff' textAlign='center' w='100%'>
                                    Order canceled
                                </Box>
                            }
                            {(orderStatus == ORDER_TYPES.SENT) &&
                                <Box fontSize={{ base: "20px", md: '24px' }} fontWeight='600' color='#8053ff' textAlign='center' w='100%'>
                                    This order has been sent
                                </Box>
                            }
                        </>
                    }
                </>
            }
        </>
    )
}

export default OrderStatus
