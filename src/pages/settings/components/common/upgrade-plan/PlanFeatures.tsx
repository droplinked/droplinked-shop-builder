import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assets/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import AppButton from 'components/redesign/button/AppButton'
import useLocaleResources from 'hooks/useLocaleResources/useLocaleResources'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    onOpen: () => void
    isFetching: boolean
}

export default function PlanFeatures({ onOpen, isFetching }: Props) {
    const { t } = useLocaleResources('settings');
    const navigate = useNavigate()
    const features = [
        {
            title: t("settings.upgradePlan.unlimitedAccess"),
            icon: <AppIcons.GreenInfinity />
        },
        {
            title: t("settings.upgradePlan.advancedTools"),
            icon: <AppIcons.GreenSpeedometer />
        },
        {
            title: t("settings.upgradePlan.prioritySupport"),
            icon: <AppIcons.MedalStarOutline />
        },
    ]

    return (
        <Flex flex={1} p={6} gap={6} flexDirection={"column"} alignItems={"start"}>
            <Flex flexDirection={"column"} gap={2}>
                <AppTypography color={"#fff"} fontSize={18} fontWeight={700}>
                    {t("settings.upgradePlan.upgradeTitle")}
                </AppTypography>
                <AppTypography whiteSpace={"break-spaces"} color={"#b1b1b1"} fontSize={14}>
                    {t("settings.upgradePlan.upgradeDescription")}
                </AppTypography>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
                {features.map((item, index) => (
                    <Flex key={index} gap={2} alignItems={"center"}>
                        <Box p={2} borderRadius={"100%"} bg={"#2BCFA11A"}>
                            {item.icon}
                        </Box>
                        <AppTypography color={"#fff"}>{item.title}</AppTypography>
                    </Flex>
                ))}
            </Flex>
            <Flex gap={4}>
                <AppButton variant='secondary' onClick={() => navigate("/analytics/plans")}>
                    {t("settings.upgradePlan.visitPricingPlans")}
                </AppButton>
                <AppButton isLoading={isFetching} onClick={onOpen}>
                    {t("settings.upgradePlan.upgrade")}
                </AppButton>
            </Flex>
        </Flex>
    )
}
