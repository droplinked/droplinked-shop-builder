import { Box, Text } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
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
    const hasActiveProductTypes = productBreakdown.some(item => item.percentageOfTotal > 0)

    return (
        <RuledGrid width="100%" columns={1} borderRadius={16}>
            <RuledGrid columns={2} nested>
                <InventoryValueCard totalInventoryValue={totalInventoryValue} isLoading={isLoading} />
                <ProductCountCard numberOfProducts={numberOfProducts} isLoading={isLoading} />
            </RuledGrid>

            {hasActiveProductTypes && <ProductTypeBarChart productTypes={productBreakdown} />}
        </RuledGrid>
    )
}

function InventoryValueCard({ totalInventoryValue, isLoading }) {
    return (
        <DataPointCard
            icon={<CurrencyIcon __css={{ path: { stroke: "#fff" } }} />}
            title="Total Inventory Value"
            isLoading={isLoading}
        >
            <FormattedPrice
                price={totalInventoryValue}
                fontSize={{ base: 18, lg: 20 }}
                fontWeight={500}
                abbreviationProps={{ color: "#7B7B7B" }}
            />
        </DataPointCard>
    )
}

function ProductCountCard({ numberOfProducts, isLoading }) {
    return (
        <DataPointCard
            icon={<AppIcons.HeaderCoins />}
            title="Number of Products"
            isLoading={isLoading}
        >
            <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="#FFF">
                {numberOfProducts}{" "}
                <Box as="span" color="#7B7B7B">Items</Box>
            </Text>
        </DataPointCard>
    )
}