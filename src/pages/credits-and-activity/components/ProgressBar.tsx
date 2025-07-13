import { Flex, HStack, VStack } from '@chakra-ui/react'
import DotSeparatedList from 'components/redesign/dot-separated-list/DotSeparatedList'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import HorizontalBarChart from 'components/redesign/horizontal-bar-chart/HorizontalBarChart'
import StylizedTitle from 'components/redesign/stylized-title/StylizedTitle'
import { IBreakDown } from 'services/credit/interfaces'
import React from 'react'
import { createColorMap, getColor } from '../utils/colorHelpers'

interface Props {
    items: IBreakDown[]
    isInbound: boolean
}

export default function ProgressBar({ items, isInbound }: Props) {
    const sortedItems = [...items].sort((a, b) => b.amount - a.amount)
    const type = isInbound ? "inbound" : "outbound"
    const colorMap = createColorMap(sortedItems, type)

    return (
        <VStack width="full" spacing={6} align="stretch">
            <HorizontalBarChart data={sortedItems} getValue={(item) => item.amount} getLabel={(item) => item.reason} colorMap={colorMap} />
            <HStack justifyContent="space-between" flexDirection={{ base: "column", sm: "row" }} flexWrap="wrap">
                {sortedItems.map((item, index) => (
                    <Flex
                        key={index}
                        alignItems="center"
                        mr={{ base: "unset", sm: "auto" }}
                        width={{ base: "100%", sm: "unset" }}
                        gap={2}
                        justifyContent={{ base: "space-between", sm: "flex-start" }}
                        sx={{ rect: { fill: "#292929", fillOpacity: 1 } }}
                    >
                        <DotSeparatedList>
                            <StylizedTitle bgColor={getColor(index, sortedItems, type)} title={item.reason} />
                            <FormattedPrice price={item.amount} fontSize={14} fontWeight={400} />
                        </DotSeparatedList>
                    </Flex>
                ))}
            </HStack>
        </VStack>
    )
}

