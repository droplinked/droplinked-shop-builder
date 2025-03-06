import { Flex, Skeleton, Text } from '@chakra-ui/react'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import { RevenueStat } from 'pages/dashboard/types/dashboard.types'
import React from 'react'

interface Props {
    stat: RevenueStat
    isLoading: boolean
}

function RevenueStatDetails({ stat, isLoading }: Props) {
    const { label, value, isPrice } = stat

    return (
        <Flex
            direction="column"
            gap={2}
            sx={{ p: { fontSize: { base: 18, lg: 20 }, fontWeight: 500, color: "#fff" } }}
        >
            <Text as="span" fontSize={14} color="#fff">{label}</Text>

            <Skeleton isLoaded={!isLoading}>
                {isPrice
                    ? <FormattedPrice price={value} abbreviationProps={{ color: 'text.subtextPlaceholder.dark', fontWeight: 400 }} />
                    : <Text>{value ?? 0}</Text>
                }
            </Skeleton>
        </Flex>
    )
}

export default RevenueStatDetails