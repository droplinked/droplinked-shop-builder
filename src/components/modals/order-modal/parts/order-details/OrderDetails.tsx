import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import React, { useContext } from "react"
import orderModalContext from '../context'
import OrderDetailsModel from "./model"

export default function OrderDetails() {
    const { order } = useContext(orderModalContext)
    const orderDetails = OrderDetailsModel.getOrderDetails(order)

    return (
        <>
            {orderDetails.map((section, index) =>
                <Flex direction={"column"} gap={"16px"} key={index}>
                    <AppTypography fontSize={"16px"} fontWeight={500} color={"#FFFFFF"}>{section.title}</AppTypography>
                    <Flex direction={"column"} gap={"12px"}>
                        {section.rows.map((row, index) =>
                            <Flex key={index} justifyContent={"space-between"} alignItems={"center"}>
                                <AppTypography fontSize={"14px"} color={"#C2C2C2"}>{row.label}</AppTypography>
                                {row.value}
                            </Flex>
                        )}
                    </Flex>
                </Flex>
            )}
        </>
    )
}
