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

import { convertToStandardFormat } from "../../../utils/date.utils/convertDate"

import Item from "../ItemComponent/ItemComponent"

export default function PurchaseModal({ order, isOpen, onClose }) {




    let totalPrice = order.totalPrice
    let addressId = order.customerAddressBookID

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
                >Order</ModalHeader>
                <ModalCloseButton color='white' />
                <ModalBody>
                    <Flex w='100%' justifyContent='space-between'>
                        <Text
                            color='#ccc'
                            fontSize={{ base: '10px', md: '16px' }}
                            fontWeight='600'
                            mb='8px'
                        >
                            Merchs price : $ {totalPrice - 5}
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
                            AddressId :  {addressId}
                        </Text>
                    </Flex>
                    <Text
                            color='#fff'
                            fontSize={{ base: '14px', md: '18px' }}
                            fontWeight='600'
                            mb='8px'
                        >
                            Merchs price : $ {totalPrice}
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