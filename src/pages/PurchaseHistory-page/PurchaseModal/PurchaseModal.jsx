import {
    Text,  Flex, Modal, Img,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from "@chakra-ui/react"


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
                        color='#fff'
                        fontSize={{base:'14px' , md:'18px'}}
                        fontWeight='600'
                        mb='10px'
                    >
                        Total price : $ {totalPrice}
                    </Text>
                    <Text
                        color='#fff'
                        fontSize={{base:'14px' , md:'18px'}}
                        fontWeight='600'
                        mb='10px'
                    >
                        Date :  {date}
                    </Text>
                    <Text
                        color='#fff'
                        fontSize={{base:'14px' , md:'18px'}}
                        fontWeight='600'
                        mb='30px'
                    >
                        AddressId :  {addressId}
                    </Text>

                    <Flex
                    wrap='wrap'
                    >
                        {order.items.map((item, i) => {
                            return <Img
                                src={item.product.media[0].url}
                                borderRadius='8px'
                                gridRow='1 / 4'
                                w={{base:"80px" , md:'120px'}}
                                h={{base:"80px" , md:'120px'}}
                                mr='20px'
                                mb='10px'
                                display='inline'
                            />
                        }
                        )}
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