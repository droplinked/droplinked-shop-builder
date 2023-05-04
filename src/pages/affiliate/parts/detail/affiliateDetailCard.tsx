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
            <Box width={["50%", "30%"]} maxWidth="230px">
                <AppImage src={image} borderRadius="8px" />
            </Box>
            <Box>
                <VStack align={"stretch"} spacing={[1, 2]}>
                    <Box><Text fontSize={["sm", "md"]} fontFamily="aven">{title}</Text></Box>
                    <Box><Text fontSize={["sm", "md"]} fontFamily="aven" color="#2EC99E">{decript}</Text></Box>
                    <Box>
                        <Flex gap={[3, 8]} flexWrap="wrap">
                            {options.map((el, key) => <Box key={key}><Text fontSize={["sm", "md"]}>{el.caption}: {el.value}</Text></Box>)}
                        </Flex>
                    </Box>
                    <Box><Text fontSize={["sm", "md"]}>Price: {price}</Text></Box>
                    <Box><Text fontSize={["sm", "md"]}>Your earning: {earning} /each</Text></Box>
                </VStack>
            </Box>
        </Flex>
    )
}

export default AffiliateDetailCard