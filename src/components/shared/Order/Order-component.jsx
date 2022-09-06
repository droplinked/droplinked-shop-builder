import { Text, Box, Flex, useDisclosure, Stack, Skeleton, Image, keyframes } from "@chakra-ui/react"
import { convetToCustomFormat } from "../../../utils/date.utils/convertDate"
import { ORDER_TYPES } from "../../../constant/order.types"
import { useProfile } from "../../../context/profile/ProfileContext"
import { useNavigate } from "react-router-dom"


import OrderModal from "../../Modal/Order/Order-modal"
import BasicButton from "../BasicButton/BasicButton"

const animationKeyframes = keyframes`
0% { color: #8053ff; }
40% { color: #fff; }
80% { color: #8053ff; }
100% { color: #8053ff; }
`;

const animation = `${animationKeyframes} 2s ease infinite`;


export default function Order({ order }) {


    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isCustomer } = useProfile();
    const navigate = useNavigate()

    let totalQuantity = order.items.map(item => item.quantity).reduce((total, quan) => { return total + quan }, 0)

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

    const animationCondition = () => {
        const status = order.status;

        if (isCustomer()) {
            if (status == ORDER_TYPES.WAITING_FOR_PAYMENT) return true
            else return false
        } else {
            if (status == ORDER_TYPES.WAITING_FOR_CONFIRMATION) return true
            else return false
        }
    }


    const paynow = (event) => {
        event.stopPropagation();
        //    navigate(`/payment?CurrentOrderId=${order._id}&price=${parseFloat(order.totalPrice).toFixed(2)}`)
        let payOrder = {_id:order._id ,totalPrice:parseFloat(order.totalPrice).toFixed(2)}
      //  console.log(payOrder);
        sessionStorage.setItem('payOrder', JSON.stringify(payOrder));
        navigate(`/payment`)
    }

    return (
        <Box

            border='3px solid #d4d4d486'
            borderRadius='30px'
            p='15px 20px'
            cursor='pointer'
            mb='40px'
            transition='0.8s'
            _hover={{
                border: '3px solid #8053ff'
            }}
            onClick={onOpen}
        >
            {(order.items.length > 0)
                ?
                <Box pos='relative'>
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
                            fontSize={{ base: "12px", md: '14px' }}
                            fontWeight='600'
                            maxW='50%'
                            overflow='hidden'
                            whiteSpace='nowrap'
                            textOverflow='ellipsis'
                        >
                            Order id: {order._id}
                        </Text>

                    </Flex>
                    {/* date and total price */}
                    <Flex justifyContent='space-between'>
                        <Text
                            color='#fff'
                            fontSize={{ base: "12px", md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "10px", md: '20px' }}
                        >
                            Quantity: {totalQuantity} item
                        </Text>
                        <Text
                            color='#fff'
                            fontSize={{ base: "12px", md: '14px' }}
                            fontWeight='600'
                        >
                            Total price: ${parseFloat(order.totalPrice).toFixed(2)}
                        </Text>
                    </Flex>

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
                                    //src={item.product.media[0].url} 
                                    src={item.image_url} 
                                    />
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
                            animation={(animationCondition()) && animation}
                        >
                            {statusText()}
                        </Text>
                    </Flex>
                    {/* status */}
                    {(order.status == ORDER_TYPES.WAITING_FOR_PAYMENT) &&
                        <Box
                            pos='absolute'
                            w={{ base: "120px", md: "160px" }}
                            h={{ base: '25px', md: '40px' }}
                            right='0px'
                            bottom='0px'
                        >
                            <BasicButton onClick={paynow}>Pay now</BasicButton>
                        </Box>

                    }
                </Box>
                :
                <Stack>
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
            }
            {(order.items.length > 0) &&
                <OrderModal order={order} isOpen={isOpen} onClose={onClose} />
            }
        </Box>
    )
}