import { Box } from "@chakra-ui/react"
import { ORDER_TYPES } from "../../../constant/order.types"
import { useProfile } from "../../../context/profile/ProfileContext"

const OrderStatus = ({ orderStatus }) => {

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

    return (
        <>
            {(isCustomer())
                ?
                <Box fontSize={{ base: "20px", md: '24px' }} fontWeight='600' color='#8053ff' textAlign='center' w='100%'>
                    {orderText()}
                </Box>
                :
                <></>
            }
        </>
    )
}

export default OrderStatus