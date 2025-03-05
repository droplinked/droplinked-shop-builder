import React from 'react'
import { Coupon } from '../../../interface'
import { Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import { formatDateToLocaleString } from 'utils/helpers'
import { useCurrencyConverter } from 'hooks/useCurrencyConverter/useCurrencyConverter'

export default function InformationTab({ coupon }: { coupon: Coupon }) {
    const { balance, codes, expiryDate, type } = coupon
    const { convertPrice, symbol, abbreviation } = useCurrencyConverter()
    const redeemedCounts = codes.filter((code) => code.isRedeemed).length;

    const data = [
        {
            title: "Amount",
            content: type === "DISCOUNT" ? (
                <AppTypography color={"#fff"} fontWeight={500} fontSize={14}>{balance}%</AppTypography>
            ) : (
                <AppTypography sx={{ span: { color: "text.subtextPlaceholder.dark", fontWeight: 500 } }} color={"#fff"} fontWeight={500} fontSize={14}>
                    {symbol}{" "}
                    {convertPrice({ amount: balance, toFixed: true })}{" "}
                    <span>{abbreviation}</span>
                </AppTypography>
            )
        },
        {
            title: "Expiration Date",
            content: <AppTypography color={"#fff"} fontWeight={500} fontSize={14}>{formatDateToLocaleString(expiryDate)}</AppTypography>
        },
        {
            title: "Usage Limit",
            content:
                <AppTypography sx={{ span: { color: "text.subtextPlaceholder.dark", fontWeight: 500 } }} color={"#fff"} fontWeight={500} fontSize={14}>
                    {redeemedCounts} <span>/ {codes.length}</span>
                </AppTypography>
        }
    ]

    // TODO: USAGE SECTION DATA DOESN'T EXIST IN COUPON INTERFACE 

    return (
        <Flex flexDirection={"column"} borderRadius={"8px"} p={6} gap={6} border={"1px solid"} borderColor="neutral.gray.800">
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
