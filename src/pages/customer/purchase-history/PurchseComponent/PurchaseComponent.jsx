import { Box, Flex, Text, Image, useDisclosure } from "@chakra-ui/react"
import { convetToCustomFormat } from "../../../../utils/date.utils/convertDate"


import PurchaseModal from '../PurchaseModal/PurchaseModal'

export default function PurchaseHistory({ order }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>

                <Box
                    w='100%'
                    border='2px'
                    borderColor='#aaa'
                    borderRadius='8px'
                    p='10px 10px'
                    mb='30px'
                    onClick={onOpen}
                    cursor='pointer'
                    _hover={{
                        borderColor:'#8053ff'  
                    }}
                >
                   <Flex
                        borderBottom='1px'
                        borderColor='#aaa'
                        mb='15px'
                        pb='5px'
                        justifyContent='space-between'
                        
                    >
                        <Text
                            color='#ddd'
                            fontSize={{ base: '8px', md: '16px' }}
                            fontWeight='500'
                            mr={{ base: '0px', md: '30px' }}
                        >
                            Date: {convetToCustomFormat(order.createdAt)}
                        </Text>
                        <Text
                            color='#ddd'
                            fontSize={{ base: '8px', md: '16px' }}
                            fontWeight='500'
                            mr={{ base: '0px', md: '30px' }}
                        >
                            Order id: {order._id}
                        </Text>
                         <Text
                            color='#ddd'
                            fontSize={{ base: '8px', md: '16px' }}
                            fontWeight='500'
                            mr={{ base: '0px', md: '30px' }}
                        >
                            Total price: ${order.totalPrice}
                        </Text> 
                    </Flex>
                    <Flex mb='10px'>
                        {order.items.map((item, i) => {
                            return <Image
                                key={i}
                                w={{ base: '70px', md: '100px' }}
                                h={{ base: '70px', md: '100px' }}
                                mr='20px'
                                borderRadius='8px'
                                src={item.product.media[0].url}
                            />
                        })}
                    </Flex>
                    <PurchaseModal order={order} isOpen={isOpen} onClose={onClose} /> 
                </Box>
    

        </>

    )
}