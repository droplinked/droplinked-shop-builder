import React from 'react'
import { Partner } from './PartnerList'
import { Avatar, Flex } from '@chakra-ui/react'
import AppTypography from 'components/common/typography/AppTypography'
import AppIcons from 'assest/icon/Appicons'
import NavigationLink from 'pages/settings/components/common/NavigationLink'
import { appDevelopment } from 'lib/utils/app/variable'

export default function PartnerCard({ partner }: { partner: Partner }) {
    const { amount, shopName } = partner

    return (
        <Flex width={"100%"} borderRadius={"8px"} border={"1px solid #292929"} p={4} alignItems={"center"} justifyContent={"space-between"}>
            <Flex gap={4} alignItems={"center"} flex={1}>
                <Avatar width={"48px"} height={"48px"} borderRadius={"8px"} src='#' name={shopName} />
                <AppTypography color={"#fff"} fontSize={16} fontWeight={500}>{shopName}</AppTypography>
            </Flex>
            <Flex gap={3} alignItems={"center"} flex={1}>
                <AppTypography color={"#fff"} fontSize={16} fontWeight={500}>Your Earning</AppTypography>
                <AppIcons.DotSpacer />
                <AppTypography color={"#fff"} fontSize={16} fontWeight={500}>${amount} <span style={{ color: "#B1B1B1" }}>USD</span></AppTypography>
            </Flex>
            <NavigationLink target='_blank' reverse to={`https://${appDevelopment ? "dev." : ""}droplinked.io/${shopName}`} title='Visit' />
        </Flex>
    )
}
