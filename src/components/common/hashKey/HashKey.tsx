import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import { appDeveloment } from 'lib/utils/app/variable'
import React, { useMemo } from 'react'

export type blockchainTypes = "STACKS" | "CASPER"

interface Iprops {
    close: Function
    text: string
    hashkey: string
    blockchain: blockchainTypes
}

function HashKey({ close, hashkey, text, blockchain }: Iprops) {

    const getLink = useMemo(() => {
        switch (blockchain) {
            case "CASPER":
                return `https://${appDeveloment ? "testnet." : ""}cspr.live/deploy/${hashkey}`
            case "STACKS":
                return `https://explorer.hiro.so/txid/${hashkey}?chain=${appDeveloment ? "testnet" : "mainnet"}`
            default:
                return ""
        }
    }, [blockchain, appDeveloment])
    
    return (
        <VStack align={"stretch"} spacing={3}>
            <Box textAlign={"center"}><Text fontSize={"larger"} margin="12px 0" fontFamily="aven" color={"green.400"}>{text}</Text></Box>
            <Box>
                <a href={getLink} style={{ outline: "none" }} target="_blank">
                    <Text color={"#FFF"} whiteSpace={"pre-wrap"} fontSize={"md"} _hover={{ color: "#2EC99E", textDecoration: "none" }} fontFamily="aven" textAlign={"center"}>{hashkey}</Text>
                </a>
            </Box>
            <Flex paddingTop={6} justifyContent="center"><BasicButton onClick={() => close()}>Close</BasicButton></Flex>
        </VStack>
    )
}

export default HashKey