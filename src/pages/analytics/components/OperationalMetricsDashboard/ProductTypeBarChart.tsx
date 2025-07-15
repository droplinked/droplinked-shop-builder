import { Flex, SimpleGrid, Text } from "@chakra-ui/react"
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import HorizontalBarChart from "components/redesign/horizontal-bar-chart/HorizontalBarChart"
import StylizedTitle from "components/redesign/stylized-title/StylizedTitle"
import useLocaleResources from "hooks/useLocaleResources/useLocaleResources"
import React from "react"
import { ProductBreakdown } from "services/dashboard/interfaces"

export default function ProductTypeBarChart({ productTypes }: { productTypes: ProductBreakdown[] }) {
    const { t } = useLocaleResources("analyticsPage")

    const BADGE_COLORS: Record<string, string> = {
        [t('ProductTypeBarChart.normalProducts')]: "#2BCFA1",
        [t('ProductTypeBarChart.printOnDemand')]: "#179EF8",
        [t('ProductTypeBarChart.digitalGoods')]: "#CF882B",
        [t('ProductTypeBarChart.eventProducts')]: "#CB94FF"
    }

    return (
        <Flex direction="column" gap={6} padding={{ base: 4, lg: 6 }}>
            <HorizontalBarChart
                data={productTypes}
                getValue={(item) => item.percentageOfTotal}
                getLabel={(item) => t(mapProductTypeKey(item.productType))}
                colorMap={BADGE_COLORS}
            />

            <SimpleGrid
                alignItems="start"
                columns={{ base: 1, "3xl": 2 }}
                columnGap={14}
                rowGap={4}
            >
                {productTypes.map((item, index) => <BreakdownDetailsRow key={index} item={item} t={t} badgeColors={BADGE_COLORS} />)}
            </SimpleGrid>
        </Flex>
    )
}

function mapProductTypeKey(productType: string) {
    switch (productType) {
        case "Normal Products": return "ProductTypeBarChart.normalProducts"
        case "Print on Demand": return "ProductTypeBarChart.printOnDemand"
        case "Digital Goods": return "ProductTypeBarChart.digitalGoods"
        case "Event Products": return "ProductTypeBarChart.eventProducts"
        default: return productType
    }
}

function BreakdownDetailsRow({ item, t, badgeColors }: { item: ProductBreakdown, t: any, badgeColors: Record<string, string> }) {
    const badgeColor = badgeColors[t(mapProductTypeKey(item.productType))]

    return (
        <Flex
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            fontSize={14}
            color='text.white'
        >
            <StylizedTitle bgColor={badgeColor} title={t(mapProductTypeKey(item.productType))} />
            <DotSeparatedList>
                <Text>{item.percentageOfTotal?.toFixed(2)}%</Text>
                <Text>{item.quantity}</Text>
                <FormattedPrice price={item.totalValue} abbreviationProps={{ color: "text.white" }} />
            </DotSeparatedList>
        </Flex>
    )
}