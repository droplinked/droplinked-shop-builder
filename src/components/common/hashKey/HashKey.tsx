import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import { appDeveloment } from 'lib/utils/app/variable'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React, { useMemo } from 'react'
import ClipboardText from '../clipboardText/ClipboardText'
import IconBlockchain from '../iconBlockchain/IconBlockchain'
import AppTypography from '../typography/AppTypography'

export type blockchainTypes = string

interface Iprops {
    close: Function
    text: string
    hashkey: string
    blockchain: string
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
        <VStack align={"stretch"} spacing={3} color="#C2C2C2">
            <Box textAlign={"center"} marginBottom="30px"><AppTypography size='24px' weight='bolder' color={"#2BCFA1"}>{text}</AppTypography></Box>
            <Box><AppTypography size='16px'>Deploy Hash</AppTypography></Box>
            <Flex justifyContent="space-between" alignItems="center" border="1px solid #2f2f2f" padding="20px" borderRadius="10px">
                <Box width="80%">
                    <a href={getLink} style={{ outline: "none" }} target="_blank">
                        <AppTypography whiteSpace="pre-wrap" color={"#C2C2C2"} size='14px' textDecoration="underline">{getLink.substr(0, 60)}...</AppTypography>
                    </a>
                </Box>
                <Box><ClipboardText text={getLink} /></Box>
            </Flex>
            <Box><AppTypography display="flex" gap={1} size='12px'>Dropped on <IconBlockchain props={{ width: "15px", height: "15px" }} blockchain={blockchain} /> {capitalizeFirstLetter(blockchain)}</AppTypography></Box>
            <Flex paddingTop={6} justifyContent="center"><BasicButton onClick={() => close()}>Close</BasicButton></Flex>
        </VStack>
    )
}

export default HashKey