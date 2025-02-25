import { Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import { formatDate, getTime } from 'pages/onchain-records/utils/helpers'
import React from 'react'

export default function DateFormatter({ date }: { date: string }) {
    if (!date) return null

    return (
        <Flex gap={2} alignItems='center' sx={{ rect: { fill: "#292929", fillOpacity: 1 } }}>
            <AppTypography
                color={"#b1b1b1"}
                fontSize={14}
                fontWeight={500}
            >
                {formatDate(date)}
            </AppTypography>
            <AppIcons.DotSpacer />
            <AppTypography
                color={"#b1b1b1"}
                fontSize={14}
                fontWeight={500}
            >
                {getTime((date))}
            </AppTypography>
        </Flex>
    )
}
