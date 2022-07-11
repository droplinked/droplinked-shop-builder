import { Box, Flex, Text, Image } from "@chakra-ui/react"

import merchimage from "../../Producer-pages/IncominOrder-page/merchComponent/merchImage.jpg"

export default function PurchaseHistory({ item }) {


    // get order date 
    const getDate = () => {
        let date = new Date(item.createdAt).toString().split(' ')
        date = date[1] + '/' + date[2] + '/' + date[3]
        return date
    }

    return (
        <Box
            w='100%'
            border='1px'
            borderColor='#444'
            borderRadius='8px'
            p='10px 10px'
            mb='30px'
        >
            <Flex
                borderBottom='1px'
                borderColor='#444'
                mb='15px'
                justifyContent={{ base: 'space-between', md: 'start' }}
            >
                <Text
                    color='#ddd'
                    fontSize={{ base: '10px', md: '16px' }}
                    fontWeight='500'
                    mr={{ base: '0px', md: '30px' }}
                >
                    date : {getDate()}
                </Text>
                <Text
                    color='#ddd'
                    fontSize={{ base: '10px', md: '16px' }}
                    fontWeight='500'
                    mr={{ base: '0px', md: '30px' }}
                >
                    orderID : 11228
                </Text>
                <Text
                    color='#ddd'
                    fontSize={{ base: '10px', md: '16px' }}
                    fontWeight='500'
                    mr={{ base: '0px', md: '30px' }}
                >
                    Total Price : $ 150
                </Text>
            </Flex>
            <Flex mb='20px'>
                <Image
                    w={{ base: '50px', md: '70px' }}
                    h={{ base: '50px', md: '70px' }}
                    mr='20px'
                    borderRadius='8px'
                    src={merchimage} />
                <Image
                    w={{ base: '50px', md: '70px' }}
                    h={{ base: '50px', md: '70px' }}
                    mr='20px'
                    borderRadius='8px'
                    src={merchimage} />
                <Image
                      w={{ base: '50px', md: '70px' }}
                      h={{ base: '50px', md: '70px' }}
                      mr='20px'
                      borderRadius='8px'
                    src={merchimage} />

            </Flex>
            <Text
                color='#fff'
                fontSize={{ base: '10px', md: '16px' }}
                fontWeight='500'
                mr='30px'
                cursor='pointer'
                _hover={{
                    color:'#8053ff'
                }}
            >
                View
            </Text>
        </Box>
    )
}