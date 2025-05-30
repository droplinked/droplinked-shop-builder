import { Avatar, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import ExternalLink from 'components/redesign/external-link/ExternalLink'
import FormattedPrice from 'components/redesign/formatted-price/FormattedPrice'
import { appDevelopment } from 'utils/app/variable'
import React from 'react'
import { Partner } from './PartnerList'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'

export default function PartnerCard({ partner }: { partner: Partner }) {
    const { amount, shopName } = partner
    const { t } = useLocaleResources('settings');

    return (
        <Flex width={"100%"} borderRadius={"8px"} border={"1px solid"} borderColor="neutral.gray.800" p={4} alignItems={"center"} justifyContent={"space-between"}>
            <Flex gap={4} alignItems={"center"} flex={1}>
                <Avatar width={"48px"} height={"48px"} borderRadius={"8px"} src='#' name={shopName} />
                <AppTypography color={"neutral.white"} fontSize={16} fontWeight={500}>{shopName}</AppTypography>
            </Flex>
            <Flex gap={3} alignItems={"center"} flex={1}>
                <AppTypography color={"neutral.white"} fontSize={16} fontWeight={500}>{t('settings.referrals.referredPartners.yourEarning')}</AppTypography>
                <AppIcons.DotSpacer />
                <FormattedPrice price={amount} fontWeight={500} />
            </Flex>
            <ExternalLink
                href={`https://${appDevelopment ? "dev." : ""}droplinked.io/${shopName}`}
                textDecor={"none"}
                display={"flex"}
                alignItems={"center"}
                fontSize={16}
                fontWeight={500}
                gap={"6px"}
                target='_blank'
            >
                {t('settings.referrals.referredPartners.visit')}
                <AppIcons.ExternalLink style={{ display: "inline-block" }} />
            </ExternalLink>
        </Flex>
    )
}
