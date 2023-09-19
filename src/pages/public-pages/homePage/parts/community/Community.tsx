import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useMemo } from 'react'

function Community({ loaded }) {

    const checkLoad = useMemo(() => loaded.includes('community'), [loaded])

    return (
        <Flex justifyContent="center" >
            <Flex width="95%" maxWidth="1500px" flexDirection={{ base: "column", lg: "row" }} alignItems="center" gap="30px">
                <Box width={{ base: "100%", sm: "70%", lg: "80%" }} position="relative">
                    <Image src='assets/images/homepage/com.svg' width="100%" opacity={checkLoad ? 1 : 0} zIndex="1" position="relative" transition="8s" />
                    <Image src='assets/images/homepage/shape.svg' position="absolute" bottom="36%" left="18.5%" width="3%" />
                    <Image src='assets/images/homepage/shape.svg' position="absolute" top="38%" left="38%" width="3%" />
                    <Image src='assets/images/homepage/shape.svg' position="absolute" bottom="38%" left="59%" width="3%" />
                    <Image src='assets/images/homepage/shape.svg' position="absolute" top="36%" right="18.5%" width="3%" />
                </Box>
                <VStack width={{ base: "100%", sm: "80%", lg: "40%" }} align="stretch">
                    <Box><AppTypography textAlign={{ base: "center", lg: "left" }} size={{ base: "18px", sm: "34px" }} weight='bolder'>Community Driven Commerce</AppTypography></Box>
                    <Box><AppTypography textAlign={{ base: "center", lg: "left" }} color="#888" size={{ base: "14px", sm: "20px" }}>Launch your drop on blockchain to gain proof of ownership and seamless transfer capabilities as a member of our decentralized community</AppTypography></Box>
                </VStack>
            </Flex>
        </Flex>
    )
}

export default Community