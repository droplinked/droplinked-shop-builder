import {
    Text, Box, Flex, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import { useState } from "react"
import { convertToStandardFormat } from "../../../../utils/date.utils/convertDate"
import { updateOrderStatus } from "../../../../api/producer/Orders-api"
import { ORDER_TYPES } from "../../../../constant/order.types"
import { useToasty } from "../../../../context/toastify/ToastContext"
import { useOrder } from "../../../../context/order/OrdersContext"

import MerchComponent from "../merchComponent/MerchComponent"
import BasicButton from "../../../../components/shared/BasicButton/BasicButton"



export default function OrderModal({ ProducList, order, isOpen, onClose }) {

    const [address, setAddress] = useState(null)
    const [loadingBtn, setLoadingBtn] = useState(false)

    const { successToast, errorToast } = useToasty()
    const { updateOrder } = useOrder()


    // new orderList with product
    let newOrderList = order;
    newOrderList.items.forEach((item, i) => {
        let product = ProducList.find(product => product._id == item.productID)
        newOrderList.items[i] = { ...item, product: product }
    })

    // get quantity of merchs
    const getQuantity = () => {
        let TotalQuantity = newOrderList.items.map(item => item.quantity)
            .reduce((total, quan) => { return total + quan }, 0)
        return TotalQuantity
    }


    // get price of merchs
    const getMerchPrice = () => {
        let totalPrice = 0
        newOrderList.items.forEach(item => {
            totalPrice += (item.sku.price * item.quantity)
        })
        return totalPrice
    }


    const processButtonText = () => {
        switch (order.status) {
            case ORDER_TYPES.WAITING_FOR_CONFIRMATION:
                return "Proccessing"
            case ORDER_TYPES.PROCESSING:
                return "Send"
                case ORDER_TYPES.SENT:
                    return "Sent"
        }
    }

    const progressClick = async () => {
        let statusType = (order.status == "WAITING_FOR_CONFIRMATION") ? ORDER_TYPES.PROCESSING : ORDER_TYPES.SENT
        setLoadingBtn(true)
        let result = await updateOrderStatus(order._id, statusType)
        setLoadingBtn(false)
        if (result == true) {
            successToast("Status changed successfully.")
            updateOrder()
        } else {
            errorToast(result)
        }
    }

    const cancelClick = async () => {
        setLoadingBtn(true)
        let result = await updateOrderStatus(order._id, ORDER_TYPES.CANCELED)
        setLoadingBtn(false)
        if (result == true) {
            successToast("You canceled the order!")
            updateOrder()
        } else {
            errorToast(result)
        }

    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}  >
            <ModalOverlay />
            <ModalContent
                mt='200px'
                maxW='700px'
                w='100%'
                mx="20px"
                bgColor='#222'
            >
                <ModalHeader
                    color='#fff'
                    fontSize='22px'
                    fontWeight='600'
                >Order</ModalHeader>
                <ModalCloseButton color='white' />
                <ModalBody>
                    <Flex w='100%' justifyContent='space-between'>
                        <Text
                            color='#fff'
                            fontSize={{ base: '10px', md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "5px", md: '10px' }}
                        >
                            Merchs price : $ {getMerchPrice()}
                        </Text>

                        <Text
                            color='#fff'
                            fontSize={{ base: '10px', md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "5px", md: '10px' }}
                        >
                            Date : {convertToStandardFormat(order.createdAt)}
                        </Text>
                    </Flex>
                    <Flex w='100%' justifyContent='space-between'>
                        <Text
                            color='#fff'
                            fontSize={{ base: '10px', md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "5px", md: '10px' }}
                        >
                            Shipping price : $ 5
                        </Text>
                        <Text
                            color='#fff'
                            fontSize={{ base: '10px', md: '14px' }}
                            fontWeight='600'
                            mb={{ base: "5px", md: '10px' }}
                        >
                            Merchs quantity : {getQuantity()}
                        </Text>

                    </Flex>

                    <Text
                        color='#fff'
                        fontSize={{ base: '16px', md: '20px' }}
                        fontWeight='600'
                        mb='40px'
                    >
                        Total pric : $ {getMerchPrice() + 5}
                    </Text>

                    {
                        newOrderList.items.map((item, i) => {
                            return (
                                <Box key={i} mb='20px'>
                                    < MerchComponent item={item} />
                                </Box>
                            )
                        })
                    }

                    {(address) &&
                        <Box
                            mt='30px'
                            w='100%'
                            mb='10px'
                        >
                            <Text
                                color='white'
                                fontSize={{ base: '14px', md: '18px' }}
                                mb='10px'
                                fontWeight='600'
                            >
                                Customer Detail
                            </Text>
                            <Text
                                color='#ccc'
                                fontSize={{ base: '12px', md: '16px' }}
                            //  mb='5px'
                            >
                                {`${address.firstname} \xa0 ${address.lastname} `}
                            </Text>

                            <Text
                                color='#ccc'
                                fontSize={{ base: '12px', md: '16px' }}
                                fontWeight='500'
                            >
                                {`${address.country} \xa0 ${address.city} `}
                            </Text>
                            <Text
                                color='#ccc'
                                fontSize={{ base: '12px', md: '16px' }}
                                fontWeight='500'
                            >
                                {`${address.addressLine1} \xa0 ${address.addressLine2} `}
                            </Text>
                            <Text
                                color='#ccc'
                                fontSize={{ base: '12px', md: '16px' }}
                                fontWeight='500'
                            >
                                {`${address.state} \xa0 ${address.zip} `}
                            </Text>
                        </Box>
                    }
                </ModalBody>
                <ModalFooter>
                    {(order.status == ORDER_TYPES.CANCELED)
                        ?
                        <Box fontSize={{ base: "20px", md: '24px' }} fontWeight='600' color='#8053ff' textAlign='center' w='100%'>
                            Order canceled
                        </Box>
                        :
                        <Flex justifyContent="space-between" w='100%'>
                            <Box w='40%'>
                                <BasicButton click={progressClick} loading={loadingBtn} disabled={(order.status == ORDER_TYPES.SENT)}>{processButtonText()}</BasicButton>
                            </Box>
                            <Box w='40%'>
                                <BasicButton bgColor='red' click={cancelClick} loading={loadingBtn}> Cancel Order</BasicButton>
                            </Box>
                        </Flex>
                    }

                </ModalFooter>
            </ModalContent>
        </Modal >
    )
}