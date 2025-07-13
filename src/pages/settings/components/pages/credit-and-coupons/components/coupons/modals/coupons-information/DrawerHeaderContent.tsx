import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons';
import AppTypography from 'components/common/typography/AppTypography'
import { formatDateToLocaleString } from 'utils/helpers';
import React from 'react'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources';

interface Props {
    createdAt: string;
    isExpired: boolean;
}

export default function DrawerHeaderContent({ createdAt, isExpired }: Props) {
    const { t } = useLocaleResources('settings');
    const color = isExpired ? '#FF2244 !important' : "#2BCFA1 !important"
    const bg = isExpired ? "#FF22440D" : "#2BCFA11A"

    return (
        <Flex justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <AppTypography fontSize={"14px !important"} color={"#B1B1B1 !important"}>
                    {t("settings.coupons.information.creationDate")}
                </AppTypography>
                <AppIcons.DotSpacer />
                <AppTypography fontWeight={500} fontSize={"14px !important"} color={"#fff"}>
                    {formatDateToLocaleString(createdAt)}
                </AppTypography>
            </Flex>
            <Box px={3} border={`1px solid ${color}`} borderRadius={"24px"} bg={bg}>
                <AppTypography fontSize={14} color={color}>
                    {isExpired ? t("settings.coupons.information.expired") : t("settings.coupons.information.active")}
                </AppTypography>
            </Box>
        </Flex>
    )
}
