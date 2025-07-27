import { Avatar, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import InteractiveText from 'components/redesign/interactive-text/InteractiveText'
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
                <AppTypography color={"neutral.white"} fontSize={16} fontWeight={500}>{t('Referrals.referredPartners.yourEarning')}</AppTypography>
                <AppIcons.DotSpacer />
                <FormattedPrice price={amount} fontWeight={500} />
            </Flex>
            <InteractiveText
                to={`https://${appDevelopment ? "dev." : ""}droplinked.io/${shopName}`}
                target='_blank'
                hasExternalIcon
                sx={{
                    textDecor: "none",
                    display: "flex",
                    alignItems: "center",
                    fontSize: 16,
                    fontWeight: 500,
                    gap: "6px"
                }}
            >
                                    {t('Referrals.referredPartners.visit')}
            </InteractiveText>
        </Flex>
    )
}
