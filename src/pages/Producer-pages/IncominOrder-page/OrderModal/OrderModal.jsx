import {
    Text, Box, Flex, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
} from "@chakra-ui/react"

import MerchComponent from "../merchComponent/MerchComponent"


export default function OrderModal({ ProducList, order, isOpen, onClose }) {

    // new orderList with product
    let newOrderList = order;
    newOrderList.items.forEach((item, i) => {
        let product = ProducList.find(product => product._id == item.productID)
        newOrderList.items[i] = { ...item, product: product }
    })

    const getDate = () => {
        let date = new Date(order.createdAt).toString().split(' ')
        date = date[1] + '/' + date[2] + '/' + date[3]
        return date
    }

    const getQuantity = () => {
        let TotalQuantity = newOrderList.items.map(item => item.quantity)
            .reduce((total, quan) => { return total + quan }, 0)
        return TotalQuantity
    }

    const getMerchPrice = () => {
        let totalPrice = 0
        newOrderList.items.forEach(item => {
            totalPrice += item.product.skus.find(sku => sku._id == item.skuID).price
        })
        return totalPrice
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
                            Date : {getDate()}
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


                    <Box
                        mt='30px'
                        w='100%'
                        mb='10px'
                    >
                        <Text
                            color='white'
                            fontSize={{ base: '14px', md: '18px' }}
                            mb='20px'
                            fontWeight='600'
                        >
                            Customer Detail
                        </Text>
                        <Text
                            color='white'
                            fontSize='16px'
                            mb='10px'
                        >
                            Customer Name : Behdad mansouri
                        </Text>
                        <Text
                            color='white'
                            fontSize='16px'
                        >
                            Customer Address : Iran ahwaz zeiton 5898
                        </Text>

                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='red' w='40%' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}