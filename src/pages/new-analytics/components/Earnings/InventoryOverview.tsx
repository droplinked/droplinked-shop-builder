import { Box, Text } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import CurrencyIcon from 'components/redesign/currency-icon/CurrencyIcon'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import RuledGrid from 'components/redesign/ruled-grid/RuledGrid'
import React from 'react'
import DataPointCard from '../DataPointCard'

function InventoryOverview() {
    const productMetrics = [
        { name: "Physical Products", percentage: 50, count: 25, revenue: 1245, color: "#6FCF97" },
        { name: "Digital Goods", percentage: 20, count: 15, revenue: 1245, color: "#B88547" },
        { name: "Production on Demand", percentage: 12, count: 10, revenue: 1245, color: "#4A90E2" },
        { name: "Subscriptions", percentage: 18, count: 12, revenue: 1245, color: "#9B51E0" }
    ]

    return (
        <RuledGrid flex={1} columns={1} borderRadius={16}>
            <RuledGrid columns={2} borderBottom="1px solid #292929" nested>
                <DataPointCard
                    icon={<CurrencyIcon __css={{ path: { stroke: "#fff" } }} />}
                    title='Total Inventory Value'
                >
                    <FormattedPrice
                        price={425868.99}
                        fontSize={20}
                        fontWeight={500}
                        abbreviationProps={{ color: "#7B7B7B" }}
                    />
                </DataPointCard>

                <DataPointCard
                    icon={<AppIcons.HeaderCoins />}
                    title='Number of Products'
                >
                    <Text fontSize={20} fontWeight={500} color="#FFF">
                        {123}{" "}
                        <Box as="span" color="#7B7B7B">Items</Box>
                    </Text>
                </DataPointCard>
            </RuledGrid>
        </RuledGrid>
    )
}

export default InventoryOverview