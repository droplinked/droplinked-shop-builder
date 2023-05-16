import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/shared/BasicButton/BasicButton'
import React, { useContext } from 'react'
import recordContext from '../../context'

function RecordSuccess({ close }) {
    const { state: { hashkey } } = useContext(recordContext)

    return (
        <VStack align={"stretch"} spacing={3}>
            <Box textAlign={"center"}><Text fontSize={"larger"} margin="12px 0" fontFamily="aven" color={"green.400"}>Sku record successful</Text></Box>
            <Box>
                <Link href={`https://testnet.cspr.live/deploy/${hashkey}`} _hover={{ textDecoration: "none" }} target="_blank">
                    <Text color={"#FFF"} whiteSpace={"pre-wrap"} fontSize={"md"} _hover={{ color: "#2EC99E", textDecoration: "none" }} fontFamily="aven" textAlign={"center"}>{hashkey}</Text>
                </Link>
            </Box>
            <Flex paddingTop={6} justifyContent="center"><BasicButton onClick={close}>Close</BasicButton></Flex>
        </VStack>
    )
}

export default RecordSuccess