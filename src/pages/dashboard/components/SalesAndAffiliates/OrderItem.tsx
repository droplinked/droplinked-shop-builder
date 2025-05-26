import { Box, Flex, Text } from "@chakra-ui/react"
import { ChevronrightMd } from "assets/icons/Navigation/ChevronRight/ChevronrightMd"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import { DashboardOrder } from "services/dashboard/interfaces"
import React from "react"
import { formatDateToLongStyle } from "utils/helpers"

interface Props {
    order: DashboardOrder
    onNavigate: (path: string) => void
}

function OrderItem({ order, onNavigate }: Props) {
    return (
        <Flex
            alignItems="center"
            gap={4}
            padding={{ base: 4, lg: "16px 24px" }}
        >
            <Flex flex={1} flexDirection="column" gap={1}>
                <Flex flexWrap="wrap" justifyContent="space-between" columnGap={4} rowGap={1}>
                    <Text color="text.white" fontSize={{ base: 14, xl: 16 }}>order #{order._id}</Text>
                    <FormattedPrice
                        price={order.totalPriceCart}
                        abbreviationProps={{ color: "text.subtext.placeholder.dark" }}
                    />
                </Flex>
                <Flex flexWrap="wrap" justifyContent="space-between" columnGap={4} rowGap={1}>
                    <Text fontSize={{ base: 12, xl: 14 }} color="system.success">{order.status}</Text>
                    <Text fontSize={{ base: 12, xl: 14 }} color="text.subtext.placeholder.dark">
                        {formatDateToLongStyle(new Date(order.updatedAt))}
                    </Text>
                </Flex>
            </Flex>

            <Box
                as="button"
                flexShrink={0}
                padding="10px"
                onClick={() => onNavigate("/analytics/purchase-history")}
            >
                <ChevronrightMd color='white' />
            </Box>
        </Flex>
    )
}

export default OrderItem