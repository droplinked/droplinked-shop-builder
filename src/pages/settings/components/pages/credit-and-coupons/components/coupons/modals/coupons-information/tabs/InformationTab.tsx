import React from 'react'
import { Coupon } from '../../../interface'
import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import useAppStore from 'lib/stores/app/appStore'
import { currencyConvertion } from 'lib/utils/helpers/currencyConvertion'
import { formatDate } from 'lib/utils/helpers/helpers'

export default function InformationTab({ coupon }: { coupon: Coupon }) {
    const { balance, codes, expiryDate, type } = coupon
    const { shop: { currency } } = useAppStore();
    const redeemedCounts = codes.filter((code) => code.isRedeemed).length;

    const data = [
        {
            title: "Amount",
            content: type === "DISCOUNT" ? (
                <AppTypography color={"#fff"} fontWeight={500} fontSize={14}>{balance}%</AppTypography>
            ) : (
                <AppTypography sx={{ span: { color: "#7B7B7B", fontWeight: 500 } }} color={"#fff"} fontWeight={500} fontSize={14}>
                    {currency?.symbol}{" "}
                    {currencyConvertion(balance, currency?.conversionRateToUSD, false)}{" "}
                    <span>{currency?.abbreviation}</span>
                </AppTypography>
            )
        },
        {
            title: "Expiration Date",
            content: <AppTypography color={"#fff"} fontWeight={500} fontSize={14}>{formatDate(expiryDate)}</AppTypography>
        },
        {
            title: "Usage Limit",
            content:
                <AppTypography sx={{ span: { color: "#7B7B7B", fontWeight: 500 } }} color={"#fff"} fontWeight={500} fontSize={14}>
                    {redeemedCounts} <span>/ {codes.length}</span>
                </AppTypography>
        }
    ]

    // TODO: USAGE SECTION DATA DOESN'T EXIST IN COUPON INTERFACE 

    return (
        <Flex flexDirection={"column"} borderRadius={"8px"} p={6} gap={6} border={"1px solid #292929"}>
            <AppTypography color={"#fff"} fontSize={16} fontWeight={500}>Details</AppTypography>
            <Flex direction={"column"} gap={4}>
                {
                    data.map((item, index) => {
                        return (
                            <Flex key={index} justifyContent={"space-between"}>
                                <AppTypography color={"#B1B1B1"} fontSize={14}>{item.title}</AppTypography>
                                {item.content}
                            </Flex>
                        )
                    })
                }
            </Flex>
        </Flex>
    )
}
