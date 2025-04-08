import { Box, Text } from "@chakra-ui/react"
import { CoinsLg } from "assets/icons/Finance/Coins/CoinsLg"
import CurrencyIcon from "components/redesign/currency-icon/CurrencyIcon"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import useAnalyticsStore from "pages/analytics/stores/useAnalyticsStore"
import React from "react"
import DataPointCard from "../DataPointCard"
import ProductTypeBarChart from "./ProductTypeBarChart"

export default function InventorySummary() {
    const { data, isLoading } = useAnalyticsStore(state => state.performanceReportResponse)
    const { totalInventoryValue, numberOfProducts, productBreakdown } = data

    // Determine if there are any product types with a percentage greater than 0
    const nonZeroProductPercentages = productBreakdown.some(item => item.percentageOfTotal > 0)

    return (
        <RuledGrid columns={1} borderRadius={16}>
            <RuledGrid columns={2} nested>
                <InventoryValueCard totalInventoryValue={totalInventoryValue} isLoading={isLoading} />
                <ProductCountCard numberOfProducts={numberOfProducts} isLoading={isLoading} />
            </RuledGrid>

            {nonZeroProductPercentages && <ProductTypeBarChart productTypes={productBreakdown} />}
        </RuledGrid>
    )
}

function InventoryValueCard({ totalInventoryValue, isLoading }) {
    return (
        <DataPointCard
            icon={<CurrencyIcon __css={{ path: { stroke: "white" } }} />}
            title="Total Inventory Value"
            isLoading={isLoading}
        >
            <FormattedPrice
                price={totalInventoryValue}
                fontSize={{ base: 18, xl: 20 }}
                fontWeight={500}
                abbreviationProps={{ color: "text.subtextPlaceholder.dark" }}
            />
        </DataPointCard>
    )
}

function ProductCountCard({ numberOfProducts, isLoading }) {
    return (
        <DataPointCard
            icon={<CoinsLg color="white" />}
            title="Number of Products"
            isLoading={isLoading}
        >
            <Text fontSize={{ base: 18, xl: 20 }} fontWeight={500} color="text.white">
                {numberOfProducts}{" "}
                <Box as="span" color="text.subtextPlaceholder.dark">Items</Box>
            </Text>
        </DataPointCard>
    )
}