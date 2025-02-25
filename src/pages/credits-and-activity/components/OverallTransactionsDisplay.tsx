import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppSkeleton from 'components/common/skeleton/AppSkeleton'
import AppTypography from 'components/common/typography/AppTypography'
import { useCurrencyConverter } from 'functions/hooks/useCurrencyConverter/useCurrencyConverter'
import React from 'react'
import useCreditStore from '../stores/CreditStore'
import ProgressBar from './ProgressBar'
import useCreditsData from 'functions/hooks/credits-and-activity/useCreditsData'

interface Props {
    type: 'inbound' | 'outbound';
}

export default function OverallTransactionsDisplay({ type }: Props) {
    const { analyticsData } = useCreditStore()
    const { isLoading } = useCreditsData()
    const { symbol, abbreviation, convertPrice } = useCurrencyConverter()
    const { additions, removals } = analyticsData ?? {}

    const data = type === 'inbound' ? additions : removals
    const items = data?.breakdown || []
    const total = data?.total || 0
    const hasData = items && items.length > 0

    const config = {
        inbound: {
            title: 'Inbound',
            iconColor: '#2BCFA1',
            bgColor: '#2bcfa11a',
            borderColor: '#2bcfa11a',
            icon: <AppIcons.ArrowDownOutlined color='#2BCFA1' />
        },
        outbound: {
            title: 'Outbound',
            iconColor: '#FF2244',
            bgColor: '#ff22440d',
            borderColor: '#ff224426',
            icon: <AppIcons.ArrowUp color='#FF2244' />
        }
    }

    const { title, bgColor, borderColor, icon } = config[type]

    return (
        <Flex
            flexDirection="column"
            justifyContent="space-between"
            alignItems="start"
        >
            <Flex p={{ base: 4, md: 6 }} flexDirection="column" gap={{ base: 4, md: 6 }} alignItems="start">
                <Flex p={3} bg={bgColor} border={`1px solid ${borderColor}`} borderRadius="8px">
                    {icon}
                </Flex>
                <Flex flexDirection="column" gap={2}>
                    <AppTypography color="#fff" fontSize={14} fontWeight={400}>
                        {title}
                    </AppTypography>
                    <AppSkeleton isLoaded={!isLoading} borderRadius={8}>
                        <Flex gap={1}>
                            <AppTypography color="#fff" fontSize={{ base: 18, md: 20 }} fontWeight={500}>
                                {symbol}{convertPrice({ amount: total, toUSD: false }).toFixed(2)}
                            </AppTypography>
                            <AppTypography color="#7b7b7b" fontSize={{ base: 18, md: 20 }} fontWeight={400}>
                                {abbreviation}/USDC
                            </AppTypography>
                        </Flex>
                    </AppSkeleton>
                </Flex>
            </Flex>
            {hasData && (
                <AppSkeleton isLoaded={!isLoading} width="100%">
                    <Flex
                        flexDirection="column"
                        justify={{ base: "center", md: "end" }}
                        alignItems="center"
                        gap={6}
                        width="100%"
                        borderTop="1px solid #292929"
                        p={{ base: 4, md: 6 }}
                    >
                        <ProgressBar items={items} type={type} />
                    </Flex>
                </AppSkeleton>
            )}
        </Flex>
    )
}
