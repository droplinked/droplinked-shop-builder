import { Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React from 'react'

function Community() {
    return (
        <Flex justifyContent="center">
            <Flex flexDirection={{ base: "column", lg: "row" }} alignItems="center" gap={8}>
                <Image src='assets/images/homepage/com.svg' width={{ base: "100%", lg: "50%" }} />
                <VStack width={{ base: "100%", sm: "80%", lg: "40%" }} align="stretch">
                    <AppTypography textAlign={{ base: "center", lg: "left" }} color={"#fff"} fontSize={{ base: "18px", sm: "23px", lg: "34px" }} fontWeight='bold'>Community Driven Commerce</AppTypography>
                    <AppTypography textAlign={{ base: "center", lg: "left" }} color={"#888"} fontSize={{ base: "14px", sm: "18px", lg: "20px" }}>Launch your drop on blockchain to gain proof of ownership and seamless transfer capabilities as a member of our decentralized community</AppTypography>
                </VStack>
            </Flex>
        </Flex>
    )
}

export default Community