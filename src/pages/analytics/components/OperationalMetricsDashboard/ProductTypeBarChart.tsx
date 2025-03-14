import { Flex, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react"
import DotSeparatedList from "components/redesign/dot-separated-list/DotSeparatedList"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import HorizontalBarChart from "components/redesign/horizontal-bar-chart/horizontalBarChart"
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
    const [isSmallerThan1440] = useMediaQuery("(max-width: 1440px)")

    return (
        <Flex direction="column" gap={6} padding={{ base: 4, lg: 6 }}>
            <HorizontalBarChart data={productTypes} getValue={(item) => item.percentageOfTotal} getLabel={(item) => item.productType} colorMap={BADGE_COLORS} />

            <SimpleGrid
                alignItems="start"
                columns={isSmallerThan1440 ? 1 : 2}
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
            color={'white'}
            fontSize={'14px'}
        >
            <StylizedTitle bgColor={badgeColor} title={item.productType} />
            <DotSeparatedList>
                <Text>{item.percentageOfTotal?.toFixed(2)}%</Text>
                <Text>{item.quantity}</Text>
                <FormattedPrice price={item.totalValue} abbreviationProps={{ color: "#FFF" }}/>
            </DotSeparatedList>
                
        </Flex>
    )
}