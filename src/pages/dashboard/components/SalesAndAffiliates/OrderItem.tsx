import { Flex, Text } from "@chakra-ui/react"
import AppIcons from "assets/icon/Appicons"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import { DashboardOrder } from "lib/apis/dashboard/interfaces"
import { formatDateToLongStyle } from "utils/helpers"
import React from "react"

interface Props {
    order: DashboardOrder
    isLastItem: boolean
    onNavigate: (path: string) => void
}

function OrderItem({ order, isLastItem, onNavigate }: Props) {
    return (
        <Flex
            alignItems="center"
            gap={4}
            borderBottom={isLastItem ? "none" : "1px solid"}
            borderColor="neutral.gray.1000"
            padding={{ base: 4, lg: "16px 24px" }}
            sx={{ svg: { flexShrink: 0 } }}
        >
            <Flex flex={1} flexDirection="column" gap={1}>
                <Flex flexWrap="wrap" justifyContent="space-between" columnGap={4} rowGap={1}>
                    <Text color="#fff" fontSize={{ base: 14, lg: 16 }}>order #{order._id}</Text>
                    <FormattedPrice
                        price={order.totalPriceCart}
                        abbreviationProps={{ color: "text.subtextPlaceholder.dark" }}
                    />
                </Flex>
                <Flex flexWrap="wrap" justifyContent="space-between" columnGap={4} rowGap={1}>
                    <Text fontSize={{ base: 12, lg: 14 }} color="#2BCFA1">{order.status}</Text>
                    <Text fontSize={{ base: 12, lg: 14 }} color="text.subtextPlaceholder.dark">
                        {formatDateToLongStyle(new Date(order.updatedAt))}
                    </Text>
                </Flex>
            </Flex>

            <AppIcons.ChevronRight
                color='white'
                cursor="pointer"
                onClick={() => onNavigate("/analytics/orders")}
            />
        </Flex>
    )
}

export default OrderItem