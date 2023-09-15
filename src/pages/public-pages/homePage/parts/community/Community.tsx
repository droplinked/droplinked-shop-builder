import { Box, Flex, Image, VStack } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useMemo } from 'react'

function Community({ loaded }) {

    const checkLoad = useMemo(() => loaded.includes('community'), [loaded])

    return (
        <Flex justifyContent="center" >
            <Flex width="95%" maxWidth="1500px" alignItems="center" gap="30px">
                <Box width="80%" position="relative" bottom="100px">
                    <Image src='assets/images/homepage/shape.svg' position="absolute" top="100px" left="" width="34px" />
                    <Box background='url(assets/images/homepage/line.svg) no-repeat' backgroundSize="330px 330px" position="absolute" top="-70px" left="-15px" width={checkLoad ? "330px" : "0"} height={checkLoad ? "330px" : "0"} transition="5s" />
                    <Box background='url(assets/images/homepage/line.svg) no-repeat' backgroundSize="330px 330px" position="absolute" top="-70px" left="205px" transform="rotate(55deg)" width="330px" height={checkLoad ? "330px" : "0"} transition="5s" />
                    <Box background='url(assets/images/homepage/line.svg) no-repeat' backgroundSize="330px 330px" position="absolute" top="-70px" left="430px" width={checkLoad ? "330px" : "0"} height={checkLoad ? "330px" : "0"} transition="5s" />
                    <Image src='assets/images/homepage/shape.svg' position="absolute" top="0" left="200px" width="34px" />
                    <Image src='assets/images/homepage/shape.svg' position="absolute" top="100px" left="375px" width="34px" />
                    <Image src='assets/images/homepage/shape.svg' position="absolute" top="0" left="550px" width="34px" />
                </Box>
                <VStack width="40%" align="stretch">
                    <Box><AppTypography size='34px' weight='bolder'>Community Driven Commerce</AppTypography></Box>
                    <Box><AppTypography size='20px' color="#888">Launch your drop on blockchain to gain proof of ownership and seamless transfer capabilities as a member of our decentralized community</AppTypography></Box>
                </VStack>
            </Flex>
        </Flex>
    )
}

export default Community