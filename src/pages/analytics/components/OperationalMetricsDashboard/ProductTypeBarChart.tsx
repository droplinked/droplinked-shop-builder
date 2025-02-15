import { Box, Circle, Flex, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import { ProductBreakdown } from "lib/apis/dashboard/interfaces"
import React from "react"
import StylizedTitle from "../StylizedTitle"

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
            <Flex gap="6px">
                {
                    productTypes
                        .filter(item => item.percentageOfTotal > 0)
                        .map((item, index) => (
                            <Box
                                key={index}
                                flex={item.percentageOfTotal}
                                h="16px"
                                borderRadius={4}
                                bgColor={BADGE_COLORS[item.productType]}
                            />
                        ))
                }
            </Flex>

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
        >
            <StylizedTitle bgColor={badgeColor} title={item.productType} />
            <Flex alignItems="center" gap={2} fontSize={14} color="#FFF">
                <Text>{item.percentageOfTotal?.toFixed(2)}%</Text>
                <Circle size={1} bg="#292929" />
                <Text>{item.quantity}</Text>
                <Circle size={1} bg="#292929" />
                <FormattedPrice
                    price={item.totalValue}
                    abbreviationProps={{ color: "#FFF" }}
                />
            </Flex>
        </Flex>
    )
}