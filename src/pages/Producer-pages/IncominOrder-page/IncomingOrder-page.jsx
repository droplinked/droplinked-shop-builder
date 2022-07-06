import { Text, Box, Flex } from "@chakra-ui/react"

import OrderComponent from "./orderComponent/OrderComponent"

export default function IncomingOrderPage() {
    return (
        <Box
            w='100%'
            px={{ base: "20px", md: "80px" }}
        >
            <Box
                w='100%'
                maxW='700px'
                m='auto'
            >
                <Text
                    color='white'
                    fontSize={{base:"30px" , md:'40px'}}
                    fontWeight='600'
                   textAlign='center'
                   mb='40px'
                >
                    Incoming Order
                </Text>

                
                <OrderComponent seen={true}/>
                <Box mb='30px'></Box>
                <OrderComponent seen={false}/>
                <Box mb='30px'></Box>
                <OrderComponent seen={false}/>
            </Box>
        </Box>
    )
}