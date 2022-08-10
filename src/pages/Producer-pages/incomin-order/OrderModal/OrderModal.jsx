import {
    Box, Flex, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react"
import { useState } from "react"
import { updateOrderStatus } from "../../../../api/producer/Orders-api"
import { ORDER_TYPES } from "../../../../constant/order.types"
import { useToasty } from "../../../../context/toastify/ToastContext"
import { useOrder } from "../../../../context/order/OrdersContext"

import MerchComponent from "../merchComponent/MerchComponent"
import BasicButton from "../../../../components/shared/BasicButton/BasicButton"
import OrderAddress from "./order-address-component"
import YesNoModal from "../../../../components/Modal/yes-or-no-modal/YesOrNo-modal-component"


export default function OrderModal({ order, isOpen, onClose }) {


    const [loadingBtn, setLoadingBtn] = useState(false)
    const [proccessModal, setProccessModal] = useState(false)
    const [cancelOrderModal, setCancelOrderModal] = useState(false)

    const { successToast, errorToast } = useToasty()
    const { updateOrder } = useOrder()


    const processButtonText = () => {
        switch (order.status) {
            case ORDER_TYPES.WAITING_FOR_CONFIRMATION:
                return "Start proccessing"
            case ORDER_TYPES.PROCESSING:
                return "Send order"
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
            successToast("Status changed successfully")
            updateOrder()
        } else {
            errorToast(result)
        }
        closeSmallModal()

    }

    const cancelClick = async () => {
        setLoadingBtn(true)
        let result = await updateOrderStatus(order._id, ORDER_TYPES.CANCELED)
        setLoadingBtn(false)
        if (result == true) {
            successToast("You canceled the order")
            updateOrder()
        } else {
            errorToast(result)
        }
        closeSmallModal()

    }

    const closeSmallModal = () => {
        setProccessModal(false)
        setCancelOrderModal(false)
    }

    const proccessModalText = () => {
        switch (order.status) {
            case ORDER_TYPES.WAITING_FOR_CONFIRMATION:
                return "Are you sure you want to start proccessing?"
            case ORDER_TYPES.PROCESSING:
                return "Are you sure you want to send this order?"
            // case ORDER_TYPES.SENT:
            //     return "Are you sure you want to set status on Sent?"
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}  >
            <ModalOverlay />
            <ModalContent
                mt='120px'
                maxW='700px'
                w='100%'
                mx="20px"
                bgColor='#222'
            >
                <ModalHeader
                    color='#fff'
                    fontSize='22px'
                    fontWeight='600'
                    textAlign='center'
                >Order</ModalHeader>
                <ModalCloseButton color='white' mt='10px' />
                <ModalBody>

                    {/* address component */}
                    <OrderAddress address={order.customerAddressBook} />

                    {/* product list */}
                    {
                        order.items.map((item, i) => {
                            return (
                                <Box key={i} mb='20px'>
                                    <MerchComponent item={item} />
                                </Box>
                            )
                        })
                    }

                </ModalBody>
                <ModalFooter>
                    {(order.status == ORDER_TYPES.WAITING_FOR_CONFIRMATION || order.status == ORDER_TYPES.PROCESSING)
                        ?

                        <Flex justifyContent="space-between" w='100%'>
                            <Box w='40%'>
                                <BasicButton bgColor='#fa6653' click={() => { setCancelOrderModal(true) }} disabled={loadingBtn}> Cancel order</BasicButton>
                            </Box>
                            <Box w='40%'>
                                <BasicButton click={() => { setProccessModal(true) }} disabled={loadingBtn} >{processButtonText()}</BasicButton>
                            </Box>
                        </Flex>
                        :
                        <>
                            {(order.status == ORDER_TYPES.CANCELED || order.status == ORDER_TYPES.REFUNDED) &&
                                <Box fontSize={{ base: "20px", md: '24px' }} fontWeight='600' color='#8053ff' textAlign='center' w='100%'>
                                    Order canceled
                                </Box>
                            }
                            {(order.status == ORDER_TYPES.SENT) &&
                                <Box fontSize={{ base: "20px", md: '24px' }} fontWeight='600' color='#8053ff' textAlign='center' w='100%'>
                                    This order has been sent
                                </Box>
                            }
                        </>
                    }
                </ModalFooter>
            </ModalContent>
            {/* process modal */}
            {proccessModal &&
                <YesNoModal
                    show={proccessModal}
                    hide={closeSmallModal}
                    text={proccessModalText()}
                    click={progressClick}
                    loading={loadingBtn}
                />}
            {/* cancel order modal */}
            {cancelOrderModal &&
                <YesNoModal
                    show={cancelOrderModal}
                    hide={closeSmallModal}
                    text={'Are you sure you want to cancel this order?'}
                    click={cancelClick}
                />}

        </Modal >
    )
}