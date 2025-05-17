import { Flex, SimpleGrid, Text } from "@chakra-ui/react"
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import HorizontalBarChart from "components/redesign/horizontal-bar-chart/HorizontalBarChart"
import StylizedTitle from "components/redesign/stylized-title/StylizedTitle"
import { ProductBreakdown } from "lib/apis/dashboard/interfaces"
import React from "react"

const BADGE_COLORS: Record<string, string> = {
    "Normal Products": "#2BCFA1",
    "Print on Demand": "#179EF8",
    "Digital Goods": "#CF882B",
    "Event Products": "#CB94FF"
}

export default function ProductTypeBarChart({ productTypes }: { productTypes: ProductBreakdown[] }) {
    return (
        <Flex direction="column" gap={6} padding={{ base: 4, lg: 6 }}>
            <HorizontalBarChart data={productTypes} getValue={(item) => item.percentageOfTotal} getLabel={(item) => item.productType} colorMap={BADGE_COLORS} />

            <SimpleGrid
                alignItems="start"
                columns={{ base: 1, "3xl": 2 }}
                columnGap={14}
                rowGap={4}
            >
                {productTypes.map((item, index) => <BreakdownDetailsRow key={index} item={item} />)}
            </SimpleGrid>
        </Flex>
    )
}

function BreakdownDetailsRow({ item }: { item: ProductBreakdown }) {
    const badgeColor = BADGE_COLORS[item.productType]

    return (
        <Flex
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
            fontSize={14}
            color='text.white'
        >
            <StylizedTitle bgColor={badgeColor} title={item.productType} />
            <DotSeparatedList>
                <Text>{item.percentageOfTotal?.toFixed(2)}%</Text>
                <Text>{item.quantity}</Text>
                <FormattedPrice price={item.totalValue} abbreviationProps={{ color: "text.white" }} />
            </DotSeparatedList>
        </Flex>
    )
}