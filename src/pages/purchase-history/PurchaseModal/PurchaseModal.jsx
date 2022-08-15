import {
    Text, Flex, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react"
import { ORDER_TYPES } from "../../../constant/order.types"
import { convertToStandardFormat } from "../../../utils/date.utils/convertDate"

import Item from "../ItemComponent/ItemComponent"

export default function PurchaseModal({ order, isOpen, onClose }) {


    const orderStatus = () => {
        switch (order.status) {
            case ORDER_TYPES.WAITING_FOR_CONFIRMATION:
                return "Waiting for confirm"
            case ORDER_TYPES.PROCESSING:
                return "Order in progress"
            case ORDER_TYPES.SENT:
                return "Order sent"
            case ORDER_TYPES.CANCELED:
                return "Canceled"
        }
    }

    return (<>
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
                    textAlign='center'
                >Order</ModalHeader>
                <ModalCloseButton color='white' mt='10px' />
                <ModalBody>
                    <Flex w='100%' justifyContent='space-between'>
                        <Text
                            color='#ccc'
                            fontSize={{ base: '10px', md: '16px' }}
                            fontWeight='600'
                            mb='8px'
                        >
                            Items price: ${parseFloat(order.totalPrice) - 5}
                        </Text>
                        <Text
                            color='#ccc'
                            fontSize={{ base: '10px', md: '16px' }}
                            fontWeight='600'
                            mb='8px'
                        >
                            Date :  {convertToStandardFormat(order.createdAt)}
                        </Text>
                    </Flex>
                    <Flex w='100%' justifyContent='space-between'>
                        <Text
                            color='#ccc'
                            fontSize={{ base: '10px', md: '16px' }}
                            fontWeight='600'
                            mb='8px'
                        >
                            Shipping price : $ 5
                        </Text>
                        <Text
                            color='#ccc'
                            fontSize={{ base: '10px', md: '16px' }}
                            fontWeight='600'
                            mb='8px'
                        >
                            Order status :  {orderStatus()}
                        </Text>
                    </Flex>
                    <Text
                        color='#fff'
                        fontSize={{ base: '14px', md: '18px' }}
                        fontWeight='600'
                        mb='8px'
                    >
                        Price: ${order.totalPrice}
                    </Text>

                    <Flex wrap='wrap'>
                        {order.items.map((item, i) => <Item key={i} item={item} />)}
                    </Flex >

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' w='40%' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>)
}