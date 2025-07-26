import { Box, Flex } from '@chakra-ui/react'
import { InfinitySm } from 'assets/icons/Sign/Infinity/InfinitySm'
import { DashboardSm } from 'assets/icons/System/Dashboard/DashboardSm'
import { MedalstarSm } from 'assets/icons/System/MedalStar/MedalstarSm'
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
    const iconColor = "#2BCFA1"
    const features = [
        {
            title: t("UpgradePlan.unlimitedAccess"),
            icon: <InfinitySm color={iconColor} />
        },
        {
             title: t("UpgradePlan.advancedTools"),
            icon: <DashboardSm color={iconColor} />
        },
        {
            title: t("UpgradePlan.prioritySupport"),
            icon: <MedalstarSm color={iconColor} />,
        },
    ]

    return (
        <Flex flex={1} p={6} gap={6} flexDirection={"column"} alignItems={"start"} >
            <Flex flexDirection={"column"} gap={2}>
                <AppTypography color={"#fff"} fontSize={18} fontWeight={700}>
                    {t("UpgradePlan.upgradeTitle")}
                </AppTypography>
                <AppTypography whiteSpace={"break-spaces"} color={"#b1b1b1"} fontSize={14}>
                    {t("UpgradePlan.upgradeDescription")}
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
                    {t("UpgradePlan.visitPricingPlans")}
                </AppButton>
                <AppButton isLoading={isFetching} onClick={onOpen}>
                    {t("UpgradePlan.upgrade")}
                </AppButton>
            </Flex>
        </Flex>
    )
}
