import { Box, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { faker } from '@faker-js/faker'
import AppImage from 'components/shared/image/AppImage'
import React from 'react'

interface options {
    caption: string
    value: string | number
}

interface IProps {
    image: string
    title: string
    decript: string
    options: Array<options>
    price: string
    earning: string
}

function AffiliateDetailCard({ decript, earning, image, options, price, title }: IProps) {
    return (
        <Flex alignItems={"center"} gap={7}>
            <Box width={"30%"} maxWidth="230px"><AppImage  src={image} borderRadius="8px" /></Box>
            <Box>
                <VStack align={"stretch"} spacing={2}>
                    <Box><Text fontSize={"md"} fontFamily="aven">{title}</Text></Box>
                    <Box><Text fontSize={"md"} fontFamily="aven" color="#2EC99E">{decript}</Text></Box>
                    <Box>
                        <HStack spacing={8}>
                            {options.map((el, key) => <Box key={key}><Text fontSize={"md"}>{el.caption}: {el.value}</Text></Box>)}
                        </HStack>
                    </Box>
                    <Box><Text fontSize={"md"}>Price: {price}</Text></Box>
                    <Box><Text fontSize={"md"}>Your earning: {earning} /each</Text></Box>
                </VStack>
            </Box>
        </Flex>
    )
}

export default AffiliateDetailCard