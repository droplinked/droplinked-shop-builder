import { Box, Text } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import CurrencyIcon from "components/redesign/currency-icon/CurrencyIcon"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import RuledGrid from "components/redesign/ruled-grid/RuledGrid"
import useAnalyticsStore from "pages/new-analytics/stores/useAnalyticsStore"
import React from "react"
import DataPointCard from "../DataPointCard"
import ProductTypeBarChart from "./ProductTypeBarChart"

export default function InventorySummary() {
    const { totalInventoryValue, numberOfProducts } = useAnalyticsStore(
        state => state.performanceReportResponse.data
    )

    return (
        <RuledGrid width="100%" columns={1} borderRadius={16}>
            <RuledGrid columns={2} nested>
                <InventoryValueCard totalInventoryValue={totalInventoryValue} />
                <ProductCountCard numberOfProducts={numberOfProducts} />
            </RuledGrid>

            <ProductTypeBarChart />
        </RuledGrid>
    )
}

function InventoryValueCard({ totalInventoryValue }: { totalInventoryValue: number }) {
    return (
        <DataPointCard
            icon={<CurrencyIcon __css={{ path: { stroke: "#fff" } }} />}
            title="Total Inventory Value"
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

function ProductCountCard({ numberOfProducts }: { numberOfProducts: number }) {
    return (
        <DataPointCard
            icon={<AppIcons.HeaderCoins />}
            title="Number of Products"
        >
            <Text fontSize={{ base: 18, lg: 20 }} fontWeight={500} color="#FFF">
                {numberOfProducts}{" "}
                <Box as="span" color="#7B7B7B">Items</Box>
            </Text>
        </DataPointCard>
    )
}