import { Box, Circle, Flex, SimpleGrid, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import CurrencyIcon from 'components/redesign/currency-icon/CurrencyIcon'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import DataPointCard from '../DataPointCard'
import StylizedTitle from '../StylizedTitle'

function InventoryOverview() {
    const productMetrics = [
        { name: "Physical Products", percentage: 50, count: 25, revenue: 1245, color: "#6FCF97" },
        { name: "Digital Goods", percentage: 20, count: 15, revenue: 1245, color: "#B88547" },
        { name: "Production on Demand", percentage: 12, count: 10, revenue: 1245, color: "#4A90E2" },
        { name: "Subscriptions", percentage: 18, count: 12, revenue: 1245, color: "#9B51E0" }
    ]

    return (
        <RuledGrid
            width="100%"
            columns={1}
            borderRadius={16}
        >
            <RuledGrid columns={2} nested>
                <DataPointCard
                    icon={<CurrencyIcon __css={{ path: { stroke: "#fff" } }} />}
                    title='Total Inventory Value'
                >
                    <FormattedPrice
                        price={425868.99}
                        fontSize={{ base: 18, lg: 20 }}
                        fontWeight={500}
                        abbreviationProps={{ color: "#7B7B7B" }}
                    />
                </DataPointCard>

                <DataPointCard
                    icon={<AppIcons.HeaderCoins />}
                    title='Number of Products'
                >
                    <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="#FFF">
                        {123}{" "}
                        <Box as="span" color="#7B7B7B">Items</Box>
                    </Text>
                </DataPointCard>
            </RuledGrid>

            <Flex direction="column" gap={6} padding={{ base: 4, lg: 6 }}>
                <Flex gap="6px">
                    {productMetrics.map((metric, index) => (
                        <Box key={index} flex={metric.percentage} h="16px" borderRadius={4} bg={metric.color} />
                    ))}
                </Flex>

                <SimpleGrid
                    alignItems="start"
                    columns={{ base: 1, md: 2 }}
                    columnGap={14}
                    rowGap={4}
                >
                    {productMetrics.map((metric, index) => (
                        <Flex
                            key={index}
                            flexWrap="wrap"
                            justifyContent="space-between"
                            alignItems="center"
                            gap={2}
                        >
                            <StylizedTitle bgColor={metric.color} title={metric.name} />
                            <Flex alignItems="center" gap={2} fontSize={14} color="#FFF">
                                <Text>{metric.percentage} %</Text>
                                <Circle size={1} bg="#292929" />
                                <Text>{metric.count}</Text>
                                <Circle size={1} bg="#292929" />
                                <FormattedPrice price={metric.revenue} abbreviationProps={{ color: "#FFF" }} />
                            </Flex>
                        </Flex>
                    ))}
                </SimpleGrid>
            </Flex>
        </RuledGrid>
    )
}

export default InventoryOverview