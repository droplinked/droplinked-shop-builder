import { Box, Text, VStack } from '@chakra-ui/react'
import { BlackBox, StarLabel, Text18px } from 'pages/register-pages/RegisterPages-style'
import React from 'react'
import ContainerPayment from './parts/container';

function Payments() {
    return (
        <VStack
            spacing={3}
            align='stretch'
        >
            <Box>
                <Text18px>Payment Method <StarLabel>*</StarLabel></Text18px>
            </Box>
            <Box>
                <Text fontSize="sm" color="lightGray">
                    Activate the payment methods and choose your target wallet for each of them
                </Text>
            </Box>
            <VStack align='stretch' spacing={3}>
                <VStack spacing={2} align={"stretch"}>

                    <BlackBox padding={3}>
                        <ContainerPayment title={"STX Payment"} />
                    </BlackBox>
                    <BlackBox padding={3}>
                        <ContainerPayment title={"STX Payment"} value={"3423432"} />
                    </BlackBox>
                    <BlackBox padding={3}>
                        <ContainerPayment title={"STX Payment"} value={"3423432"} locked />
                    </BlackBox>

                </VStack>
            </VStack>
        </VStack>
    )
}

export default Payments