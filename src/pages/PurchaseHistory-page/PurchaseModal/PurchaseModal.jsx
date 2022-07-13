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

import Item from "../ItemComponent/ItemComponent"

export default function PurchaseModal({ order, isOpen, onClose }) {


    const getTotalPrice = () => {
        let total = 0
        order.items.forEach(item => {
            let itemPrice = (item.product.skus.find(sku => sku._id == item.skuID).price * item.quantity)
            total += itemPrice
        })
        return total
    }

    const getDate = () => {
        let date = new Date(order.createdAt).toString().split(' ')
        date = date[1] + '/' + date[2] + '/' + date[3]
        return date
    }

    let totalPrice = getTotalPrice()
    let date = getDate()
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
                    <Text
                        color='#ccc'
                        fontSize={{ base: '14px', md: '16px' }}
                        fontWeight='600'
                        mb='8px'
                    >
                        Total price : $ {totalPrice}
                    </Text>
                    <Text
                        color='#ccc'
                        fontSize={{ base: '14px', md: '16px' }}
                        fontWeight='600'
                        mb='8px'
                    >
                        Date :  {date}
                    </Text>
                    <Text
                        color='#ccc'
                        fontSize={{ base: '14px', md: '16px' }}
                        fontWeight='600'
                        mb='20px'
                    >
                        AddressId :  {addressId}
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