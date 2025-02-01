import { Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import { useCurrencyConverter } from 'functions/hooks/useCurrencyConverter/useCurrencyConverter'
import React from 'react'

export default function OutboundDisplay() {
    const { symbol, abbreviation, convertPrice } = useCurrencyConverter()

    return (
        <Flex p={{ base: 4, md: 6 }} flexDirection="column" gap={{ base: 4, md: 6 }} alignItems="start">
            <Flex p={3} bg={"#ff22440d"} border={"1px solid #ff224426"} borderRadius={"8px"}>
                <AppIcons.ArrowUp color='#FF2244' />
            </Flex>
            <Flex flexDirection={"column"} gap={2}>
                <AppTypography color={"#fff"} fontSize={14} fontWeight={400}>
                    Outbound
                </AppTypography>
                <Flex gap={1}>
                    <AppTypography color={"#fff"} fontSize={{ base: 18, md: 20 }} fontWeight={500}>
                        {symbol}{convertPrice({ amount: 20, toUSD: false }).toFixed(2)}
                    </AppTypography>
                    <AppTypography color={"#7b7b7b"} fontSize={{ base: 18, md: 20 }} fontWeight={400}>
                        {abbreviation}/USDC
                    </AppTypography>
                </Flex>
            </Flex>
        </Flex>
    )
}
