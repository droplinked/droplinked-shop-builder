import { Box, Flex } from '@chakra-ui/react'
import AppIcons from 'assest/icon/Appicons'
import AppTypography from 'components/common/typography/AppTypography'
import Button from 'components/redesign/button/Button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    onOpen: () => void
    isFetching: boolean
}

export default function PlanFeatures({ onOpen, isFetching }: Props) {
    const navigate = useNavigate()
    const features = [
        {
            title: "Unlimited Access",
            icon: <AppIcons.GreenInfinity />
        },
        {
            title: "Advanced tools",
            icon: <AppIcons.GreenSpeedometer />
        },
        {
            title: "Advanced tools",
            icon: <AppIcons.MedalStarOutline />
        },
    ]

    return (
        <Flex flex={1} p={6} gap={6} flexDirection={"column"} alignItems={"start"}>
            <Flex flexDirection={"column"} gap={2}>
                <AppTypography color={"#fff"} fontSize={18} fontWeight={700}>Upgrade to Unlock Premium Features!</AppTypography>
                <AppTypography whiteSpace={"break-spaces"} color={"#b1b1b1"} fontSize={14}>{`You’re almost there! This feature is available to premium account users.\nExperience all the following features by upgrading today.`}</AppTypography>
            </Flex>
            <Flex gap={4} alignItems={"center"}>
                {features.map((item, index) => (
                    <Flex gap={2} alignItems={"center"}>
                        <Box p={2} borderRadius={"100%"} bg={"#2BCFA11A"}>
                            {item.icon}
                        </Box>
                        <AppTypography color={"#fff"}>{item.title}</AppTypography>
                    </Flex>
                ))}
            </Flex>
            <Flex gap={4}>
                <Button onClick={() => navigate("/analytics/plans")} fontWeight={500} fontSize={14} variant='secondary'>Visit Pricing Plans</Button>
                <Button isLoading={isFetching} fontWeight={500} fontSize={14} onClick={onOpen}>Upgrade</Button>
            </Flex>
        </Flex>
    )
}
