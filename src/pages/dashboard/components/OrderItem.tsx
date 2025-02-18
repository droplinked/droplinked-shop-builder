import { Flex, Text } from "@chakra-ui/react"
import AppIcons from "assest/icon/Appicons"
import FormattedPrice from "components/redesign/formatted-price/FormattedPrice"
import { DashboardOrder } from "lib/apis/dashboard/interfaces"
import { formatDateLongStyle } from "lib/utils/helpers/helpers"
import React from "react"

interface Props {
    order: DashboardOrder
    handleNavigation: (path: string) => void
}

function OrderItem({ order, handleNavigation }: Props) {
    return (
        <Flex
            alignItems="center"
            gap={4}
            padding={{ base: 4, lg: "16px 24px" }}
            sx={{ svg: { flexShrink: 0 } }}
            borderTop={"1px solid #292929"}
        >
            <Flex flex={1} flexDirection="column" gap={1}>
                <Flex flexWrap="wrap" justifyContent="space-between" columnGap={4} rowGap={1}>
                    <Text color="#fff" fontSize={{ base: 14, lg: 16 }}>order #{order._id}</Text>
                    <FormattedPrice
                        price={order.totalPriceCart}
                        abbreviationProps={{ color: "#7B7B7B" }}
                    />
                </Flex>
                <Flex flexWrap="wrap" justifyContent="space-between" columnGap={4} rowGap={1}>
                    <Text fontSize={{ base: 12, lg: 14 }} color="#2BCFA1">{order.status}</Text>
                    <Text fontSize={{ base: 12, lg: 14 }} color="#7B7B7B">
                        {formatDateLongStyle(new Date(order.updatedAt))}
                    </Text>
                </Flex>
            </Flex>

            <AppIcons.ChevronRight color='white' cursor="pointer" onClick={() => handleNavigation("/analytics/orders")} />
        </Flex>
    )
}

export default OrderItem