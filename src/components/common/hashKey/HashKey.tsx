import { Box, Flex, VStack } from '@chakra-ui/react'
import BasicButton from 'components/common/BasicButton/BasicButton'
import { appDevelopment } from 'lib/utils/app/variable'
import { capitalizeFirstLetter } from 'lib/utils/heper/helpers'
import React, { useMemo } from 'react'
import BlockchainDisplay from '../blockchainDisplay/BlockchainDisplay'
import ClipboardText from '../clipboardText/ClipboardText'
import AppTypography from '../typography/AppTypography'
import hashkeyModel from './model'

export type blockchainTypes = string

export interface IHashKeyModal {
    close: Function
    text?: string
    hashkey: string
    blockchain: string
    description?: any
}

function HashKey({ close, hashkey, text, blockchain, description }: IHashKeyModal) {
    const getLink = useMemo(() => hashkeyModel.getLink({ blockchain, hashkey }), [blockchain, appDevelopment, hashkey])

    return (
        <VStack align={"stretch"} spacing={3} color="#C2C2C2">
            <Box textAlign={"center"} marginBottom="30px"><AppTypography fontSize='24px' fontWeight='bold' color={"#2BCFA1"}>{text}</AppTypography></Box>
            {description ? <Box paddingBottom="30px">{description}</Box> : null}
            <Box><AppTypography fontSize='16px'>Deploy Hash</AppTypography></Box>
            <Flex justifyContent="space-between" alignItems="center" border="1px solid #2f2f2f" padding="20px" borderRadius="10px">
                <Box width="80%">
                    <a href={getLink} style={{ outline: "none" }} target="_blank">
                        <AppTypography whiteSpace="pre-wrap" color={"#C2C2C2"} fontSize='14px' textDecoration="underline">{getLink.substr(0, 60)}...</AppTypography>
                    </a>
                </Box>
                <Box><ClipboardText text={getLink} /></Box>
            </Flex>
            <Box><AppTypography display="flex" gap={1} fontSize='12px'>Dropped on <BlockchainDisplay show='icon' props={{ width: "15px", height: "15px" }} blockchain={blockchain} /> {capitalizeFirstLetter(blockchain)}</AppTypography></Box>
            <Flex paddingTop={6} justifyContent="center"><BasicButton onClick={() => close()}>Close</BasicButton></Flex>
        </VStack>
    )
}

export default HashKey